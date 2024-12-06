import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PretradeinfoRoutingModule } from './pretradeinfo-routing.module';
import { PretradeinfoComponent } from './pretradeinfo.component';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabMenuModule } from 'primeng/tabmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    PretradeinfoRoutingModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    TabViewModule,
    PanelMenuModule,
    ButtonModule,
    TabMenuModule,
    AutoCompleteModule,
    RadioButtonModule
  ],
  declarations: [PretradeinfoComponent]
})
export class PretradeinfoModule { }
