import { Injectable } from '@angular/core';
import Chart from 'chart.js/auto';

/**
 * Dependency-light PNG export for the Middle Office dashboards.
 *
 * The exported image mirrors the on-screen card: dashboard title, category,
 * "Periode" line, the metric table(s) and the line chart — everything below the
 * filter row. The chart is re-rendered off-screen through Chart.js (already a
 * dependency via PrimeNG) so the capture is always a complete, synchronous paint
 * instead of a possibly-empty read of the live canvas.
 *
 *  - exportPng({ ..., tables })     -> title, category, periode, metric tables, chart
 *  - exportPng({ ..., tables: [] }) -> title, category, periode, chart only
 */

export interface ExportRow {
  label: string;
  cells: string[];
}

export interface ExportTable {
  /** Optional per-table heading (KLN uses the branch name). */
  heading?: string | null;
  /** Optional pill drawn at the right of the heading (traffic light). */
  badge?: string | null;
  /** Header cells; the first labels the row-label column (e.g. "Metrik"). */
  columns: string[];
  rows: ExportRow[];
}

export interface ExportChart {
  data: unknown;
  options?: unknown;
  type?: string;
}

export interface ExportChartEntry {
  heading?: string;
  data: unknown;
  options?: unknown;
  type?: string;
}

export interface DashboardExportOptions {
  title: string;
  subtitle?: string | null;
  periode: string;
  filename: string;
  /** Single chart. */
  chart?: ExportChart | null;
  /** Several stacked charts, each with its own heading (KLN: one per metric). */
  charts?: ExportChartEntry[];
  /** Omit or pass [] to export without the metric tables. */
  tables?: ExportTable[];
}

