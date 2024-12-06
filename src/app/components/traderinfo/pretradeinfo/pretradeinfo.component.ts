import { Component, OnInit,NgZone } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { MarketDataService } from 'src/app/demo/service/marketdata.service';


import { Table } from 'primeng/table';
import { CustomerService } from '../../../demo/service/customer.service';
import { TagModule } from 'primeng/tag';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  templateUrl: './pretradeinfo.component.html',
})


export class PretradeinfoComponent {

  constructor(
    private marketdataService:MarketDataService,
    private customerService:CustomerService,
    private ngzone:NgZone
  ){}


  coffeeOptionShow:boolean=false;
  isLocal:boolean;
  filteredCommodities: any[] | undefined;
  pretradeCoffe:any[];
  orginalPretradeCoffee:any[];
  pretradeNonCoffee:any[];
  commodity:any[]
  selectedCommodityAdvanced: any[] = [];
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
 
      this.items = [
          { label: 'Non-Coffee', icon: 'pi pi-home' },
          { label: 'Coffee', icon: 'pi pi-chart-line' },
      ];

      this.marketdataService.getCommodities().then((com:any) =>
        {
            this.commodity=com
        })
       this.marketdataService.getNonCoffeePretrade().then((info) => {
        this.pretradeCoffe=info
        this.orginalPretradeCoffee=info
       }) 

      this.activeItem = this.items[0];
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
    this.filteredCommodities = filtered;
}

  onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
  }

  onCommoditySelect(selectedItem: any) {
       if (this.isJSON(selectedItem)) {
        this.ngzone.run(()=>
        {
          this.pretradeCoffe= this.orginalPretradeCoffee.filter((x)=> x.commodityType === selectedItem.name)
          if(selectedItem.name === "Coffee"){
            this.coffeeOptionShow = true;
          }
        })

        }
  }

  isJSON(item: any): boolean {
    return typeof item === 'object' && item !== null;
  }

 
clear(table: Table) {
  table.clear();
}

}
