import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page.component';
import { UploadPageComponent } from './features/upload/pages/upload-page.component';
import { CheckerPageComponent } from './features/checker/pages/checker-page.component';
import { KajianDashboardComponent } from './features/home/pages/kajian-dashboard.component';
import { KlnDashboardComponent } from './features/home/pages/kln-dashboard.component';
import { ResumeDashboardComponent } from './features/home/pages/resume-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'dashboard/kajian', component: KajianDashboardComponent },
  { path: 'dashboard/kln', component: KlnDashboardComponent },
  { path: 'dashboard/resume', component: ResumeDashboardComponent },
  { path: 'upload', component: UploadPageComponent },
  { path: 'checker', component: CheckerPageComponent },
];
