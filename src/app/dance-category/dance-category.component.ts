import { Component } from '@angular/core';

@Component({
  selector: 'app-dance-category',
  templateUrl: './dance-category.component.html',
  styleUrls: ['./dance-category.component.css']
})
export class DanceCategoryComponent {
    CategorieId! : number;
    Style! : String;
}
