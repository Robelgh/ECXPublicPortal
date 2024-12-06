import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Complainandfeedback } from './complainandfeedback.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: Complainandfeedback }
    ])],
    exports: [RouterModule]
})
export class ComplainandfeedbackRoutingModule { }
