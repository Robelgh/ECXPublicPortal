import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { MarketDataService } from './demo/service/marketdata.service';
import { SessionSchedule } from './demo/service/sessionSchedule.service';
import { AuthService } from './demo/service/auth/auth.service';
import { MapTo } from './demo/service/map.service';
import { ComplainFeedBackService } from './demo/service/complainFeedBack..service.';
import { PdfExportService } from './demo/service/PdfExport.service';
import { MCRService } from 'src/app/demo/service/MCR.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './demo/components/auth/login/AuthInterceptor';

import { ProgressSpinnerModule }  
    from 'primeng/progressspinner'; 

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule,ProgressSpinnerModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,MarketDataService,SessionSchedule,AuthService,
        MapTo,ComplainFeedBackService,PdfExportService,MCRService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
