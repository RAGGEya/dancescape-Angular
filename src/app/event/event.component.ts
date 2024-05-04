import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  

    events: Event[] = [];

    

   
    }
    


export interface Event {
  EventId: number;
  EventName: string;
  Venue: string;
  EventDate: Date;
}

