import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  private url : string = 'http://localhost:8081/DanceScape/email/'



  constructor(private http : HttpClient)
   { }


   sendEmail(to: string, subject: string, body: string) {
    const emailData = { toEmail: to, subject: subject, body: body };
    return this.http.get(this.url + 'send');
  }
}
