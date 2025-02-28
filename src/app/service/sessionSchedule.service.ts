import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const baseUrl = `${environment.apiUrl}/SessionSchedule`;

@Injectable()
export class SessionSchedule {

    constructor(private http: HttpClient) { }



    getSessionSchedule() {
        return this.http.get<any>(baseUrl)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }

}