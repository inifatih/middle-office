import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  signal
} from '@angular/core';
import * as XLSX from 'xlsx';

interface GridCell {
  text: string;
  align: 'left' | 'right';
  rowSpan: number;
  colSpan: number;
  hidden: boolean;
  bg: string | null;
  color: string | null;
  bold: boolean;
}

const MAX_ROWS = 500;
const MAX_COLS = 60;
const DEFAULT_COL_WIDTH_PX = 90;
const MIN_COL_WIDTH_PX = 28;
const ROW_HEADER_WIDTH_PX = 44;

@Component({
  selector: 'app-excel-sheet-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excel-sheet-preview.component.html'
})
export class ExcelSheetPreviewComponent implements OnDestroy {

  file = input<File | null>(null);
  sheetName = input('upload');

  readonly rowHeaderWidth = ROW_HEADER_WIDTH_PX;

  // This app runs zoneless (no zone.js), so state mutated after an `await` inside
  // parseFile() must be a signal — plain fields wouldn't schedule a re-render,
  // which is what left the "loading" spinner stuck forever.
  loading = signal(false);
  error = signal<string | null>(null);

  columnLetters = signal<string[]>([]);
  columnWidths = signal<number[]>([]);
  rowNumbers = signal<number[]>([]);
  grid = signal<GridCell[][]>([]);
  truncated = signal(false);
  resolvedSheetName = signal<string | null>(null);

  // table-layout:fixed will proportionally shrink columns to fit an implicit/auto table
  // width — pin the table's own width to the exact sum so per-column widths (and drag
  // resizing) are never silently rescaled, and the container scrolls horizontally instead.
  tableWidth = computed(() => this.rowHeaderWidth + this.columnWidths().reduce((sum, w) => sum + w, 0));

  // Guards against a stale parse (from a previous file) resolving after a newer one has started.
  private requestToken = 0;

  // Column-resize drag state.
  private resizingCol: number | null = null;
  private resizeStartX = 0;
  private resizeStartWidth = 0;

  constructor() {
    effect(() => {
      const file = this.file();
      this.sheetName(); // register as a dependency too

      this.reset();

      if (file) {
        this.parseFile(file, ++this.requestToken);
      }
    });
  }

  private reset(): void {
    this.requestToken++;
    this.loading.set(false);
    this.error.set(null);
    this.columnLetters.set([]);
    this.columnWidths.set([]);
    this.rowNumbers.set([]);
    this.grid.set([]);
    this.truncated.set(false);
    this.resolvedSheetName.set(null);
  }

