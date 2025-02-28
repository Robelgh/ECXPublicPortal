import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { SessionSchedule } from 'src/app/service/sessionSchedule.service';

@Component({
    templateUrl: './tdateandsession.component.html',
})
export class Tdateandsession implements OnInit {
   
    items!: MenuItem[];
    sessions!: any[];
    filteredSessions!:any[];
    subscription!: Subscription;
    itemsmenu: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;
    defaultIndex:any=0;

    constructor(private service:SessionSchedule) {
         
    }

    ngOnInit() {
        this.service.getSessionSchedule().then(sy =>{
            this.sessions=sy.data;
            this.filterSessionsByDay(this.defaultIndex)
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

    onTabChange(event: any): void {
        console.log('Tab Changed:', event);
        console.log('Selected Tab Index:', event.index);  // Get the selected tab index
        console.log('Selected Tab Label:', this.itemsmenu[event.index].label); // Get the label of the selected tab
        this.filterSessionsByDay(event.index)
      }

      filterSessionsByDay(dayIndex: number): void {
        this.filteredSessions=this.sessions.filter((x)=> new Date(x.open).getDay() - 1 ==dayIndex)
        console.log(this.filteredSessions)
      }
}
