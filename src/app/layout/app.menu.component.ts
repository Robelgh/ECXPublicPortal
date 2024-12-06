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
                    { label: 'Status Information', icon: 'pi pi-fw pi-bookmark', routerLink: ['/tradeinfo/statusinfo'] },
                    { label: 'Complaint and Feedback', icon: 'pi pi-fw pi-comment', routerLink: ['/tradeinfo/complainfeedback'] },
                ]
            },
            {
                label: 'Market Data',
                items: [
                   { label: 'Daily Trade Data', icon: 'pi pi-fw pi-chart-line', routerLink: ['/blocks'], badge: 'NEW' },
                   { label: 'Historical Data', icon: 'pi pi-history', routerLink: ['/blocks'], badge: 'NEW' },
                   { label: 'Reports', icon: 'pi pi-fw pi-file-export', routerLink: ['/blocks'], badge: 'NEW' },
                   { label: 'API Data Providing Service', icon: 'pi pi-fw pi-globe', routerLink: ['/blocks'], badge: 'NEW' },
                   
                ]
            }
         
        ];
    }
}
