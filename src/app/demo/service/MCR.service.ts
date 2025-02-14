import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { environment } from '../../../environments/environment';
import { State } from '../State/State';



const baseUrl = `${environment.apiUrl}/MCR`;

@Injectable()
export class MCRService {

    constructor(private http: HttpClient, private state:State) { }

    getGrn(username:string,grn:string) {
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + "/" + "commodityGrade")
            .toPromise()
            .then(res => res)
            .then(data => data)
            .finally(()=>{
                this.state.setLoading(false)
            })
    }

    getwhr() {
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + '/' + "commodity")
            .toPromise()
            .then(res => res)
            .then(data => data)
            .finally(()=>{
                this.state.setLoading(false)
            })
    }

    getpsa(id:any){
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

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data)
            .finally(()=>{
                this.state.setLoading(false)
            })
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data)
            .finally(()=>{
                this.state.setLoading(false)
            })
    }

    checkstatus(controller:string,id:string,num:string){
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + "/" + controller + "/" + id + "/" + num)
            .toPromise()
            .then(res => res)
            .then(data => data)
            .finally(()=>{
                this.state.setLoading(false)
            })
    }

    checkwhrbygrn(num:string){
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + '/' + "whrbygrn" + "/" + num)
            .toPromise()
            .then(res => res)
            .then(data => data)
            .finally(()=>{
                this.state.setLoading(false)
            })
    }
    checktradestatusbywhr(num:string){
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + '/' + "tradebywhr" + "/" + num)
            .toPromise()
            .then(res => res)
            .then(data => data)
            .finally(()=>{
                this.state.setLoading(false)
            })
    }
    

    getMemberClient(id:string) {
        this.state.setLoading(true)
        return this.http.get<any>(baseUrl + '/' + "member" + "/" + id)
            .toPromise()
            .then(res => res)
            .then(data => data)
            .finally(()=>{
                this.state.setLoading(false)
            })
    }
}