import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccomodationComponent } from '../accomodation/accomodation.component';
import { Accomodation } from '../Models/accomodation';


@Injectable({
  providedIn: 'root'
})
export class AccomodationService {
  private baseUrl : string = 'http://localhost:5016/DanceScape/Crud/Accomodation/';


  constructor(private http:HttpClient) { }
  findAllAccomodations() : Observable<Accomodation[]>{
    return this.http.get<Accomodation[]>( this.baseUrl + 'findAll');

  }
  addAccomodation(accomodation: Accomodation) : Observable<AccomodationComponent>{
    return this.http.post<AccomodationComponent>( this.baseUrl + 'addOrUpdateAccomodation',accomodation);
   }

   deleteAccomodation(AccomodationId : number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'deleteAccomodation=' + AccomodationId);
  }

}
