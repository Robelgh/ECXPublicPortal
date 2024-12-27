import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { environment } from '../../../environments/environment';


const baseUrl = `${environment.apiUrl}/FeedBack`;

@Injectable()
export class ComplainFeedBackService {

    constructor(private http: HttpClient) { }

    getFeedBack() {
        return this.http.get<any>(baseUrl)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }


    addFeedBack(request:any) {
        request.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });
        return this.http.post<any>(baseUrl,request)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }
}