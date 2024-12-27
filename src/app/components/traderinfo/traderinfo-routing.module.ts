import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'datesession', data: { breadcrumb: 'Trade Date and Session' }, loadChildren: () => import('./tdateandsession/tdateandsession.module').then(m => m.TdateandsessionModule) },
        { path: 'pretrade', data: { breadcrumb: 'PreTrade' }, loadChildren: () => import('./pretradeinfo/pretradeinfo.module').then(m => m.PretradeinfoModule) },
         { path: 'statusinfo', data: { breadcrumb: 'Status' }, loadChildren: () => import('./statusinfoandrequest/statusinfoandrequest.module').then(m => m.StatusinfoandrequestModule) },
         { path: 'complainfeedback', data: { breadcrumb: 'Complain' }, loadChildren: () => import('./complainandfeedback/complainandfeedback.module').then(m => m.StatusinfoandrequestModule) },
         { path: 'report', data: { breadcrumb: 'Complain' }, loadChildren: () => import('./complainandfeedback/complainandfeedback.module').then(m => m.StatusinfoandrequestModule) },
         { path: 'historical', data: { breadcrumb: 'Complain' }, loadChildren: () => import('./complainandfeedback/complainandfeedback.module').then(m => m.StatusinfoandrequestModule) },
         { path: 'provideapi', data: { breadcrumb: 'Complain' }, loadChildren: () => import('./complainandfeedback/complainandfeedback.module').then(m => m.StatusinfoandrequestModule) },
        { path: '**', redirectTo: '/notfound' }

    ])],
    exports: [RouterModule]
})
export class TraderInfoRoutingModule { }
