import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logistics } from '../Models/logistic';

@Injectable({
  providedIn: 'root'
})
export class LogisticService {
  private baseUrl : string = 'http://localhost:5016/DanceScape/Crud/Logistics/';

  constructor(private http:HttpClient) { }

  findAllLogistics(): Observable<Logistics[]> {
    return this.http.get<Logistics[]>(this.baseUrl + 'findAll');
  }

  addLogistic(logistic: Logistics): Observable<Logistics> {
    return this.http.post<Logistics>(this.baseUrl + 'addOrUpdateLogistics', logistic);
  }

  deleteLogistic(logisticId: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'deleteLogitics?id=' + logisticId);
  }

}
