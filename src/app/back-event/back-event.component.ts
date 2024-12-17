import { Component } from '@angular/core';
import { EventService } from '../Services/Event/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../Models/event';

@Component({
  selector: 'app-back-event',
  templateUrl: './back-event.component.html',
  styleUrls: ['./back-event.component.css']
})
export class BackEventComponent {

  events : Event[] = [];

 editingEvent : Event | null = null;
  EventForm: FormGroup;
  
 constructor(private fb: FormBuilder,private eventService: EventService) {
   
  this.EventForm = this.fb.group({
    eventName: ['', Validators.required],
    venue: ['', Validators.required],
    eventDate: [new Date(), [Validators.required]],

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

    
 deleteEvent(EventId: number): void {
  const eventToDelete = this.events.find(event => event.eventId === EventId);
  if (!eventToDelete) {
    return;
  }
  const confirmation = confirm(`Are you sure you want to delete the event "${eventToDelete.eventName}"?`);
  if (confirmation) {
    this.eventService.deleteEvent(EventId).subscribe(
      () : void => {
        this.loadEvents();
        alert(`The event "${eventToDelete.eventName}" has been deleted.`);
      }
    );
  }
}
editEvent(event: Event): void {
  this.editingEvent = event;
  this.EventForm.patchValue({
    eventName: event.eventName,
    venue: event.venue,
    eventDate: event.eventDate,
  });
  this.editFormVisible = true;
  
}

updateEvent(): void {
  if (this.editingEvent && this.EventForm.valid) {
    const updatedEvent: Event = {
      ...this.editingEvent,
      ...this.EventForm.value
    }as Event;
    this.eventService.addMyEvent(updatedEvent).subscribe(() : void => {
      this.loadEvents();
      this.EventForm.reset();
      this.editingEvent = null;
    });
  }
}

addEvent()  {

  if (this.EventForm.valid) {
    
    const newEvent : Event = this.EventForm.value as Event;
    console.log('New Event Object:', newEvent);
  
    this.eventService.addMyEvent(newEvent). subscribe(  () : void => {  
        this. loadEvents();
      this.EventForm.reset();
     });
      alert("Event  added !");
  
  } else {
  alert("Event not added !");
  }}

  editFormVisible: boolean = false;
  cancelEdit() {
    this.editFormVisible = false;
}
}
