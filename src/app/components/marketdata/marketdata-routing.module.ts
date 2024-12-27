import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
         { path: 'report', data: { breadcrumb: 'marketdata' }, loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
         { path: 'historical', data: { breadcrumb: 'marketdata' }, loadChildren: () => import('./historicaldata/historicaldata.module').then(m => m.HistoricaldataModule) },
         { path: 'provideapi', data: { breadcrumb: 'marketdata' }, loadChildren: () => import('./apigenerate/apigenerate.module').then(m => m.APIGenerateModule) },
         { path: 'dailytrade', data: { breadcrumb: 'marketdata' }, loadChildren: () => import('./dailytradedata/dailytradedata.module').then(m => m.DailytradedataModule) },
         { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class MarketdataRoutingModule { }
