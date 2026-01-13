import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeadlineResponse } from './deadline.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {

  constructor(private http:HttpClient) { }

  public getSecondsLeft(): Observable<number>{
    return this.http.get<DeadlineResponse>('/api/deadline').pipe(map((response:DeadlineResponse) => response.secondsLeft));
  }

}
