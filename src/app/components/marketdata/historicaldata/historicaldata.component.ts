import { Component } from '@angular/core';

@Component({
  selector: 'app-historicaldata',
  templateUrl: './historicaldata.component.html',

})
export class HistoricaldataComponent {
  rangeDates: Date[] | undefined;
  responsiveOptions: any[] | undefined;

  ngOnInit() {
   
   this.responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ]
}

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
}
