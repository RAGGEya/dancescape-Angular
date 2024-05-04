import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DanceCategory } from '../Models/dance-category';

@Injectable({
  providedIn: 'root'
})
export class DanceCategoryService {
  private baseUrl : string = 'http://localhost:8081/DanceScape/Crud/DanceCat/'

  constructor(private http : HttpClient) { }



  findAllDanceCat(): Observable<DanceCategory[]>{
    return this.http.get<DanceCategory[]>(this.baseUrl + 'findAllDanceCat')
  }
  

  addMyDanceCat(dc : DanceCategory): Observable<DanceCategory>{
    return this.http.post<DanceCategory>(this.baseUrl + 'addOrUpdateDanceCat' , dc)
  }

  
  deleteCategory(id : number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'deleteDanceCat?id=' + id);
  }
}
