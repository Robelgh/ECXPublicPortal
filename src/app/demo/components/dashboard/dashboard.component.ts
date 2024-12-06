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

        
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });

        this.marketDataService.getSymbol().then(sy =>{
            this.symbols=sy
        })
        this.marketDataService.getCommodities().then(com =>
        {
            this.commodity=com
        }
        )
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.countries = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
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
            console.log('Selected Commodity:', selectedItem.commodityId);
            this.marketDataService.getMarketDataCommodity(selectedItem.commodityId).then((market => {
                this.products=market
            }))
        }

      }

      isJSON(item: any): boolean {
        return typeof item === 'object' && item !== null;
      }
    }
