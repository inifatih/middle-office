import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // WAJIB untuk [(ngModel)]
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ButtonModule, 
    CardModule, 
    SelectModule
  ],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  private readonly router = inject(Router);

  // Value di-setting berdasarkan route URL tiap dashboard
  dashboardOptions = [
    { label: 'Kajian Risiko Likuiditas', value: 'dashboard/kajian' },
    { label: 'Profil Maturitas KLN', value: 'dashboard/kln' },
    { label: 'Resume Maturity Profile', value: 'dashboard/resume' }
  ];

  selectedDashboard: string | null = null; // Dibiarkan null agar placeholder muncul

  // Terpicu ketika user memilih kategori dari p-select
  onDashboardChange() {
    if (this.selectedDashboard) {
      this.router.navigate([`/${this.selectedDashboard}`]);
      
      // Reset dropdown (opsional) agar jika user menekan tombol Back,
      // placeholder kembali ke kondisi semula.
      setTimeout(() => this.selectedDashboard = null, 100);
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}