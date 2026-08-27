import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly http = inject(HttpClient);
  // Sesuaikan port dengan backend C# Anda
  private readonly baseUrl = 'http://localhost:5279/api/middle-office/extract'; 

  uploadFile(category: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Merutekan file ke endpoint yang sesuai berdasarkan value kategori
    switch (category) {
      case 'KRL':
        return this.http.post(`${this.baseUrl}/kajian-risiko`, formData);
      case 'KLN':
        return this.http.post(`${this.baseUrl}/profil-kln`, formData);
      case 'RMP':
        // Asumsi sementara menggunakan "Kontraktual" sebagai jenis untuk RMP
        return this.http.post(`${this.baseUrl}/resume-ho`, formData);
      default:
        throw new Error('Kategori tidak valid');
    }
  }
}