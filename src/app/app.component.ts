import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { State } from './demo/State/State';
import { NgZone } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private state:State,private ngzone:NgZone) { }

    isLoading: boolean = true;

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.state.isLoading$.subscribe(isLoading => {
             this.ngzone.run(()=>{
                this.isLoading = isLoading;
             })
          });
    }
}
