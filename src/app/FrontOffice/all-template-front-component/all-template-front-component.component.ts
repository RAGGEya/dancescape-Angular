import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/Services/Event/event.service';

@Component({
  selector: 'app-all-template-front-component',
  templateUrl: './all-template-front-component.component.html',
  styleUrls: ['./all-template-front-component.component.css']
})
export class AllTemplateFrontComponentComponent {
  events : Event[] = [];

  EventForm: FormGroup;
  constructor(private fb: FormBuilder,private eventService: EventService) {

    this.EventForm = this.fb.group({

      EventName: ['', Validators.required,Validators.minLength(5) ,Validators.maxLength(50)],
      Venue: ['', Validators.required,Validators.minLength(5) ,Validators.maxLength(50)],
      EventDate: ['', [Validators.required, this.dateShouldBeAfterToday]]
    });

}

private dateShouldBeAfterToday(control: any) {
  const EventDate = new Date(control.value);
  const today = new Date();

  // Check if the selected date is after today.
  if (EventDate <= today) {
    return { dateShouldBeAfterToday: true };
  }

  // If the validation passes, return null.
  return null;
}

addEvent() : void {
console.log("coucou")
/*if (this.EventForm.valid) {*/
  const newEvent : Event = this.EventForm.value as Event;
  this.eventService.addEvent(newEvent). subscribe(  () : void => { })
   // this. loadEvents();
   // this.EventForm.reset();
/*});
} else {
alert("Event added !");
}*/
}

loadEvents() : void{
  this.eventService.findAllEvents().subscribe(event  => {this.events = event;});

}




ngOnInit() {
this.loadEvents();
}}
