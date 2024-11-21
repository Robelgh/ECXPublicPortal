import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tdateandsession } from './tdateandsession.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: Tdateandsession }
    ])],
    exports: [RouterModule]
})
export class TdateandsessionRoutingModule { }
