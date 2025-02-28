import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APIGenerateComponent } from './apigenerate.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: APIGenerateComponent }
])],
  exports: [RouterModule]
})
export class APIGenerateRoutingModule { }
