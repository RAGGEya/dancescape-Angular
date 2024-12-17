import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from './Models/UserProfile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  private apiUrl = 'http://localhost:8089/DanceScape/api/profile/';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    const token = localStorage.getItem('jwtToken'); // Adjust according to where you're storing your token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserProfile>(`${this.apiUrl}getProfile`);
  }
}
