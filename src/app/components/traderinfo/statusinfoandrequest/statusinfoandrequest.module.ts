import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusinfoandrequestComponent } from './statusinfoandrequest.component';

import { StatusinfoandrequestRoutingModule } from './statusinfoandrequest-routing.module';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { TabViewModule } from 'primeng/tabview';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';


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
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    StatusinfoandrequestComponent,
  ],
  imports: [
    CommonModule,
    StatusinfoandrequestRoutingModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    TabViewModule,
    PanelMenuModule,
    ButtonModule,

    AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
    CheckboxModule,
    
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StatusinfoandrequestModule { }
