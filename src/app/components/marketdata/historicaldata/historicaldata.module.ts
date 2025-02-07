import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricaldataComponent } from './historicaldata.component';

import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';

import { HistoricaldataRoutingModule } from './historicaldata-routing.module';


@NgModule({
  declarations: [HistoricaldataComponent],
  imports: [
    CommonModule,
    HistoricaldataRoutingModule,
    CalendarModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    CarouselModule,
    MultiSelectModule,
    
  ]
})
export class HistoricaldataModule { }
