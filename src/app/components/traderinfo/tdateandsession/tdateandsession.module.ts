import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Tdateandsession} from './tdateandsession.component' 
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TdateandsessionRoutingModule } from './tdateandsession-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        TabViewModule,
        PanelMenuModule,
        ButtonModule,
        TdateandsessionRoutingModule,
        AutoCompleteModule
    ],
    declarations: [Tdateandsession]
})
export class TdateandsessionModule { }
