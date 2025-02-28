import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect } from '@angular/core';
import { ChartModule } from 'primeng/chart';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent {


  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor() {}

  ngOnInit() {


 
      this.statuses = [
          { label: 'Unqualified', value: 'unqualified' },
          { label: 'Qualified', value: 'qualified' },
          { label: 'New', value: 'new' },
          { label: 'Negotiation', value: 'negotiation' },
          { label: 'Renewal', value: 'renewal' },
          { label: 'Proposal', value: 'proposal' }
      ];
  }

  clear(table: any) {
      table.clear();
  }

  getSeverity(status: string) {
      switch (status.toLowerCase()) {
          case 'unqualified':
              return 'danger';

          case 'qualified':
              return 'success';

          case 'new':
              return 'info';

          case 'negotiation':
              return 'warning';

          default:
              return '';
          
      }
  }


}
