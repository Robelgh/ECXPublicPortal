import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { State } from '../State/State';


const baseUrl = `${environment.apiUrl}/MarketData`;

@Injectable()
export class MarketDataService {

    constructor(private http: HttpClient, private state:State) { }

    getSymbol() {
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + "/" + "commodityGrade")
            .toPromise()
            .then(res => res)
            .then(data => data)
            .finally(()=>{
                this.state.setLoading(false)
            })
    }

    getCommodities() {
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + '/' + "commodity")
            .toPromise()
            .then(res => res)
            .then(data => data)
            .finally(()=>{
                this.state.setLoading(false)
            })
    }

    getMarketDataCommodity(id:any){
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + '/' + id)
        .toPromise()
        .then(res => res)
        .then(data => data)
        .finally(()=>{
            this.state.setLoading(false)
        })
    }
  

    getDailyTradeDate(id:any){
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl +'/dailytradedata'+'/' + id)
        .toPromise()
        .then(res => res)
        .then(data => data)
        .finally(()=>{
            this.state.setLoading(false)
        })
    }

    getCoffeePretrade(num:Number){
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + '/pretradecoffee' + '/' + num)
        .toPromise()
        .then(res => res)
        .then(data => data)
        .finally(()=>{
            this.state.setLoading(false)
        })
    }

    getNonCoffeePretrade(id:string){
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + '/pretradenoncoffee' + '/' + id)
        .toPromise()
        .then(res => res)
        .then(data => data)
        .finally(()=>{
            this.state.setLoading(false)
        })
    }
    getNonTraceableCoffeePretrade(){
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + '/nontraceablepretrade')
        .toPromise()
        .then(res => res)
        .then(data => data)
        .finally(()=>{
            this.state.setLoading(false)
        }) 
    }
}