import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PretradeinfoComponent } from './pretradeinfo.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: PretradeinfoComponent }
])],
  exports: [RouterModule]
})
export class PretradeinfoRoutingModule { }
