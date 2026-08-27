export type UploadState = 'Processed' | 'Queued' | 'Checking';

export interface UploadItem {
  name: string;
  size: string;
  state: UploadState;
}
