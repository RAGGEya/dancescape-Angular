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
  
  eventName!: string;
  venue!: string;
  eventDate!: Date;
  showSearchResults: boolean = false;
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


ngOnInit() : void{
  this.loadEvents();
  }


 cancelEdit() : void{
    this.EventForm.reset();
 }





 deleteEvent(EventId: number): void {
  this.eventService.deleteEvent(EventId).subscribe(
    () : void => {
      this.loadEvents();
      alert("Event  deleted !");

    }
 
  );
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

editEvent(event: Event): void {
  this.editingEvent = event;
  this.EventForm.patchValue({
    eventName: event.eventName,
    venue: event.venue,
    eventDate: event.eventDate,
  });
  this.scrollToEditForm();
}


scrollToEditForm() {
  const editForm = document.getElementById('editEventForm');
  if (editForm) {
      editForm.scrollIntoView({ behavior: 'smooth' });
  }
}

searchEventsByEventName(eventName: string): void {
  this.eventService.searchEventsByEventName(eventName).subscribe(
    events => {
      this.events = events;
      this.showSearchResults = true;
    },
    error => {
      console.log('Error occurred while searching events by eventName:', error);
    }
  );
}

searchEventsByVenue(venue: string): void {
  this.eventService.searchEventsByVenue(venue).subscribe(
    events => {
      this.events = events;
      this.showSearchResults = true;
    },
    error => {
      console.log('Error occurred while searching events by venue:', error);
    }
  );
}

searchEventsByEventDate(eventDate: Date): void {
  this.eventService.searchEventsByEventDate(eventDate).subscribe(
    events => {
      this.events = events;
      this.showSearchResults = true;
    },
    error => {
      console.log('Error occurred while searching events by eventDate:', error);
    }
  );
}
searchEvents() {
  const criteria = {
    eventName: this.eventName,
    venue: this.venue,
    eventDate: this.eventDate
  };}



  

  
  }
    




