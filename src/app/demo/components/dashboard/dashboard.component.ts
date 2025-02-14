import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CountryService } from 'src/app/demo/service/country.service';

import { MarketDataService } from '../../service/marketdata.service';

interface City {
    name: string,
    code: string
}

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    templateUrl: './dashboard.component.html',
})


export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: any[];
    symbols:any[];
    commodity:any[];
    selectedCommodity: string="Coffee";
    chartData: any;
    selectedCommodityAdvanced: any[] = [];
    selectedSymbolAdvanced: any[] = [];
    chartOptions: any;
    subscription!: Subscription;
    cities: City[] | undefined;
    selectedCity: City | undefined;

    countries: any[] | undefined;
    filteredCountries: any[] | undefined;

    constructor(private productService: ProductService,
                private marketDataService:MarketDataService,
                private countryService: CountryService,
                public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
 

        this.marketDataService.getSymbol().then(sy =>{
            this.symbols=sy
        })
        this.marketDataService.getCommodities().then(com =>
        {
            this.commodity=com
            this.selectedCommodityAdvanced =  this.commodity.find(item => item.commodityId === "71604275-df23-4449-9dae-36501b14cc3b");
            if(this.selectedCommodityAdvanced != null){
                this.onCommoditySelect(this.selectedCommodityAdvanced) 
            }
        }
        )
   
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

   
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    filterSymbol(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.symbols as any[]).length; i++) {
            let sy = (this.symbols as any[])[i];
            if (sy.symbol.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(sy);
            }
        }

        this.filteredCountries = filtered;
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
            this.marketDataService.getMarketDataCommodity(selectedItem.commodityId).then((market => {
                this.products=market
            }))
        }

      }

      isJSON(item: any): boolean {
        return typeof item === 'object' && item !== null;
      }
    }
