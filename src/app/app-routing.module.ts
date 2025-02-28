import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { authGuardGuard } from './service/auth/auth-guard.guard';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'tradeinfo', loadChildren: () => import('./Modules/traderinfo/traderinfo.module').then(m => m.TraderinfoModule) },
                    { path: 'market', loadChildren: () => import('./Modules/marketdata/marketdata.module').then(m => m.MarketdataModule) }
                ],
                canActivate: [authGuardGuard]
            },
            { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', redirectTo: 'auth/login'},
            { path: '**', redirectTo: 'auth/login' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
