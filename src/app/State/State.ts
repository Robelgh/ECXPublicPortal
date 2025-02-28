import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class State {



private isLoadingSubject = new BehaviorSubject<boolean>(false);
isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();


constructor() { }

setLoading(value: boolean) {
  this.isLoadingSubject.next(value);
}
  
}