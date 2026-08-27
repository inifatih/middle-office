import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import {
  FileSelectEvent,
  FileUpload,
  FileUploadModule
} from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';

import { UploadService } from '../services/upload.service';
import { ExcelSheetPreviewComponent } from '../../../shared/components/excel-sheet-preview/excel-sheet-preview.component';

type CategoryCode = 'KRL' | 'KLN' | 'RMP';

interface Category {
  label: string;
  value: CategoryCode;
}

interface TableColumn {
  field: string;
  header: string;
  type: 'text' | 'number';
}

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DatePickerModule,
    FileUploadModule,
    SelectModule,
    ToastModule,
    ExcelSheetPreviewComponent
  ],
  providers: [MessageService],
  templateUrl: './upload-page.component.html'
})
export class UploadPageComponent {
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly uploadService = inject(UploadService);

  categories: Category[] = [
    { label: 'Kajian Risiko Likuiditas', value: 'KRL' },
    { label: 'Profil Maturitas KLN', value: 'KLN' },
    { label: 'Resume Maturity Profile', value: 'RMP' }
  ];

  selectedCategory: CategoryCode | null = null;
  selectedDate: Date = new Date();

  uploadedFiles: File[] = [];

  // File currently selected in the picker, used for the raw Excel-grid preview
  // (independent from the backend extraction result).
  selectedFile: File | null = null;

  extractedData: Record<string, any>[] = [];
  tableColumns: TableColumn[] = [];
  isExtracted = false;
  totalRows = 0;
  responseMessage = '';

  onFileSelected(event: FileSelectEvent): void {
    const files = event.files;
    this.selectedFile = (files && files.length > 0 ? files[0] : null) as File | null;
  }

  onFileCleared(): void {
    this.selectedFile = null;
  }

  onCategoryChange(category: CategoryCode | null): void {
    this.selectedCategory = category;
    this.resetPreview();
    this.selectedFile = null;
    this.selectedDate = new Date();
  }

  // KLN and Resume Maturity Profile are monthly reports; Kajian Risiko is daily.
  isMonthlyCategory(): boolean {
    return this.selectedCategory === 'KLN' || this.selectedCategory === 'RMP';
  }

  onUpload(event: any, fileUploadRef: FileUpload): void {
    if (!this.selectedCategory) {
      this.messageService.add({
        severity: 'error',
        summary: 'Gagal',
        detail: 'Kategori dokumen harus dipilih.'
      });
      fileUploadRef.clear();
      return;
    }

    const file: File | undefined = event.files?.[0];

    if (!file) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Peringatan',
        detail: 'Silakan pilih file terlebih dahulu.'
      });
      return;
    }

    this.resetPreview();

    this.uploadService.uploadFile(this.selectedCategory, file).subscribe({
      next: (response: any) => this.handleUploadResponse(response, file, fileUploadRef),
      error: () => this.showError(fileUploadRef, 'Gagal memproses file.')
    });
  }

  private handleUploadResponse(response: any, file: File, fileUploadRef: FileUpload): void {
    console.log(`[Upload] Hasil ekstraksi backend untuk kategori ${this.selectedCategory} (${file.name}):`, response);

    if (!response) {
      this.showError(fileUploadRef, 'Response dari backend kosong.');
      return;
    }

    if (response.isSuccess === false) {
      this.showError(fileUploadRef, response.message ?? 'Backend gagal memproses file.');
      return;
    }

    // Backend responses may shape their payload as `data: [...]`, `data: { data: [...] }`
    // (Profil Maturitas KLN), or `data: { rows: [...] }` (Kajian Risiko, Resume HO).
    const responseData = response.data;
    const finalData: Record<string, any>[] = Array.isArray(responseData)
      ? responseData
      : Array.isArray(responseData?.data)
        ? responseData.data
        : Array.isArray(responseData?.rows)
          ? responseData.rows
          : [];

    if (finalData.length === 0) {
      this.showError(fileUploadRef, 'Backend berhasil memproses file tetapi tidak ada data hasil ekstraksi.');
      return;
    }

    this.extractedData = finalData;
    this.totalRows = !Array.isArray(responseData) && typeof responseData?.totalRows === 'number'
      ? responseData.totalRows
      : finalData.length;
    this.responseMessage = !Array.isArray(responseData)
      ? (responseData?.message ?? '')
      : 'Data berhasil diekstrak.';

    this.uploadedFiles = [file];
    this.generateTableColumns();
    this.isExtracted = true;

    console.log(`[Upload] Data hasil ekstraksi (${this.totalRows} baris):`, this.extractedData);

    this.messageService.add({
      severity: 'success',
      summary: 'Sukses',
      detail: `${file.name} berhasil diekstrak.`
    });
  }

  private generateTableColumns(): void {
    this.tableColumns = [];

    const firstRow = this.extractedData[0];
    if (!firstRow) return;

    this.tableColumns = Object.keys(firstRow).map((field): TableColumn => ({
      field,
      header: this.getColumnHeader(field),
      type: this.isNumberValue(firstRow[field]) ? 'number' : 'text'
    }));
  }

  private getColumnHeader(field: string): string {
    if (this.selectedCategory === 'KRL') {
      const headers: Record<string, string> = {
        no: 'No',
        keterangan: 'Keterangan',
        nilai: 'Nilai'
      };
      return headers[field] ?? field;
    }

    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase())
      .trim();
  }

  private isNumberValue(value: any): boolean {
    if (typeof value === 'number') return true;
    if (typeof value !== 'string') return false;

    const trimmed = value.trim();
    if (trimmed === '') return false;

    const normalized = trimmed.replace(/\./g, '').replace(',', '.');
    return !Number.isNaN(Number(normalized));
  }

  submitData(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Proses Penyimpanan',
      detail: 'Menyimpan data ke database dan storage...'
    });
  }

  cancelPreview(): void {
    this.resetPreview();
    this.selectedFile = null;

    this.messageService.add({
      severity: 'info',
      summary: 'Upload Ulang',
      detail: 'Silakan upload file baru.'
    });
  }

  private resetPreview(): void {
    this.isExtracted = false;
    this.extractedData = [];
    this.tableColumns = [];
    this.uploadedFiles = [];
    this.totalRows = 0;
    this.responseMessage = '';
  }

  private showError(fileUploadRef: FileUpload, detail: string): void {
    this.messageService.add({ severity: 'error', summary: 'Gagal', detail });
    fileUploadRef?.clear();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
  }

  backToMenu(): void {
    this.router.navigate(['/']);
  }
}
