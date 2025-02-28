import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricaldataComponent } from './historicaldata.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
      { path: '', component: HistoricaldataComponent}
  ])],
  exports: [RouterModule]
})
export class HistoricaldataRoutingModule { }
