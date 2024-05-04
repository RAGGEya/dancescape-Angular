import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DanceCategoryService {
  private baseUrl : string = 'http://localhost:8080/DanceCatCrud/'

  constructor(private http : HttpClient) { }
}
