import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { environment } from '../../../environments/environment';


const baseUrl = `${environment.apiUrl}/MarketData`;

@Injectable()
export class MarketDataService {

    constructor(private http: HttpClient) { }

    getSymbol() {
        return this.http.get<any>(baseUrl + "/" + "commodityGrade")
            .toPromise()
            .then(res => res)
            .then(data => data);
    }

    getCommodities() {
        return this.http.get<any>(baseUrl + '/' + "commodity")
            .toPromise()
            .then(res => res)
            .then(data => data);
    }

    getMarketDataCommodity(id:any){
        return this.http.get<any>(baseUrl + '/' + id)
        .toPromise()
        .then(res => res)
        .then(data => data);
    }

    getCoffeePretrade(num:Number){
        return this.http.get<any>(baseUrl + '/pretradecoffee')
        .toPromise()
        .then(res => res)
        .then(data => data);
    }

    getNonCoffeePretrade(){
        return this.http.get<any>(baseUrl + '/pretradecoffee')
        .toPromise()
        .then(res => res)
        .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}