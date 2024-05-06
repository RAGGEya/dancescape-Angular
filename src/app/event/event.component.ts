import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../Services/Event/event.service';
import { Event } from '../Models/event';
import { ApiResponse } from '../Models/api-response';
import { Page } from '../Models/page';
import { animate, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})

export class EventComponent implements OnInit {
  
  eventName!: string;
  venue!: string;
  eventDate!: Date;
  showSearchResults: boolean = false;
 events : Event[] = [];

 editingEvent : Event | null = null;

  EventForm: FormGroup; 
  currentPage: number = 2;
  pageSize: number = 6;
  totalEvents: number = 0; // Initially set to 0
  totalPages: number = 0;
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


  sortByField(field: string): void {
    this.eventService.getEventsWithSorting(field).subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      (error) => {
        console.error('Error sorting events:', error);
      }
    );
  }


   prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEventsWithPagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEventsWithPagination();
    }
  }

  loadEventsWithPagination(): void {
    const offset = 0;
    this.eventService.getEventsWithPagination(offset, this.pageSize)
      .subscribe(
        (page: any) => {
          this.events = page.content;
          this.totalEvents = page.totalElements;
          this.totalPages = Math.ceil(this.totalEvents / this.pageSize); // Calculate total pages dynamically
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
  }

  @ViewChild('selectBox') selectBox: any;

  onFocus(): void {
    this.selectBox.nativeElement.classList.add('focused');
  }

  onBlur(): void {
    this.selectBox.nativeElement.classList.remove('focused');
  }

}
