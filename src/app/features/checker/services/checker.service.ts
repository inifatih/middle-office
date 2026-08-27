import { Injectable } from '@angular/core';
import { CheckItem } from '../models/check-item.model';

@Injectable({ providedIn: 'root' })
export class CheckerService {
  private readonly items: CheckItem[] = [
    { title: 'Settlement confirmation', owner: 'Ops Team', status: 'Approved', severity: 'success' },
    { title: 'Counterparty limit check', owner: 'Risk Team', status: 'Needs review', severity: 'warn' },
    { title: 'Treasury sign-off', owner: 'Middle Office', status: 'Pending', severity: 'info' },
  ];

  getItems(): CheckItem[] {
    return this.items;
  }
}
