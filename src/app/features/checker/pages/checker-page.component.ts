import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';

interface FileItem {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedBy: string;
  uploadedAt: Date;
  notes?: string; // <-- Tambahan properti untuk catatan
}

@Component({
  selector: 'app-checker-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DatePickerModule,
    ToastModule,
    SelectModule
  ],
  providers: [MessageService],
  templateUrl: './checker-page.component.html',
})
export class CheckerPageComponent {
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  categories = [
    { label: 'Kajian Risiko Likuiditas', value: 'KRL' },
    { label: 'Profil Maturitas KLN', value: 'KLN' },
    { label: 'Resume Maturity Profile', value: 'RMP' }
  ];
  
  selectedCategory: string | null = null;
  selectedCategoryLabel: string | null = null; // <-- Menampung label untuk judul H1
  selectedDate: Date | null = null;

  // Single file data
  currentFile: FileItem | null = null;
  reviewNotes: string = ''; // <-- Model untuk textbox catatan

  onFilterChange() {
    // Dapatkan label dari kategori yang dipilih
    const categoryObj = this.categories.find(c => c.value === this.selectedCategory);
    this.selectedCategoryLabel = categoryObj ? categoryObj.label : null;

    if (this.selectedCategory && this.selectedDate) {
      this.currentFile = {
        id: '1',
        name: `Laporan_${this.selectedCategory}_${this.selectedDate.getTime()}.pdf`,
        type: 'PDF',
        status: 'pending',
        uploadedBy: 'John Doe',
        uploadedAt: this.selectedDate,
      };
      this.reviewNotes = ''; // Reset notes ketika file baru dimuat
    } else {
      this.currentFile = null;
    }
  }

  // <-- Fungsi untuk mereset seluruh filter
  resetFilters() {
    this.selectedCategory = null;
    this.selectedCategoryLabel = null;
    this.selectedDate = null;
    this.currentFile = null;
    this.reviewNotes = '';
  }

  approveFile() {
    if (this.currentFile) {
      this.currentFile.status = 'approved';
      this.currentFile.notes = this.reviewNotes; // Simpan catatan (jika ada)
      this.messageService.add({
        severity: 'success',
        summary: 'Approved',
        detail: `${this.currentFile.name} has been approved`,
      });
    }
  }

  rejectFile() {
    if (this.currentFile) {
      // Validasi wajib isi catatan jika reject
      if (!this.reviewNotes || this.reviewNotes.trim() === '') {
        this.messageService.add({
          severity: 'warn',
          summary: 'Catatan Diperlukan',
          detail: 'Harap isi catatan alasan penolakan dokumen.',
        });
        return;
      }

      this.currentFile.status = 'rejected';
      this.currentFile.notes = this.reviewNotes; // Simpan catatan ke dokumen
      this.messageService.add({
        severity: 'error',
        summary: 'Rejected',
        detail: `${this.currentFile.name} has been rejected`,
      });
    }
  }

  backToMenu() {
    this.router.navigate(['/']);
  }
}