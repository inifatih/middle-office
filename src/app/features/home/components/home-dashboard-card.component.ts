import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home-dashboard-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
    <p-card styleClass="block h-full border border-slate-200 rounded-[18px] shadow-none p-1">
      <div class="flex items-center justify-between gap-3 mb-4">
        <span class="text-slate-500 text-sm font-semibold">{{ metric.label }}</span>
        <span class="text-slate-900 text-[1.3rem] font-extrabold">{{ metric.value }}</span>
      </div>
      <div class="flex items-center justify-between gap-3">
        <span class="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 pi" [ngClass]="metric.icon"></span>
        <span
          class="text-[0.78rem] font-bold"
          [ngClass]="metric.delta.startsWith('+') ? 'text-green-700' : 'text-red-600'"
        >
          {{ metric.delta }}
        </span>
      </div>
    </p-card>
  `
})
export class HomeDashboardCardComponent {
  @Input() metric!: { label: string; value: string; delta: string; icon: string };
}