import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../demo/api/product';
import { ProductService } from '../../../demo/service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { SessionSchedule } from 'src/app/demo/service/sessionSchedule.service';

@Component({
    templateUrl: './tdateandsession.component.html',
})
export class Tdateandsession implements OnInit {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    itemsmenu: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    constructor(private service:SessionSchedule) {
         
    }

    ngOnInit() {


        this.service.getSessionSchedule().then(sy =>{
            this.products=sy.data

            console.log(this.products)
        })
       
      
      
        this.itemsmenu = [
            { label: 'Monday', icon: 'pi pi-fw pi-calendar' },
            { label: 'Tuesday ', icon: 'pi pi-fw pi-calendar' },
            { label: 'Wednesday ', icon: 'pi pi-fw pi-calendar' },
            { label: 'Thursday ', icon: 'pi pi-fw pi-calendar' },
            { label: 'Friday ', icon: 'pi pi-fw pi-calendar' }
        ];

        this.activeItem = this.itemsmenu[0];
    }
   
}
