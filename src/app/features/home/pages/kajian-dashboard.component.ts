import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';

import { MiddleOfficeDataService } from '../services/middle-office-data.service';
import { DashboardExportService, buildExportFilename } from '../services/dashboard-export.service';
import { DashboardResponse, LineChart } from '../models/dashboard-data.model';

interface CategoryOption {
  label: string;
  value: string;
}

interface CategoryGroup {
  label: string;
  items: CategoryOption[];
}

interface MetricRow {
  key: string;
  label: string;
  unit: string | null;
  isText: boolean;
  textValue: string | null;
  values: Record<string, number | null>;
}

const CHART_COLORS = ['#2563eb', '#f59e0b', '#10b981', '#ef4444'];

@Component({
  selector: 'app-kajian-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, DatePickerModule, ChartModule, TagModule, SelectModule],
  templateUrl: './kajian-dashboard.component.html',
  providers: [DatePipe]
})
export class KajianDashboardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly dataService = inject(MiddleOfficeDataService);
  private readonly exportService = inject(DashboardExportService);
  private readonly datePipe = inject(DatePipe);

  loading = signal(false);
  error = signal<string | null>(null);
  dashboard = signal<DashboardResponse | null>(null);

  // null = no range picked yet -> show every available period.
  dateRange = signal<Date[] | null>(null);
  selectedCategory = signal<string | null>(null);

  // Axis titles + value formatting adapt to the selected category's unit (% vs Rp).
  chartOptions = computed<any>(() => {
    const isPct = this.selectedChart()?.unit === '%';
    const fmtVal = (v: number | null | undefined) =>
      v == null ? '-' : isPct ? this.fmtPercent(v) : this.fmt(v);
    return {
      maintainAspectRatio: false,
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true, padding: 16, font: { size: 12, weight: 600 } } },
        tooltip: {
          intersect: false,
          mode: 'index',
          callbacks: {
            label: (ctx: any) => ` ${ctx.dataset.label}: ${fmtVal(ctx.parsed.y)}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          title: { display: true, text: 'Periode', color: '#64748b', font: { size: 12, weight: 600 } }
        },
        y: {
          grid: { color: '#f1f5f9' },
          title: {
            display: true,
            text: isPct ? 'Persentase' : 'Nilai (Rp)',
            color: '#64748b',
            font: { size: 12, weight: 600 }
          },
          ticks: { callback: (v: any) => (isPct ? `${v}%` : compactRupiah(Number(v))) }
        }
      }
    };
  });

  categoryGroups = computed<CategoryGroup[]>(() => {
    const d = this.dashboard();
    if (!d) return [];

    const groups = new Map<string, CategoryGroup>();
    for (const chart of d.charts) {
      if (!groups.has(chart.group)) groups.set(chart.group, { label: chart.groupLabel, items: [] });
      groups.get(chart.group)!.items.push({ label: chart.title, value: chart.key });
    }
    return Array.from(groups.values());
  });

  selectedChart = computed<LineChart | null>(() => {
    const d = this.dashboard();
    const key = this.selectedCategory();
    if (!d || !key) return null;
    return d.charts.find((c) => c.key === key) ?? null;
  });

  // All periods within the selected date range, in chronological order (backend already orders them).
  periodsInRange = computed<string[]>(() => {
    const chart = this.selectedChart();
    if (!chart || chart.series.length === 0) return [];

    const allPeriods = chart.series[0].points.map((p) => p.period);
    const range = this.dateRange();
    if (!range || !range[0]) return allPeriods;

    const startIso = toIsoDate(range[0]);
    const endIso = toIsoDate(range[1] ?? range[0]);
    return allPeriods.filter((p) => p >= startIso && p <= endIso);
  });

  // One row per metric, one column per period in range — every selected date gets its own value,
  // not just the latest one. Status-only metrics (no chart series) repeat the backend's latest text
  // across every column since only the latest/previous value is available for those.
  metricRows = computed<MetricRow[]>(() => {
    const d = this.dashboard();
    const chart = this.selectedChart();
    const category = this.selectedCategory();
    if (!d || !chart || !category) return [];

    return d.cards
      .filter((card) => card.category === category)
      .map((card) => {
        const series = chart.series.find((s) => s.key === card.key);
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
      });
  });

  chartData = computed<any>(() => {
    const chart = this.selectedChart();
    const range = this.periodsInRange();
    if (!chart) return null;

    const singlePoint = range.length === 1;

    return {
      labels: range,
      datasets: chart.series.map((series, i) => {
        const color = CHART_COLORS[i % CHART_COLORS.length];
        return {
          label: series.label,
          data: range.map((period) => series.points.find((p) => p.period === period)?.value ?? null),
          borderColor: color,
          backgroundColor: `${color}1f`,
          pointBackgroundColor: color,
          tension: 0.35,
          fill: false,
          showLine: !singlePoint,
          pointRadius: singlePoint ? 6 : 3
        };
      })
    };
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.dataService.getKajianRisikoDashboard().subscribe({
      next: (res) => {
        this.dashboard.set(res);
        if (res.periodsProcessed === 0) {
          this.error.set(res.message);
        } else {
          if (!this.selectedCategory() && res.charts.length > 0) {
            this.selectedCategory.set(res.charts[0].key);
          }

          // Default to the most recent 5-day window instead of dumping every bundled period on
          // the chart — the picker's own fixed-window logic already knows how to build that range.
          const points = res.charts.find((c) => c.series.length > 0)?.series[0]?.points ?? [];
          if (points.length > 0) {
            const latest = new Date(points.at(-1)!.period);
            latest.setDate(latest.getDate() - 4);
            this.onStartDateSelect(latest);
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

  // Kajian Risiko is a daily report, so the range is always a fixed 5-day window — whichever date
  // the user clicks becomes the start, the end is derived, never independently picked.
  onStartDateSelect(date: Date): void {
    const end = new Date(date);
    end.setDate(end.getDate() + 4);
    this.dateRange.set([date, end]);
  }

  resetFilters(): void {
    this.dateRange.set(null);
    const first = this.dashboard()?.charts[0]?.key ?? null;
    this.selectedCategory.set(first);
  }

  trafficSeverity(status: string | null): 'success' | 'warn' | 'danger' | 'secondary' | 'info' {
    if (!status) return 'secondary';
    const s = status.toUpperCase();
    if (s.includes('GREEN')) return 'success';
    if (s.includes('YELLOW')) return 'warn';
    if (s.includes('RED')) return 'danger';
    return 'info';
  }

  fmt(value: number | null): string {
    if (value == null) return '-';
    return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(value);
  }

  fmtPercent(value: number | null): string {
    if (value == null) return '-';
    return `${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(value)}%`;
  }

  isPercentUnit(unit: string | null): boolean {
    return unit === '%';
  }

  // ---- Download -------------------------------------------------------------

  downloadOptions: { label: string; value: 'all' | 'chart'; disabled?: boolean }[] = [
    { label: 'Download semua', value: 'all' },
    { label: 'Download tanpa metrik', value: 'chart' }
  ];
  selectedDownload: 'all' | 'chart' | null = null;

  canDownload(): boolean {
    return !!this.selectedChart();
  }

  syncDownloadOptions(): void {
    this.downloadOptions[1].disabled = !this.chartData();
  }

  onDownloadSelect(): void {
    const choice = this.selectedDownload;
    if (!choice) return;
    this.download(choice === 'all');
    setTimeout(() => (this.selectedDownload = null), 0);
  }

  private download(includeTables: boolean): void {
    const chart = this.selectedChart();
    if (!chart) return;

    const periods = this.periodsInRange();
    const cols = periods.map((p) => this.datePipe.transform(p, 'dd MMM yyyy') ?? p);

    const tables = includeTables
      ? [
          {
            columns: ['Metrik', ...cols],
            rows: this.metricRows().map((r) => ({
              label: r.label,
              cells: periods.map((p) =>
                r.isText
                  ? r.textValue || '-'
                  : this.isPercentUnit(r.unit)
                    ? this.fmtPercent(r.values[p] ?? null)
                    : this.fmt(r.values[p] ?? null)
              )
            }))
          }
        ]
      : [];

    const periodeRange = periods.length
      ? `${periods[0]} sd ${periods[periods.length - 1]}`
      : '-';

    this.exportService.exportPng({
      title: 'Kajian Risiko Likuiditas',
      subtitle: `${chart.groupLabel} — ${chart.title}`,
      periode: periods.join(', ') || '-',
      filename: buildExportFilename('Kajian Risiko Likuiditas', chart.title, periodeRange),
      chart: this.chartData() ? { data: this.chartData(), options: this.chartOptions() } : null,
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

// Compact Rupiah for y-axis ticks: 8_665_752 -> "8,7 jt", 1_850_000_000 -> "1,9 M".
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

