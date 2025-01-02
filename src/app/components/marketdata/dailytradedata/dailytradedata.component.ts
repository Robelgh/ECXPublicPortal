import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CustomerService } from '../../../demo/service/customer.service';
import { Customer, Representative } from '../../../demo/api/customer';

@Component({
  selector: 'app-dailytradedata',
  templateUrl: './dailytradedata.component.html',

})
export class DailytradedataComponent {

   customers!: Customer[];
  
    representatives!: Representative[];
  
    statuses!: any[];
  
    loading: boolean = true;
  
    activityValues: number[] = [0, 100];

    constructor(private customerService: CustomerService) {}
    
      ngOnInit() {
          this.customerService.getCustomersLarge().then((customers) => {
              this.customers = customers;
              this.loading = false;
    
            //  this.customers.forEach((customer) => (customer.date = new Date(<any>customer.date)));
          });
    
          this.representatives = [
              { name: 'Amy Elsner', image: 'amyelsner.png' },
              { name: 'Anna Fali', image: 'annafali.png' },
              { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
              { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
              { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
              { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
              { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
              { name: 'Onyama Limba', image: 'onyamalimba.png' },
              { name: 'Stephen Shaw', image: 'stephenshaw.png' },
              { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
          ];
    
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
