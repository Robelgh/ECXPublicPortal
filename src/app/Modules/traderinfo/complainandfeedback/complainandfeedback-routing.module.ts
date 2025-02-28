import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComplainandfeedbackComponent } from './complainandfeedback.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ComplainandfeedbackComponent }
])],
  exports: [RouterModule]
})
export class StatusinfoandrequestRoutingModule { }
