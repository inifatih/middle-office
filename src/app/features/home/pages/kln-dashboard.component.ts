import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';

import { MiddleOfficeDataService } from '../services/middle-office-data.service';
import { DashboardExportService, buildExportFilename } from '../services/dashboard-export.service';
import { DashboardResponse } from '../models/dashboard-data.model';

const MIN_PERIODS = 2;
const MAX_PERIODS = 5;

interface MetricRow {
  key: string;
  label: string;
  unit: string | null;
  isText: boolean;
  textValue: string | null;
  values: Record<string, number | null>;
}

interface BranchTable {
  key: string;
  label: string;
  trafficLight: string | null;
  rows: MetricRow[];
}

interface MetricOption {
  key: string;
  label: string;
  unit: string | null;
}

interface MetricChart {
  key: string;
  label: string;
  unit: string | null;
  data: any;
  options: any;
}

const CHART_COLORS = ['#2563eb', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#0ea5e9', '#ec4899', '#14b8a6'];

@Component({
  selector: 'app-kln-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, DatePickerModule, ChartModule, SelectModule, TagModule, CheckboxModule],
  templateUrl: './kln-dashboard.component.html',
  providers: [DatePipe]
})
export class KlnDashboardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly dataService = inject(MiddleOfficeDataService);
  private readonly exportService = inject(DashboardExportService);
  private readonly datePipe = inject(DatePipe);

  loading = signal(false);
  error = signal<string | null>(null);
  dashboard = signal<DashboardResponse | null>(null);

  dateRange = signal<Date[] | null>(null);
  checkedBranches = signal<Set<string>>(new Set());
  checkedMetrics = signal<Set<string>>(new Set());

  readonly minPeriods = MIN_PERIODS;
  readonly maxPeriods = MAX_PERIODS;

  private profilChart = computed(() => this.dashboard()?.charts.find((c) => c.key === 'profilMaturitasKln') ?? null);

  // Every monthly period the backend bundled, in chronological order.
  private allPeriods = computed<string[]>(
    () => this.profilChart()?.series[0]?.points.map((p) => p.period) ?? []
  );

  branches = computed(() => this.profilChart()?.series.map((s) => ({ key: s.key, label: s.label })) ?? []);

  // Metrics analysable per branch, derived from the per-branch charts the backend bundles
  // (Aset, Kewajiban, Selisih, Profil Maturitas). Order follows the backend's series order.
  metrics = computed<MetricOption[]>(() => {
    const d = this.dashboard();
    if (!d) return [];
    const seen = new Map<string, MetricOption>();
    for (const chart of d.charts) {
      if (chart.group !== 'branch') continue;
      for (const s of chart.series) {
        if (seen.has(s.key)) continue;
        const unit = d.cards.find((c) => c.key === s.key)?.unit ?? null;
        seen.set(s.key, { key: s.key, label: s.label, unit });
      }
    }
    return Array.from(seen.values());
  });

  periodsInRange = computed<string[]>(() => {
    const all = this.allPeriods();
    const range = this.dateRange();
    if (!range || !range[0]) return all;

    const startIso = toIsoDate(range[0]);
    const endIso = toIsoDate(range[1] ?? range[0]);
    return all.filter((p) => p >= startIso && p <= endIso);
  });

  checkedBranchList = computed(() => this.branches().filter((b) => this.checkedBranches().has(b.key)));
  checkedMetricList = computed(() => this.metrics().filter((m) => this.checkedMetrics().has(m.key)));

  hasSelection = computed(() => this.checkedBranchList().length > 0 && this.checkedMetricList().length > 0);

  // One table per checked branch: numeric rows are limited to the selected metrics, while
  // status rows (Reserve Requirement, Traffic Light) always stay for context.
  branchTables = computed<BranchTable[]>(() => {
    const d = this.dashboard();
    if (!d) return [];

    return this.checkedBranchList().map(({ key, label }) => {
      const branchChart = d.charts.find((c) => c.key === key && c.group === 'branch');
      const cards = d.cards.filter((c) => c.category === key);

      const rows: MetricRow[] = cards
        .map((card) => {
          const series = branchChart?.series.find((s) => s.key === card.key);
          const values: Record<string, number | null> = {};
          if (series) {
            for (const p of series.points) values[p.period] = p.value;
          }
          return {
            key: card.key,
            label: card.label,
            unit: card.unit,
            isText: !series,
            textValue: card.latestText,
            values
          };
        })
        .filter((r) => r.isText || this.checkedMetrics().has(r.key));

      const trafficLight = cards.find((c) => c.key === 'trafficLight')?.latestText ?? null;
      return { key, label, trafficLight, rows };
    });
  });

  // One chart per selected metric — each keeps a single unit and y-axis, so the picture
  // stays readable however many metrics are picked. Branch colours are stable across charts.
  metricCharts = computed<MetricChart[]>(() => {
    const d = this.dashboard();
    const range = this.periodsInRange();
    const branches = this.checkedBranchList();
    const metrics = this.checkedMetricList();
    if (!d || branches.length === 0 || metrics.length === 0 || range.length === 0) return [];

    const singlePoint = range.length === 1;
    const labels = range.map((p) => this.datePipe.transform(p, 'MMM yyyy') ?? p);
    const allBranches = this.branches();

    return metrics.map((m) => {
      const isPct = m.unit === '%';
      const fmtVal = (v: number | null | undefined) =>
        v == null ? '-' : isPct ? this.fmtPercent(v) : this.fmt(v);

      const datasets = branches.map((b) => {
        const branchChart = d.charts.find((c) => c.key === b.key && c.group === 'branch');
        const series = branchChart?.series.find((s) => s.key === m.key);
        const color = CHART_COLORS[Math.max(0, allBranches.findIndex((x) => x.key === b.key)) % CHART_COLORS.length];
        return {
          label: b.label,
          data: range.map((period) => series?.points.find((p) => p.period === period)?.value ?? null),
          borderColor: color,
          backgroundColor: `${color}1f`,
          pointBackgroundColor: color,
          tension: 0.35,
          fill: false,
          showLine: !singlePoint,
          pointRadius: singlePoint ? 6 : 3
        };
      });

      const options = {
        maintainAspectRatio: false,
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { usePointStyle: true, padding: 14, font: { size: 11, weight: 600 } } },
          tooltip: {
            intersect: false,
            mode: 'index',
            callbacks: { label: (ctx: any) => ` ${ctx.dataset.label}: ${fmtVal(ctx.parsed.y)}` }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            title: { display: true, text: 'Periode (Bulan)', color: '#64748b', font: { size: 11, weight: 600 } }
          },
          y: {
            grid: { color: '#f1f5f9' },
            title: {
              display: true,
              text: isPct ? `${m.label} (%)` : `${m.label} (Rp)`,
              color: '#64748b',
              font: { size: 11, weight: 600 }
            },
            ticks: { callback: (v: any) => (isPct ? `${v}%` : compactRupiah(Number(v))) }
          }
        }
      };

      return { key: m.key, label: m.label, unit: m.unit, data: { labels, datasets }, options };
    });
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.dataService.getProfilKlnDashboard().subscribe({
      next: (res) => {
        this.dashboard.set(res);
        if (res.periodsProcessed === 0) {
          this.error.set(res.message);
        } else {
          const chart = res.charts.find((c) => c.key === 'profilMaturitasKln');
          this.checkedBranches.set(new Set(chart?.series.map((s) => s.key) ?? []));

          // Land on the familiar single-metric view; the user opens up the rest via the filter.
          const metricKeys = this.metrics().map((m) => m.key);
          this.checkedMetrics.set(
            new Set(metricKeys.includes('profilMaturitasPercent') ? ['profilMaturitasPercent'] : metricKeys)
          );

          // Default to the most recent MAX_PERIODS window.
          const all = this.allPeriods();
          if (all.length > 0) {
            const from = Math.max(0, all.length - MAX_PERIODS);
            this.dateRange.set([new Date(all[from]), new Date(all[all.length - 1])]);
          }
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Gagal memuat data dari backend. Pastikan API berjalan di localhost:5279.');
        this.loading.set(false);
      }
    });
  }

  // Range picker (month view). The user picks a start and end month; the window is then snapped
  // to cover between MIN_PERIODS and MAX_PERIODS of the actually-available monthly periods.
  onRangeChange(value: (Date | null)[] | null): void {
    if (!value || !value[0]) {
      this.dateRange.set(null);
      return;
    }
    // First click of a new range — reflect the start and wait for the end.
    if (!value[1]) {
      this.dateRange.set([value[0]]);
      return;
    }

    const all = this.allPeriods();
    if (all.length === 0) {
      this.dateRange.set([value[0], value[1]]);
      return;
    }

    let d0 = value[0];
    let d1 = value[1];
    if (d0 > d1) [d0, d1] = [d1, d0];
    const aIso = toIsoDate(new Date(d0.getFullYear(), d0.getMonth(), 1));
    const bIso = toIsoDate(new Date(d1.getFullYear(), d1.getMonth() + 1, 0));

    let idxs = all.map((_, i) => i).filter((i) => all[i] >= aIso && all[i] <= bIso);
    if (idxs.length === 0) {
      let i = all.findIndex((p) => p >= aIso);
      if (i < 0) i = all.length - 1;
      idxs = [i];
    }

    let lo = idxs[0];
    let hi = idxs[idxs.length - 1];
    if (hi - lo + 1 > MAX_PERIODS) hi = lo + MAX_PERIODS - 1;
    while (hi - lo + 1 < MIN_PERIODS) {
      if (hi + 1 < all.length) hi++;
      else if (lo > 0) lo--;
      else break;
    }

    this.dateRange.set([new Date(all[lo]), new Date(all[hi])]);
  }

  toggleBranch(key: string, checked: boolean): void {
    const next = new Set(this.checkedBranches());
    if (checked) next.add(key);
    else next.delete(key);
    this.checkedBranches.set(next);
  }

  toggleMetric(key: string, checked: boolean): void {
    const next = new Set(this.checkedMetrics());
    if (checked) next.add(key);
    else next.delete(key);
    this.checkedMetrics.set(next);
  }

  // Shared "Pilih Semua" / "Hapus Semua" for both the Cabang and Metrik filters.
  setAll(target: 'cabang' | 'metrik', all: boolean): void {
    if (target === 'cabang') {
      this.checkedBranches.set(all ? new Set(this.branches().map((b) => b.key)) : new Set());
    } else {
      this.checkedMetrics.set(all ? new Set(this.metrics().map((m) => m.key)) : new Set());
    }
  }

  trafficSeverity(status: string | null): 'success' | 'warn' | 'danger' | 'secondary' {
    if (!status) return 'secondary';
    const s = status.toUpperCase();
    if (s.includes('GREEN')) return 'success';
    if (s.includes('YELLOW')) return 'warn';
    if (s.includes('RED')) return 'danger';
    return 'secondary';
  }

  fmt(value: number | null): string {
    if (value == null) return '-';
    return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(value);
  }

  fmtPercent(value: number | null): string {
    if (value == null) return '-';
    return `${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(value)}%`;
  }

  // ---- Download -------------------------------------------------------------

  downloadOptions: { label: string; value: 'all' | 'chart'; disabled?: boolean }[] = [
    { label: 'Download semua', value: 'all' },
    { label: 'Download tanpa metrik', value: 'chart' }
  ];
  selectedDownload: 'all' | 'chart' | null = null;

  canDownload(): boolean {
    return this.hasSelection();
  }

  syncDownloadOptions(): void {
    this.downloadOptions[1].disabled = this.metricCharts().length === 0;
  }

  onDownloadSelect(): void {
    const choice = this.selectedDownload;
    if (!choice) return;
    this.download(choice === 'all');
    setTimeout(() => (this.selectedDownload = null), 0);
  }

  private download(includeTables: boolean): void {
    const branches = this.checkedBranchList();
    const metrics = this.checkedMetricList();
    if (branches.length === 0 || metrics.length === 0) return;

    const periods = this.periodsInRange();
    const cols = periods.map((p) => this.datePipe.transform(p, 'MMM yyyy') ?? p);

    const tables = includeTables
      ? this.branchTables().map((b) => ({
          heading: b.label,
          badge: b.trafficLight,
          columns: ['Metrik', ...cols],
          rows: b.rows.map((r) => ({
            label: r.label,
            cells: periods.map((p) =>
              r.isText
                ? r.textValue || '-'
                : r.unit === '%'
                  ? this.fmtPercent(r.values[p] ?? null)
                  : this.fmt(r.values[p] ?? null)
            )
          }))
        }))
      : [];

    const cabang =
      branches.length >= this.branches().length
        ? 'Semua Cabang'
        : branches.length <= 3
          ? branches.map((b) => b.label).join('-')
          : `${branches.length} Cabang`;
    const metrik =
      metrics.length >= this.metrics().length ? 'Semua Metrik' : metrics.map((m) => m.label).join('-');

    const periodeRange = periods.length
      ? `${this.datePipe.transform(periods[0], 'MMM yyyy')} sd ${this.datePipe.transform(periods[periods.length - 1], 'MMM yyyy')}`
      : '-';

    this.exportService.exportPng({
      title: 'Profil Maturitas KLN',
      subtitle: `${cabang} — ${metrik}`,
      periode: periods.join(', ') || '-',
      filename: buildExportFilename('Profil Maturitas KLN', `${cabang}_${metrik}`, periodeRange),
      charts: this.metricCharts().map((mc) => ({
        heading: mc.unit ? `${mc.label} (${mc.unit})` : mc.label,
        data: mc.data,
        options: mc.options
      })),
      tables
    });
  }

  backToMenu(): void {
    this.router.navigate(['/']);
  }
}

function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Compact Rupiah for y-axis ticks: 686_411 -> "686 rb", 3_423_984 -> "3,4 jt".
function compactRupiah(v: number): string {
  if (!Number.isFinite(v)) return '';
  const abs = Math.abs(v);
  const scaled = (n: number, suffix: string) =>
    `${(v / n).toLocaleString('id-ID', { maximumFractionDigits: 1 })} ${suffix}`;
  if (abs >= 1e12) return scaled(1e12, 'T');
  if (abs >= 1e9) return scaled(1e9, 'M');
  if (abs >= 1e6) return scaled(1e6, 'jt');
  if (abs >= 1e3) return scaled(1e3, 'rb');
  return v.toLocaleString('id-ID');
}
