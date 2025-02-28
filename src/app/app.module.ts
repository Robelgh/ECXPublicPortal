import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MarketDataService } from './service/marketdata.service';
import { SessionSchedule } from './service/sessionSchedule.service';
import { AuthService } from './service/auth/auth.service';
import { MapTo } from './service/map.service';
import { ComplainFeedBackService } from './service/complainFeedBack..service.';
import { MCRService } from 'src/app/service/MCR.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/auth/login/AuthInterceptor';

import { ProgressSpinnerModule }  
    from 'primeng/progressspinner'; 

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule,ProgressSpinnerModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        MarketDataService,SessionSchedule,AuthService,
        MapTo,ComplainFeedBackService,MCRService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
