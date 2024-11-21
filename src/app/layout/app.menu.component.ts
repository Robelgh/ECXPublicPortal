import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Trader Information',
                items: [
                    { label: 'Trade Date and Session', icon: 'pi pi-fw pi-id-card', routerLink: ['/tradeinfo/datesession'] },
                    { label: 'Pre-Trade Information', icon: 'pi pi-fw pi-check-square', routerLink: ['/tradeinfo/pretrade'] },
                    { label: 'Status Information', icon: 'pi pi-fw pi-bookmark', routerLink: ['/tradeinfo/status'] },
                  
                ]
            },
            {
                label: 'Market Data',
                items: [
                   // { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                   
                ]
            }
         
        ];
    }
}
