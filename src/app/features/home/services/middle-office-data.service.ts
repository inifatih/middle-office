import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import {
  DashboardResponse,
  ResumeMatProfHoExtractResponse,
  ResumeMatProfHoSummary
} from '../models/dashboard-data.model';
import { RESUME_HO_SAMPLE } from './middle-office-dummy-data';
import { KAJIAN_RISIKO_DASHBOARD_SAMPLE, PROFIL_KLN_DASHBOARD_SAMPLE } from './middle-office-dashboard-samples';

interface ApiEnvelope<T> {
  isSuccess: boolean;
  message?: string;
  data: T;
}

const UNREACHABLE_RESPONSE: DashboardResponse = {
  message: 'Gagal memuat data dari backend. Pastikan API berjalan di localhost:5279.',
  periodsRequested: 0,
  periodsProcessed: 0,
  warnings: [],
  cards: [],
  charts: []
};

// TEMPORARY: Kajian Risiko and Profil KLN are pinned to a static snapshot
// (middle-office-dashboard-samples.ts) instead of calling the backend, at the user's request —
// the snapshot is a verbatim capture of a real /dashboard/{report}/sample response, so it's
// identical to what the backend actually returns. To go back to live data, swap the `of(...)`
// body back to the commented-out `this.http.get(...)` pipe below it.
//
// Resume HO still falls back to bundled dummy data on error (its worksheet template is being
// revised, so it isn't wired to the multi-period dashboard endpoints at all yet).
@Injectable({ providedIn: 'root' })
export class MiddleOfficeDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5279/api/middle-office';

  getKajianRisikoDashboard(): Observable<DashboardResponse> {
    return of(KAJIAN_RISIKO_DASHBOARD_SAMPLE);
    // return this.http
    //   .get<ApiEnvelope<DashboardResponse>>(`${this.baseUrl}/dashboard/kajian-risiko/sample`)
    //   .pipe(
    //     map((res) => res.data),
    //     catchError(() => of(UNREACHABLE_RESPONSE))
    //   );
  }

  getProfilKlnDashboard(): Observable<DashboardResponse> {
    return of(PROFIL_KLN_DASHBOARD_SAMPLE);
    // return this.http
    //   .get<ApiEnvelope<DashboardResponse>>(`${this.baseUrl}/dashboard/profil-kln/sample`)
    //   .pipe(
    //     map((res) => res.data),
    //     catchError(() => of(UNREACHABLE_RESPONSE))
    //   );
  }

  getResumeHoSample(): Observable<ResumeMatProfHoSummary> {
    return this.http
      .get<ApiEnvelope<ResumeMatProfHoExtractResponse>>(`${this.baseUrl}/resume-ho/sample`)
      .pipe(
        map((res) => res.data.summary),
        catchError(() => {
          console.warn('MiddleOfficeDataService: backend tidak terjangkau, menampilkan dummy data untuk Resume HO.');
          return of(RESUME_HO_SAMPLE.summary);
        })
      );
  }
}
