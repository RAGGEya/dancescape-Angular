import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AccomodationService}from"src/app/Services/accomodation.service";
import { Accomodation } from '../Models/accomodation';
@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css']
})
export class AccomodationComponent {

  accomodations : Accomodation[] = [];

  editingAccomodation : Accomodation | null = null;

   AccomodationForm: FormGroup;
   constructor(private fb: FormBuilder,private AccomodationService: AccomodationService ) {

     this.AccomodationForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],

     });

 }

 loadAccomodations() : void{
   this.AccomodationService.findAllAccomodations().subscribe(
     (accomodations: Accomodation[]) => {
       this.accomodations = accomodations;
     });
 }


 addAccomodation()  {

 if (this.AccomodationForm.valid) {

   const newAccomodation : Accomodation = this.AccomodationForm.value as Accomodation;
   console.log('New Accomodation Object:', newAccomodation);

   this.AccomodationService.addAccomodation(newAccomodation). subscribe(  () : void => {
       this. loadAccomodations();
     this.AccomodationForm.reset();
    });
     alert("Accomodation  added !");

 } else {
 alert("Accomodation not added !");
 }}


 ngOnInit() : void{
   this.loadAccomodations();
   }


  cancelEdit() : void{
     this.AccomodationForm.reset();
  }





  deleteAccomodation(AccomodationId: number): void {
   this.AccomodationService.deleteAccomodation(AccomodationId).subscribe(
     () : void => {
       this.loadAccomodations();
     }

   );
 }






 updateAccomodation(): void {
   if (this.editingAccomodation && this.AccomodationForm.valid) {
     const updatedAccomodation: Accomodation = {
       ...this.editingAccomodation,
       ...this.AccomodationForm.value
     }as Accomodation;
     this.AccomodationService.addAccomodation(updatedAccomodation).subscribe(() : void => {
       this.loadAccomodations();
       this.AccomodationForm.reset();
       this.editingAccomodation = null;
     });
   }
 }

 editAccomodation(accomodation: Accomodation): void {
   this.editingAccomodation = accomodation;
   this.AccomodationForm.patchValue({
     name: accomodation.name,
     location: accomodation.location,
   });
 }






}
