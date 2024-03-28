import { Component, OnInit } from '@angular/core';
import { DanceCategory } from '../Models/dance-category';
import { DanceCategoryService } from '../Services/dance-category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dance-category',
  templateUrl: './dance-category.component.html',
  styleUrls: ['./dance-category.component.css']
})
export class DanceCategoryComponent implements OnInit{
  danceCategories : DanceCategory[] = [];

  DanceForm: FormGroup; 

  constructor(private fb: FormBuilder,private DCService: DanceCategoryService) {

    this.DanceForm = this.fb.group({

      categorieName: ['', Validators.required],
      DCdescription: ['', Validators.required],
    }); 
  }



  addDanceCat()  {

    if (this.DanceForm.valid) {
      const newDc : DanceCategory = this.DanceForm.value as DanceCategory;
      console.log('New d Object:', newDc);
    
      this.DCService.addDanceCat(newDc). subscribe(  () : void => {  
          this. loadDanceCat();
        this.DanceForm.reset(); });
        alert("DC  added !");
    
    } else {
    alert("DC not added !");
    }}
    

    cancelEdit() : void{
      this.DanceForm.reset();
   }
  

  loadDanceCat() : void{
    this.DCService.findAllDanceCat().subscribe(
      (danceCategories: DanceCategory[]) => {
        this.danceCategories = danceCategories;
      });
  }

 ngOnInit() : void{
this.loadDanceCat();
}
}
