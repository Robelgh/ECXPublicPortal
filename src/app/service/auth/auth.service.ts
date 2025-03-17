
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { MapTo } from "../map.service";
import { Observable, of } from "rxjs";
import { tap, delay } from "rxjs/operators";
import { jwtDecode } from "jwt-decode";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const baseUrl = `${environment.apiUrl}/Account`;
const mfaUrl = `${environment.mfaUrl}`;

let data={};


var  Miniorange= {
  
  "customerKey":"1",
  "username":"behailu.girma@ecx.com.et" ,
  "authType":"EMAIL",
 "transactionName":"Test"
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    reirectUrl: string|null = null;
    constructor(
        private router: Router,
        private http: HttpClient,
        private mapto:MapTo,
    ){}

    auth(data:any) {
     
      if(!this.mapto.isWalkinCustomer(data.UserName))
      {
        return this.http.post<any>(baseUrl + "/AD/login",this.mapto.convertJsonToFormData(data),{ withCredentials: true })
            .toPromise()
            .then(res => data)
            .then(data => data);
      }
      else{
        return this.http.post<any>(baseUrl + "/MCR/AD/login",this.mapto.convertJsonToFormData(data))
        .toPromise()
        .then(res => res)
        .then(data => data);
      }
        
    }

    login(data: any) {
 
                const redirectUrl = "/";
                const navigationExtras: NavigationExtras = {
                  queryParamsHandling: "preserve",
                  preserveFragment: true,
                };
                localStorage.clear();
                 localStorage.setItem('token',data.token) 
                 this.router.navigate([redirectUrl], navigationExtras);  
    }
    isLoggedIn(): boolean{
        return (localStorage.getItem('token') == null ||  localStorage.getItem('token') == undefined)? false : true
    }

    sendOTP(){
      const headers=new HttpHeaders({
        'Customer-Key':'1',
        'Timestamp': '1741849537454',
        'Authorization': '11df8551bd077431fac8795a96dfb83f9d6fb6fe8736fa689faef3448469fb00a6f01c6ecd57ccb72fd73cc4fb52bf1b537c4355e808d90598598fefe01e0054'
      })
      return this.http.post<any>(mfaUrl,this.mapto.convertJsonToFormData(Miniorange),{headers})
      .toPromise()
      .then(res => res)
      .then(data => data);
    }

    verfiyOTP(data:any){
      return this.http.post<any>(baseUrl + "/VerifyOTP",this.mapto.convertJsonToFormData(Miniorange))
      .toPromise()
      .then(res => res)
      .then(data => data);
    }

    logOut(): void {
        localStorage.clear();
        const redirectUrl = "auth/login";
        this.router.navigate([redirectUrl]);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
      }
    
    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;
    
        const decoded: any = jwtDecode(token);
        for (let key in decoded) {
            if (key.includes('role')) {
              console.log(`Role: ${decoded[key]}`); // Output: Role: Admin
            }
          }
        const expirationDate = decoded.exp * 1000;
        return Date.now() > expirationDate;
      }

    getRole(): string{
        const token = this.getToken();
        let role='';
        const decoded: any = jwtDecode(token);
        for (let key in decoded) {
            if (key.includes('role')) {
               role= `${decoded[key]}`
            }
          }

          return role;
      }

    getUserName(): string{
        const token = this.getToken();
        let name='';
        const decoded: any = jwtDecode(token);
        for (let key in decoded) {
            if (key.includes('name')) {
               name= `${decoded[key]}`
            }
          }
          return name;
      }
    getId(){
        const token = this.getToken();
        let id='';
        const decoded: any = jwtDecode(token);
        for (let key in decoded) {
            if (key.includes('nameidentifier')) {
               id= `${decoded[key]}`
            }
          }
          return id;
      }

    getMemberId(){
        const token = this.getToken();
        let id='';
        const decoded: any = jwtDecode(token);
        for (let key in decoded) {
            if (key.includes('primarysid')) {
               id= `${decoded[key]}`
            }
          }
          return id;
      }

      checkSession(): Observable<any> {
        return this.http.get<any>(`${baseUrl}/check-session`, { withCredentials: true });
      }   
    
}
