import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CustomerService } from '../../../demo/service/customer.service';
import { Customer, Representative } from '../../../demo/api/customer';

import { MarketDataService } from '../../../demo/service/marketdata.service';
//import jsPDF from "jspdf";
//import "jspdf-autotable";

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-dailytradedata',
  templateUrl: './dailytradedata.component.html',

})
export class DailytradedataComponent {

    customers!: Customer[];
    commodity:any[];
    representatives!: Representative[];
    filteredCountries: any[] | undefined;
    statuses!: any[];
    products!: any[];
    loading: boolean = true;
    selectedCommodityAdvanced: any[] = [];
    activityValues: number[] = [0, 100];
    selectedCommodity: string="Coffee";
    selectedTab: number=0;
    
    constructor(private customerService: CustomerService ,private marketDataService:MarketDataService) {}
    
      ngOnInit() {
          this.customerService.getCustomersLarge().then((customers) => {
              this.customers = customers;
              this.loading = false;
    
            //  this.customers.forEach((customer) => (customer.date = new Date(<any>customer.date)));
          });
          this.marketDataService.getCommodities().then(com =>
            {
                this.commodity=com
            })
    
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

      filterCommodity(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.commodity as any[]).length; i++) {
            let com = (this.commodity as any[])[i];
            if (com.symbol.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(com);
            }
        }

        this.filteredCountries = filtered;
    }

    onCommoditySelect(selectedItem: any) {
     
        if (this.isJSON(selectedItem)) {
           this.selectedCommodity=selectedItem.name;
            this.marketDataService.getDailyTradeDate(selectedItem.commodityId).then((market => {
                this.products=market

                if(this.selectedCommodity == "coffee"){
                       if(!this.selectedTab){

                       }
                }
            }))
        }

      }

      isJSON(item: any): boolean {
        return typeof item === 'object' && item !== null;
      }

      onTabChange(event: any): void {
         this.selectedTab= event.index
       // this.filterSessionsByDay(event.index)
      }
      exportPdf() {
   
      }
}

      
    


