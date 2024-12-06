import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatusinfoandrequestComponent } from './statusinfoandrequest.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: StatusinfoandrequestComponent }
])],
  exports: [RouterModule]
})
export class StatusinfoandrequestRoutingModule { }
