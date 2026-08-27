import { Injectable } from '@angular/core';
import { DashboardModel } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly dashboards: DashboardModel[] = [
    {
      id: 'overview',
      title: 'Overview Dashboard',
      summary: 'Daily operational position and overall activity snapshot.',
      trend: '+8.2% vs yesterday',
      severity: 'success',
      metrics: [
        { label: 'Transactions', value: '2,412', delta: '+8.2%', icon: 'pi pi-chart-line' },
        { label: 'Approval Queue', value: '186', delta: '-12.4%', icon: 'pi pi-clipboard' },
        { label: 'Pending Review', value: '24', delta: '+3.1%', icon: 'pi pi-clock' },
        { label: 'Exception Rate', value: '0.9%', delta: '-0.4%', icon: 'pi pi-shield' },
      ],
    },
    {
      id: 'portfolio',
      title: 'Portfolio Dashboard',
      summary: 'Portfolio exposure and concentration by business line.',
      trend: '+5.6% net exposure',
      severity: 'info',
      metrics: [
        { label: 'Net Exposure', value: '$48.2M', delta: '+5.6%', icon: 'pi pi-wallet' },
        { label: 'Book Value', value: '$260.7M', delta: '+1.9%', icon: 'pi pi-briefcase' },
        { label: 'Margin Used', value: '62%', delta: '+2.3%', icon: 'pi pi-bolt' },
        { label: 'Diversification', value: '84%', delta: '+1.1%', icon: 'pi pi-chart-bar' },
      ],
    },
    {
      id: 'risk',
      title: 'Risk Dashboard',
      summary: 'Risk concentration, limits, and exception monitoring.',
      trend: 'Low tolerance breach',
      severity: 'warn',
      metrics: [
        { label: 'VaR', value: '$1.8M', delta: '+0.6%', icon: 'pi pi-exclamation-circle' },
        { label: 'Limit Usage', value: '71%', delta: '+4.1%', icon: 'pi pi-sliders-h' },
        { label: 'Breaches', value: '2', delta: '-1', icon: 'pi pi-ban' },
        { label: 'Stress Loss', value: '$4.3M', delta: '+1.8%', icon: 'pi pi-hourglass' },
      ],
    },
    {
      id: 'liquidity',
      title: 'Liquidity Dashboard',
      summary: 'Cash and liquidity positions across funding sources.',
      trend: 'Healthy coverage 3.1x',
      severity: 'success',
      metrics: [
        { label: 'Cash Buffer', value: '$32.4M', delta: '+7.1%', icon: 'pi pi-money-bill' },
        { label: 'Runway', value: '16 days', delta: '+2.4%', icon: 'pi pi-calendar' },
        { label: 'Funding Gap', value: '$1.2M', delta: '-0.8%', icon: 'pi pi-arrows-v' },
        { label: 'Coverage', value: '3.1x', delta: '+0.7%', icon: 'pi pi-check-circle' },
      ],
    },
  ];

  getDashboardOptions() {
    return this.dashboards.map(({ id, title }) => ({ label: title, value: id }));
  }

  getDashboardById(id: string): DashboardModel {
    return this.dashboards.find((dashboard) => dashboard.id === id) ?? this.dashboards[0];
  }
}
