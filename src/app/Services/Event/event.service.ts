import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService  {
  private baseUrl : string = 'http://localhost:8081/DanceScape/Crud/Event/'



  constructor(private http : HttpClient) { }

  findAllEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.baseUrl + "findAll")
  }

addEvent(event : Event): Observable<Event>{
  return this.http.post<Event>(this.baseUrl + "addOrUpdateEvent" , event)
}
 
  }


