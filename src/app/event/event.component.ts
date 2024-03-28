import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../Services/Event/event.service';
import { Event } from '../Models/event';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})



export class EventComponent implements OnInit {
  

  
 events : Event[] = [];

 editingEvent : Event | null = null;

  EventForm: FormGroup; 
  constructor(private fb: FormBuilder,private eventService: EventService) {
   
    this.EventForm = this.fb.group({
      EventName: ['', Validators.required],
      Venue: ['', Validators.required],
      EventDate: [new Date(), [Validators.required]],

    }); 

}



loadEvents() : void{
  this.eventService.findAllEvents().subscribe(
    (events: Event[]) => {
      this.events = events;
    });
}

ngOnInit() : void{
  this.loadEvents();
  }



addEvent() : void {

if (this.EventForm.valid) {
  const newEvent : Event = this.EventForm.value as Event;
  console.log('New Event Object:', newEvent);

  this.eventService.addEvent(newEvent). subscribe(  () : void => {  
      this. loadEvents();
    this.EventForm.reset(); });
    alert("Event  added !");

} else {
alert("Event not added !");
}}



 cancelEdit() : void{
    this.EventForm.reset();
 }










   
updateEvent(): void {
  if (this.editingEvent && this.EventForm.valid) {
    const updatedEvent: Event = {
      ...this.editingEvent,
      ...this.EventForm.value
    };
    this.eventService.addEvent(updatedEvent).subscribe(() : void => {
      this.loadEvents();
      this.EventForm.reset();
      this.editingEvent = null;
    });
  }
}

editEvent(event: Event): void {
  this.editingEvent = event;
  this.EventForm.patchValue({
    EventName: event.EventName,
    Venue: event.Venue,
    EventDate: event.EventDate,
  });
}




    }
    




