import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailytradedataComponent } from './dailytradedata.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { TabViewModule } from 'primeng/tabview';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';

import { FormsModule } from '@angular/forms';

import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";


import { DailytradedataRoutingModule } from './dailytradedata-routing.module';


@NgModule({
  declarations: [
    DailytradedataComponent,
  ],
  imports: [
    CommonModule,
    DailytradedataRoutingModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    TabViewModule,
    PanelMenuModule,
    ButtonModule,
    FormsModule,

    AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule
  ]
})
export class DailytradedataModule { }
