export type DashboardSeverity = 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast';

export interface DashboardMetric {
  label: string;
  value: string;
  delta: string;
  icon: string;
}

export interface DashboardModel {
  id: string;
  title: string;
  summary: string;
  trend: string;
  severity: DashboardSeverity;
  metrics: DashboardMetric[];
}