/** Build "JudulWorkSheet_Kategori_Periode.png" with filesystem-safe parts. */
export function buildExportFilename(worksheet: string, kategori: string, periode: string): string {
  const clean = (s: string) =>
    (s || '')
      .replace(/[\\/:*?"<>|]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  return `${clean(worksheet)}_${clean(kategori)}_${clean(periode)}.png`;
}

const SCALE = 2;
const PAGE_PAD = 24;
const CARD_PAD = 28;
const CONTENT_MIN = 900;
const CONTENT_MAX = 1440;
const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const HEADER_ROW_H = 40;
const BODY_ROW_H = 42;
const CELL_PAD_X = 16;

const C = {
  page: '#eef3fb',
  card: '#ffffff',
  cardBorder: '#e9eef5',
  ink: '#0f172a',
  inkSoft: '#334155',
  muted: '#64748b',
  headBg: '#f8fafc',
  rowAlt: '#fafbfc',
  line: '#eef2f7',
  box: '#f8fafc',
  tagBlueBg: '#dbeafe',
  tagBlueInk: '#1d4ed8',
  tagGreenBg: '#dcfce7',
  tagGreenInk: '#15803d',
  tagWarnBg: '#fef9c3',
  tagWarnInk: '#a16207',
  tagDangerBg: '#fee2e2',
  tagDangerInk: '#b91c1c'
};

interface TableLayout {
  table: ExportTable;
  rows: ExportRow[];
  labelW: number;
  colW: number[];
  width: number;
  headingH: number;
  bodyH: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardExportService {
  async exportPng(opts: DashboardExportOptions): Promise<void> {
    if (typeof document === 'undefined') return;

    const measure = document.createElement('canvas').getContext('2d');
    if (!measure) return;

    const tables = opts.tables ?? [];
    const layouts = tables.map((t) => this.layoutTable(measure, t));
    const widestTable = layouts.reduce((m, l) => Math.max(m, l.width), 0);
    const contentWidth = Math.min(CONTENT_MAX, Math.max(CONTENT_MIN, Math.ceil(widestTable)));

    const chartEntries: ExportChartEntry[] = opts.charts?.length
      ? opts.charts
      : opts.chart
        ? [{ data: opts.chart.data, options: opts.chart.options, type: opts.chart.type }]
        : [];

    const chartH = chartEntries.length ? Math.round(Math.min(contentWidth * 0.42, 380)) : 0;
    const chartImgs = await Promise.all(
      chartEntries.map((e) =>
        this.renderChart({ data: e.data, options: e.options, type: e.type }, contentWidth - 32, chartH)
      )
    );

    // --- vertical layout of the card body ---
    const titleH = 32;
    const subtitleH = opts.subtitle ? 28 : 0;
    const periodeH = 24;
    const gapAfterHead = 18;

    let tablesH = 0;
    for (const l of layouts) tablesH += l.headingH + l.bodyH + 22;

    let chartBlockH = 0;
    if (chartImgs.some(Boolean)) {
      chartBlockH += 20;
      chartImgs.forEach((img, i) => {
        if (!img) return;
        chartBlockH += (i > 0 ? 16 : 0) + (chartEntries[i].heading ? 24 : 0) + chartH + 32;
      });
    }

    const cardContentH =
      titleH + subtitleH + periodeH + gapAfterHead + tablesH + chartBlockH;
    const cardW = contentWidth + CARD_PAD * 2;
    const cardH = cardContentH + CARD_PAD * 2;
    const canvasW = cardW + PAGE_PAD * 2;
    const canvasH = cardH + PAGE_PAD * 2;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(canvasW * SCALE);
    canvas.height = Math.round(canvasH * SCALE);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(SCALE, SCALE);

    // page background
    ctx.fillStyle = C.page;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // card
    ctx.save();
    ctx.shadowColor = 'rgba(15, 23, 42, 0.08)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;
    this.roundRectPath(ctx, PAGE_PAD, PAGE_PAD, cardW, cardH, 18);
    ctx.fillStyle = C.card;
    ctx.fill();
    ctx.restore();
    this.roundRectPath(ctx, PAGE_PAD, PAGE_PAD, cardW, cardH, 18);
    ctx.strokeStyle = C.cardBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    const x = PAGE_PAD + CARD_PAD;
    let y = PAGE_PAD + CARD_PAD;

    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    // title
    ctx.font = `700 22px ${FONT}`;
    ctx.fillStyle = C.ink;
    ctx.fillText(opts.title, x, y);
    y += titleH;

    // category / subtitle
    if (opts.subtitle) {
      ctx.font = `600 19px ${FONT}`;
      ctx.fillStyle = C.ink;
      ctx.fillText(opts.subtitle, x, y);
      y += subtitleH;
    }

    // periode
    ctx.font = `400 13px ${FONT}`;
    ctx.fillStyle = C.muted;
    const prefix = 'Periode: ';
    ctx.fillText(prefix, x, y + 2);
    const prefixW = ctx.measureText(prefix).width;
    ctx.font = `700 13px ${FONT}`;
    ctx.fillStyle = C.inkSoft;
    ctx.fillText(opts.periode || '-', x + prefixW, y + 2);
    y += periodeH + gapAfterHead;

    // tables
    for (const l of layouts) {
      y = this.drawTable(ctx, l, x, y, contentWidth);
      y += 22;
    }

    // chart(s)
    if (chartImgs.some(Boolean)) {
      y += 20;
      let first = true;
      chartImgs.forEach((img, i) => {
        if (!img) return;
        if (!first) y += 16;
        first = false;
        const heading = chartEntries[i].heading;
        if (heading) {
          ctx.fillStyle = C.ink;
          ctx.font = `700 14px ${FONT}`;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          ctx.fillText(heading, x, y);
          y += 24;
        }
        this.roundRectPath(ctx, x, y, contentWidth, chartH + 32, 12);
        ctx.fillStyle = C.box;
        ctx.fill();
        ctx.strokeStyle = C.line;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.drawImage(img, x + 16, y + 16, contentWidth - 32, chartH);
        y += chartH + 32;
      });
    }

    await new Promise<void>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = opts.filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
        resolve();
      }, 'image/png');
    });
  }

  // ---- chart -------------------------------------------------------------

  private async renderChart(
    chart: ExportChart,
    boxW: number,
    boxH: number
  ): Promise<HTMLImageElement | null> {
    const cv = document.createElement('canvas');
    cv.width = Math.round(boxW * SCALE);
    cv.height = Math.round(boxH * SCALE);

    // Data is JSON-cloned so the offscreen chart can't disturb the live one.
    // Options are shallow-spread (not cloned) so axis-title / tick / tooltip
    // callback functions survive into the export.
    const data = safeClone(chart.data) ?? {};
    const options = {
      ...((chart.options as Record<string, unknown>) ?? {}),
      responsive: false,
      maintainAspectRatio: false,
      animation: false,
      devicePixelRatio: SCALE
    };

    let instance: Chart | null = null;
    try {
      instance = new Chart(cv, {
        type: (chart.type as 'line') ?? 'line',
        data: data as never,
        options: options as never
      });
      instance.update('none');
      const url = cv.toDataURL('image/png');
      return await loadImage(url);
    } catch {
      return null;
    } finally {
      instance?.destroy();
    }
  }

  // ---- tables ----------------------------------------------------------------

  private layoutTable(ctx: CanvasRenderingContext2D, table: ExportTable): TableLayout {
    ctx.font = `700 11px ${FONT}`;
    let labelW = ctx.measureText((table.columns[0] ?? 'Metrik').toUpperCase()).width;
    ctx.font = `600 13px ${FONT}`;
    for (const r of table.rows) labelW = Math.max(labelW, ctx.measureText(r.label).width);
    labelW = Math.max(220, Math.ceil(labelW) + CELL_PAD_X * 2);

    let dataColW = 0;
    for (let c = 1; c < table.columns.length; c++) {
      ctx.font = `700 11px ${FONT}`;
      dataColW = Math.max(dataColW, ctx.measureText((table.columns[c] ?? '').toUpperCase()).width);
      ctx.font = `600 13px ${FONT}`;
      for (const r of table.rows) {
        dataColW = Math.max(dataColW, ctx.measureText(r.cells[c - 1] ?? '').width);
      }
    }
    dataColW = Math.max(112, Math.ceil(dataColW) + CELL_PAD_X * 2);

    const dataCols = Math.max(0, table.columns.length - 1);
    const colW = new Array(dataCols).fill(dataColW);
    const width = labelW + dataColW * dataCols;

    return {
      table,
      rows: table.rows,
      labelW,
      colW,
      width,
      headingH: table.heading ? 34 : 0,
      bodyH: HEADER_ROW_H + table.rows.length * BODY_ROW_H
    };
  }

  private drawTable(
    ctx: CanvasRenderingContext2D,
    l: TableLayout,
    x: number,
    y: number,
    contentWidth: number
  ): number {
    const cols = l.table.columns;

    if (l.table.heading) {
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';
      ctx.font = `700 15px ${FONT}`;
      ctx.fillStyle = C.ink;
      ctx.fillText(l.table.heading, x, y + 4);
      if (l.table.badge) this.drawTag(ctx, l.table.badge, x + contentWidth - 8, y + 13, 'right');
      y += l.headingH;
    }

    const factor = contentWidth / l.width;
    const labelW = l.labelW * factor;
    const colW = l.colW.map((w) => w * factor);
    const bodyH = l.bodyH;

    ctx.save();
    this.roundRectPath(ctx, x, y, contentWidth, bodyH, 12);
    ctx.clip();

    // header + zebra backgrounds
    ctx.fillStyle = C.headBg;
    ctx.fillRect(x, y, contentWidth, HEADER_ROW_H);
    for (let i = 0; i < l.rows.length; i++) {
      if (i % 2 === 1) {
        ctx.fillStyle = C.rowAlt;
        ctx.fillRect(x, y + HEADER_ROW_H + i * BODY_ROW_H, contentWidth, BODY_ROW_H);
      }
    }

    // header text
    ctx.textBaseline = 'middle';
    ctx.font = `700 11px ${FONT}`;
    ctx.fillStyle = C.muted;
    ctx.textAlign = 'left';
    ctx.fillText((cols[0] ?? 'Metrik').toUpperCase(), x + CELL_PAD_X, y + HEADER_ROW_H / 2 + 1);
    ctx.textAlign = 'center';
    let hx = x + labelW;
    for (let c = 0; c < colW.length; c++) {
      ctx.fillText((cols[c + 1] ?? '').toUpperCase(), hx + colW[c] / 2, y + HEADER_ROW_H / 2 + 1);
      hx += colW[c];
    }

    // rows
    for (let i = 0; i < l.rows.length; i++) {
      const row = l.rows[i];
      const ry = y + HEADER_ROW_H + i * BODY_ROW_H;
      const midY = ry + BODY_ROW_H / 2;

      ctx.textAlign = 'left';
      ctx.font = `600 13px ${FONT}`;
      ctx.fillStyle = C.inkSoft;
      ctx.fillText(row.label, x + CELL_PAD_X, midY + 1);

      let dx = x + labelW;
      for (let c = 0; c < colW.length; c++) {
        const val = row.cells[c] ?? '-';
        const cx = dx + colW[c] / 2;
        if (looksNumeric(val)) {
          ctx.textAlign = 'center';
          ctx.font = `600 13px ${FONT}`;
          ctx.fillStyle = C.ink;
          ctx.fillText(val, cx, midY + 1);
        } else {
          this.drawTag(ctx, val, cx, midY, 'center');
        }
        dx += colW[c];
      }
    }
    ctx.restore();

    // grid lines
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 1; i < l.rows.length; i++) {
      const gy = y + HEADER_ROW_H + i * BODY_ROW_H;
      ctx.moveTo(x, gy);
      ctx.lineTo(x + contentWidth, gy);
    }
    ctx.moveTo(x, y + HEADER_ROW_H);
    ctx.lineTo(x + contentWidth, y + HEADER_ROW_H);
    let vx = x + labelW;
    for (let c = 0; c < colW.length; c++) {
      ctx.moveTo(vx, y);
      ctx.lineTo(vx, y + bodyH);
      vx += colW[c];
    }
    ctx.stroke();

    this.roundRectPath(ctx, x, y, contentWidth, bodyH, 12);
    ctx.strokeStyle = C.line;
    ctx.stroke();

    ctx.textBaseline = 'top';
    return y + bodyH;
  }

  private drawTag(
    ctx: CanvasRenderingContext2D,
    text: string,
    anchorX: number,
    centerY: number,
    align: 'center' | 'right'
  ): void {
    const label = text || '-';
    ctx.font = `600 11px ${FONT}`;
    const tw = ctx.measureText(label).width;
    const h = 21;
    const w = tw + 20;
    const bx = align === 'right' ? anchorX - w : anchorX - w / 2;
    const by = centerY - h / 2;

    const s = label.toUpperCase();
    let bg = C.tagBlueBg;
    let ink = C.tagBlueInk;
    if (s.includes('GREEN')) {
      bg = C.tagGreenBg;
      ink = C.tagGreenInk;
    } else if (s.includes('YELLOW')) {
      bg = C.tagWarnBg;
      ink = C.tagWarnInk;
    } else if (s.includes('RED')) {
      bg = C.tagDangerBg;
      ink = C.tagDangerInk;
    }

    this.roundRectPath(ctx, bx, by, w, h, h / 2);
    ctx.fillStyle = bg;
    ctx.fill();

    ctx.fillStyle = ink;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, bx + w / 2, centerY + 1);
  }

  private roundRectPath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ): void {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }
}

function looksNumeric(s: string): boolean {
  const t = (s ?? '').trim();
  return t === '' || t === '-' || /^-?[\d.,]+\s*%?$/.test(t);
}

function safeClone<T>(v: T): T | undefined {
  if (v == null) return undefined;
  try {
    return JSON.parse(JSON.stringify(v)) as T;
  } catch {
    return undefined;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
