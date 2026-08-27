import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';

import { MiddleOfficeDataService } from '../services/middle-office-data.service';
import { DashboardResponse } from '../models/dashboard-data.model';

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

const CHART_COLORS = ['#2563eb', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#0ea5e9'];

@Component({
  selector: 'app-kln-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, DatePickerModule, ChartModule, TagModule, CheckboxModule],
  templateUrl: './kln-dashboard.component.html'
})
export class KlnDashboardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly dataService = inject(MiddleOfficeDataService);

  loading = signal(false);
  error = signal<string | null>(null);
  dashboard = signal<DashboardResponse | null>(null);

  dateRange = signal<Date[] | null>(null);
  checkedBranches = signal<Set<string>>(new Set());

  chartOptions: any = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { usePointStyle: true, padding: 16, font: { size: 12, weight: 600 } } },
      tooltip: { intersect: false, mode: 'index' }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#f1f5f9' } }
    }
  };

  private profilChart = computed(() => this.dashboard()?.charts.find((c) => c.key === 'profilMaturitasKln') ?? null);

  branches = computed(() => this.profilChart()?.series.map((s) => ({ key: s.key, label: s.label })) ?? []);

  periodsInRange = computed<string[]>(() => {
    const chart = this.profilChart();
    if (!chart || chart.series.length === 0) return [];

    const allPeriods = chart.series[0].points.map((p) => p.period);
    const range = this.dateRange();
    if (!range || !range[0]) return allPeriods;

    const startIso = toIsoDate(range[0]);
    const endIso = toIsoDate(range[1] ?? range[0]);
    return allPeriods.filter((p) => p >= startIso && p <= endIso);
  });

  checkedBranchList = computed(() => this.branches().filter((b) => this.checkedBranches().has(b.key)));

  // One table per checked branch, one column per period in range — every selected month gets its
  // own value, not just the latest one. Each branch has its own chart (Key = branch slug, built by
  // the backend alongside the overlay "profilMaturitasKln" chart) carrying full per-period history
  // for every numeric metric.
  branchTables = computed<BranchTable[]>(() => {
    const d = this.dashboard();
    if (!d) return [];

    return this.checkedBranchList().map(({ key, label }) => {
      const branchChart = d.charts.find((c) => c.key === key && c.group === 'branch');
      const cards = d.cards.filter((c) => c.category === key);

      const rows: MetricRow[] = cards.map((card) => {
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
      });

      const trafficLight = cards.find((c) => c.key === 'trafficLight')?.latestText ?? null;
      return { key, label, trafficLight, rows };
    });
  });

  chartData = computed<any>(() => {
    const chart = this.profilChart();
    const range = this.periodsInRange();
    const checked = this.checkedBranchList();
    if (!chart || checked.length === 0) return null;

    const singlePoint = range.length === 1;

    return {
      labels: range,
      datasets: checked.map(({ key, label }, i) => {
        const series = chart.series.find((s) => s.key === key);
        const color = CHART_COLORS[i % CHART_COLORS.length];
        return {
          label,
          data: range.map((period) => series?.points.find((p) => p.period === period)?.value ?? null),
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

    this.dataService.getProfilKlnDashboard().subscribe({
      next: (res) => {
        this.dashboard.set(res);
        if (res.periodsProcessed === 0) {
          this.error.set(res.message);
        } else {
          const chart = res.charts.find((c) => c.key === 'profilMaturitasKln');
          this.checkedBranches.set(new Set(chart?.series.map((s) => s.key) ?? []));

          // Default to the most recent 5-month window instead of dumping every bundled period on
          // the chart — the picker's own fixed-window logic already knows how to build that range.
          const points = chart?.series[0]?.points ?? [];
          if (points.length > 0) {
            const latest = new Date(points.at(-1)!.period);
            this.onStartMonthSelect(new Date(latest.getFullYear(), latest.getMonth() - 4, 1));
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

  // Maturity Profile / KLN is reported monthly, so the range is always a fixed 5-month window —
  // whichever month the user picks becomes the start, the end is derived, never independently picked.
  // The end boundary must cover the *entire* 5th month (periods land on whatever day-of-month the
  // source file used, e.g. "30 Jun" vs "26 Jul") — day 0 of month+5 is the last day of month+4.
  onStartMonthSelect(date: Date): void {
    const end = new Date(date.getFullYear(), date.getMonth() + 5, 0);
    this.dateRange.set([date, end]);
  }

  toggleBranch(key: string, checked: boolean): void {
    const next = new Set(this.checkedBranches());
    if (checked) next.add(key);
    else next.delete(key);
    this.checkedBranches.set(next);
  }

  selectAllBranches(): void {
    this.checkedBranches.set(new Set(this.branches().map((b) => b.key)));
  }

  clearBranches(): void {
    this.checkedBranches.set(new Set());
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