  private async parseFile(file: File, token: number): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, {
        type: 'array',
        cellDates: true,
        cellStyles: true
      });

      if (token !== this.requestToken) return; // a newer file was selected meanwhile

      const targetName = this.sheetName().trim().toLowerCase();
      const matchedName = workbook.SheetNames.find(
        (name) => name.trim().toLowerCase() === targetName
      );

      if (!matchedName) {
        this.error.set(`Sheet "${this.sheetName()}" tidak ditemukan pada file ini. Sheet yang tersedia: ${workbook.SheetNames.join(', ')}.`);
        return;
      }

      this.resolvedSheetName.set(matchedName);
      this.buildGrid(workbook.Sheets[matchedName]);
    } catch (err) {
      console.error('Gagal membaca file Excel:', err);
      if (token === this.requestToken) {
        this.error.set('File tidak dapat dibaca. Pastikan file berformat .xlsx atau .xls yang valid.');
      }
    } finally {
      if (token === this.requestToken) {
        this.loading.set(false);
      }
    }
  }

  private buildGrid(ws: XLSX.WorkSheet): void {
    const ref = ws['!ref'];

    if (!ref) {
      this.error.set(`Sheet "${this.resolvedSheetName()}" kosong, tidak ada data.`);
      return;
    }

    const range = XLSX.utils.decode_range(ref);

    const totalRows = range.e.r - range.s.r + 1;
    const totalCols = range.e.c - range.s.c + 1;

    const numRows = Math.min(totalRows, MAX_ROWS);
    const numCols = Math.min(totalCols, MAX_COLS);
    this.truncated.set(numRows < totalRows || numCols < totalCols);

    const grid: GridCell[][] = [];

    for (let r = 0; r < numRows; r++) {
      const row: GridCell[] = [];

      for (let c = 0; c < numCols; c++) {
        const addr = XLSX.utils.encode_cell({ r: range.s.r + r, c: range.s.c + c });
        const cell = ws[addr];

        const text = cell ? String(cell.w ?? cell.v ?? '') : '';
        const align: 'left' | 'right' = cell && (cell.t === 'n' || cell.t === 'd') ? 'right' : 'left';
        const bg = this.resolveFillColor(cell);
        const color = bg ? this.contrastingTextColor(bg) : null;
        const bold = r === 0 || bg !== null;

        row.push({ text, align, rowSpan: 1, colSpan: 1, hidden: false, bg, color, bold });
      }

      grid.push(row);
    }

    for (const merge of ws['!merges'] ?? []) {
      const r0 = merge.s.r - range.s.r;
      const c0 = merge.s.c - range.s.c;
      const r1 = Math.min(merge.e.r - range.s.r, numRows - 1);
      const c1 = Math.min(merge.e.c - range.s.c, numCols - 1);

      if (r0 < 0 || c0 < 0 || r0 >= numRows || c0 >= numCols) continue;

      const top = grid[r0][c0];
      top.rowSpan = r1 - r0 + 1;
      top.colSpan = c1 - c0 + 1;

      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          if (r === r0 && c === c0) continue;
          grid[r][c].hidden = true;
        }
      }
    }

    this.applyOverflowSpans(grid, numCols);

    this.grid.set(grid);
    this.columnLetters.set(Array.from({ length: numCols }, (_, i) => this.toColumnLetter(range.s.c + i)));
    this.rowNumbers.set(Array.from({ length: numRows }, (_, i) => range.s.r + i + 1));

    const cols = ws['!cols'] ?? [];
    this.columnWidths.set(Array.from({ length: numCols }, (_, i) => {
      const col = cols[range.s.c + i];
      if (col?.wpx) return Math.round(col.wpx);
      return this.estimateColumnWidth(grid, i);
    }));
  }

  /**
   * Excel never clips text that has nowhere to go — a left-aligned value spills into
   * however many blank cells follow it, only stopping at a non-blank cell or a fill-color
   * change. Real merges are applied first; this only touches cells still un-spanned.
   */
  private applyOverflowSpans(grid: GridCell[][], numCols: number): void {
    for (const row of grid) {
      for (let c = 0; c < numCols; c++) {
        const cell = row[c];

        if (cell.hidden || cell.colSpan > 1 || cell.rowSpan > 1) continue;
        if (!cell.text || cell.align !== 'left') continue;

        let span = 1;

        while (c + span < numCols) {
          const next = row[c + span];
          if (next.hidden || next.text || next.colSpan > 1 || next.rowSpan > 1) break;
          if (next.bg !== cell.bg) break;

          span++;
        }

        if (span > 1) {
          cell.colSpan = span;
          for (let k = 1; k < span; k++) {
            row[c + k].hidden = true;
          }
        }
      }
    }
  }

  /**
   * Excel's own `!cols` width is missing for plenty of real-world sheets (columns never
   * manually resized). Falling back to one flat default made most columns look truncated
   * by default — instead, size to the longest value actually in that column, like Excel's
   * own "AutoFit column width" would.
   */
  private estimateColumnWidth(grid: GridCell[][], colIndex: number): number {
    let maxLen = 0;

    for (const row of grid) {
      const cell = row[colIndex];
      // A cell spilling across several columns (real merge or overflow span) shouldn't
      // force this one column wide on its own — its width is already spread over the span.
      if (!cell || cell.hidden || cell.colSpan > 1) continue;

      if (cell.text.length > maxLen) maxLen = cell.text.length;
    }

    const estimated = maxLen * 7.2 + 20; // ~7.2px per character at 13px Calibri, plus cell padding
    return Math.round(Math.min(420, Math.max(DEFAULT_COL_WIDTH_PX, estimated)));
  }

  /** patternType "solid" fills use fgColor as the visible background; SheetJS already resolves theme+tint into .rgb. */
  private resolveFillColor(cell: XLSX.CellObject | undefined): string | null {
    const style = cell?.s as { patternType?: string; fgColor?: { rgb?: string } } | undefined;

    if (!style || style.patternType !== 'solid') return null;

    const rgb = style.fgColor?.rgb;
    return rgb ? `#${rgb}` : null;
  }

  private contrastingTextColor(hexBg: string): string {
    const hex = hexBg.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance < 0.55 ? '#ffffff' : '#1f2937';
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.onResizeMove);
    document.removeEventListener('mouseup', this.onResizeEnd);
  }

  startResize(event: MouseEvent, colIndex: number): void {
    event.preventDefault();
    event.stopPropagation();

    this.resizingCol = colIndex;
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = this.columnWidths()[colIndex] ?? DEFAULT_COL_WIDTH_PX;

    document.addEventListener('mousemove', this.onResizeMove);
    document.addEventListener('mouseup', this.onResizeEnd);
  }

  private onResizeMove = (event: MouseEvent): void => {
    if (this.resizingCol === null) return;

    const delta = event.clientX - this.resizeStartX;
    const newWidth = Math.max(MIN_COL_WIDTH_PX, Math.round(this.resizeStartWidth + delta));

    const widths = [...this.columnWidths()];
    widths[this.resizingCol] = newWidth;
    this.columnWidths.set(widths);
  };

  private onResizeEnd = (): void => {
    this.resizingCol = null;
    document.removeEventListener('mousemove', this.onResizeMove);
    document.removeEventListener('mouseup', this.onResizeEnd);
  };

  /**
   * `columnWidths()` is an array of plain numbers, and several columns commonly share the
   * same default width — without an index-based trackBy, *ngFor's default value-identity
   * diffing can reassociate a resize handle with the wrong <col>/<th> once widths collide,
   * which is what made dragging feel like it "stuck" on wider sheets.
   */
  trackByIndex(index: number): number {
    return index;
  }

  private toColumnLetter(index: number): string {
    let n = index;
    let letters = '';

    do {
      letters = String.fromCharCode(65 + (n % 26)) + letters;
      n = Math.floor(n / 26) - 1;
    } while (n >= 0);

    return letters;
  }
}
