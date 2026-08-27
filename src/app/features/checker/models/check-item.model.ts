export type CheckStatus = 'Approved' | 'Needs review' | 'Pending';
export type CheckSeverity = 'success' | 'warn' | 'info';

export interface CheckItem {
  title: string;
  owner: string;
  status: CheckStatus;
  severity: CheckSeverity;
}
