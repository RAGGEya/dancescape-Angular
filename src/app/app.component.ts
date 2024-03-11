import { Component, OnInit } from '@angular/core';
import { EventService } from './Services/Event/event.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DanceScapePIDEV';

  constructor ( public eventService : EventService ){}
  

  
}
