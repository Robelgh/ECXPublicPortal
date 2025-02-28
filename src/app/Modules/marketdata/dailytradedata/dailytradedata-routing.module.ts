import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailytradedataComponent } from './dailytradedata.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DailytradedataComponent }
])],
  exports: [RouterModule]
})
export class DailytradedataRoutingModule { }
