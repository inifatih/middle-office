import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

import { MiddleOfficeDataService } from '../services/middle-office-data.service';
import { DashboardExportService, buildExportFilename } from '../services/dashboard-export.service';
import { ResumeMatProfHoSummary } from '../models/dashboard-data.model';

@Component({
  selector: 'app-resume-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, DatePickerModule, ChartModule, SelectModule, TagModule],
  templateUrl: './resume-dashboard.component.html',
  providers: [DatePipe]
})
export class ResumeDashboardComponent {
  private readonly router = inject(Router);
  private readonly dataService = inject(MiddleOfficeDataService);
  private readonly exportService = inject(DashboardExportService);
  private readonly datePipe = inject(DatePipe);

  selectedDate: Date | null = null;
  loading = signal(false);
  error = signal<string | null>(null);
  summary = signal<ResumeMatProfHoSummary | null>(null);

  chartData: any;
  chartOptions: any = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top', labels: { usePointStyle: true, padding: 16, font: { size: 12, weight: 600 } } },
      tooltip: {
        intersect: false,
        mode: 'index',
        callbacks: {
          label: (ctx: any) =>
            ` ${ctx.dataset.label}: ${ctx.parsed.y == null ? '-' : this.fmt(ctx.parsed.y)}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        title: { display: true, text: 'Komponen Neraca', color: '#64748b', font: { size: 12, weight: 600 } }
      },
      y: {
        grid: { color: '#f1f5f9' },
        title: { display: true, text: 'Nilai (Rp)', color: '#64748b', font: { size: 12, weight: 600 } },
        ticks: { callback: (v: any) => compactRupiah(Number(v)) }
      }
    }
  };

  onDateChange() {
    if (this.selectedDate && !this.summary()) {
      this.loadData();
    }
  }

  loadData() {
    this.loading.set(true);
    this.error.set(null);

    this.dataService.getResumeHoSample().subscribe({
      next: (s) => {
        this.summary.set(s);
        this.chartData = {
          labels: ['Asset', 'Kewajiban', 'Selisih Neraca', 'Selisih Kumulatif'],
          datasets: [
            {
              label: 'IDR',
              data: [s.assetIdr, s.kewajibanIdr, s.selisihNeracaIdr, s.selisihKumulatifIdr],
              borderColor: '#2563eb',
              backgroundColor: 'rgba(37,99,235,0.12)',
              tension: 0.35,
              fill: true,
              pointBackgroundColor: '#2563eb'
            },
            {
              label: 'VA (Valas)',
              data: [s.assetVa, s.kewajibanVa, s.selisihNeracaVa, s.selisihKumulatifVa],
              borderColor: '#10b981',
              backgroundColor: 'rgba(16,185,129,0.12)',
              tension: 0.35,
              fill: true,
              pointBackgroundColor: '#10b981'
            }
          ]
        };
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Gagal memuat data dari backend. Pastikan API berjalan di localhost:5279.');
        this.loading.set(false);
      }
    });
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
    return !!this.summary();
  }

  syncDownloadOptions(): void {
    this.downloadOptions[1].disabled = !this.chartData;
  }

  onDownloadSelect(): void {
    const choice = this.selectedDownload;
    if (!choice) return;
    this.download(choice === 'all');
    setTimeout(() => (this.selectedDownload = null), 0);
  }

  private download(includeTables: boolean): void {
    const s = this.summary();
    if (!s) return;

    const tables = includeTables
      ? [
          {
            columns: ['Metrik', 'IDR', 'VA'],
            rows: [
              { label: 'Asset', cells: [this.fmt(s.assetIdr), this.fmt(s.assetVa)] },
              { label: 'Kewajiban', cells: [this.fmt(s.kewajibanIdr), this.fmt(s.kewajibanVa)] },
              {
                label: 'Gap Maturitas',
                cells: [this.fmtPercent(s.gapMaturitasIdr), this.fmtPercent(s.gapMaturitasVa)]
              },
              {
                label: 'Traffic Light',
                cells: [s.trafficLightIdr || '-', s.trafficLightVa || '-']
              }
            ]
          }
        ]
      : [];

    const periode = s.periode || this.datePipe.transform(this.selectedDate, 'mediumDate') || '-';

    this.exportService.exportPng({
      title: 'Resume Maturity Profile',
      subtitle: `Neraca — Tipe ${s.tipe}`,
      periode,
      filename: buildExportFilename('Resume Maturity Profile', `Tipe ${s.tipe}`, periode),
      chart: this.chartData ? { data: this.chartData, options: this.chartOptions } : null,
      tables
    });
  }

  backToMenu() { this.router.navigate(['/']); }
}

// Compact Rupiah for y-axis ticks: 185_000_000 -> "185 jt", 1_850_000_000 -> "1,9 M".
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
