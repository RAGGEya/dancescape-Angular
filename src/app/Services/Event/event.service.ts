import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/Models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService  {
  private baseUrl : string = 'http://localhost:8081/DanceScape/Crud/Event/'



  constructor(private http : HttpClient) { }

  findAllEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.baseUrl + 'findAllEvents')
  }
  

addEvent(event : Event): Observable<Event>{
  return this.http.post<Event>(this.baseUrl + 'addOrUpdateEvent' , event)
}
 
  }


