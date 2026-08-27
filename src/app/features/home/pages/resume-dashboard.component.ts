import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';

import { MiddleOfficeDataService } from '../services/middle-office-data.service';
import { ResumeMatProfHoSummary } from '../models/dashboard-data.model';

@Component({
  selector: 'app-resume-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, DatePickerModule, ChartModule, TagModule],
  templateUrl: './resume-dashboard.component.html'
})
export class ResumeDashboardComponent {
  private readonly router = inject(Router);
  private readonly dataService = inject(MiddleOfficeDataService);

  selectedDate: Date | null = null;
  loading = signal(false);
  error = signal<string | null>(null);
  summary = signal<ResumeMatProfHoSummary | null>(null);

  chartData: any;
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

  backToMenu() { this.router.navigate(['/']); }
}
