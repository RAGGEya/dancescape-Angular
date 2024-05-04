import { Component } from '@angular/core';
import { EmailServiceService } from '../Services/email-service.service';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.css']
})
export class EmailSenderComponent {

  constructor(private emailService : EmailServiceService){}

  sendEmail() {
    const to = 'dorrasnene1@gmail.com';
    const subject = 'Test Email';
    const body = 'This is a test email sent from the frontend.';
  
    this.emailService.sendEmail(to, subject, body).subscribe(
      () : void   => {
        console.log('Email sent successfully');
        // Handle success response
      },
      (      error: any) => {
        console.error('Failed to send email:', error);
        // Handle error response
      }
    );
  }
 
}
