import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
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
  

  addMyEvent(event: Event): Observable<Event> {
    console.log('Adding event:', event);
    
    return this.http.post<Event>(this.baseUrl + 'addOrUpdateEvent', event)
      .pipe(
        tap((response: Event) => {
          console.log('Event added successfully:', response);
        }),
        catchError((error: any) => {
          console.error('Error adding event:', error);
          throw error; // Rethrow the error to propagate it to the caller
        })
      );
  }
  

  deleteEvent(eventId : number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'deleteEvent?id=' + eventId);
  }
  
  searchEventsByEventName(eventName: string): Observable<Event[]> {
    return this.http.post<Event[]>(`${this.baseUrl}search`, { eventName });
  }

  searchEventsByVenue(venue: string): Observable<Event[]> {
    return this.http.post<Event[]>(`${this.baseUrl}search`, { venue });
  }

  searchEventsByEventDate(eventDate: Date): Observable<Event[]> {
    return this.http.post<Event[]>(`${this.baseUrl}search`, { eventDate });
  }


  
  }


