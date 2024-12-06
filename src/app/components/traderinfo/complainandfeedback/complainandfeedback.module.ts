import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ComplainandfeedbackRoutingModule } from './complainandfeedback-routing.module';
import { Complainandfeedback } from './complainandfeedback.component';

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
        ComplainandfeedbackRoutingModule
    ],
    declarations: [Complainandfeedback]
})
export class ComplainandfeedbackModule { }
