import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'datesession', data: { breadcrumb: 'Trade Date and Session' }, loadChildren: () => import('./tdateandsession/tdateandsession.module').then(m => m.TdateandsessionModule) },
        { path: 'pretrade', data: { breadcrumb: 'Charts' }, loadChildren: () => import('./pretradeinfo/pretradeinfo.module').then(m => m.PretradeinfoModule) },
        // { path: 'statusinfo', data: { breadcrumb: 'File' }, loadChildren: () => import('./file/filedemo.module').then(m => m.FileDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class TraderInfoRoutingModule { }
