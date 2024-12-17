import { Component } from '@angular/core';
import { DanceCategory } from '../Models/dance-category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DanceCategoryService } from '../Services/dance-category.service';

@Component({
  selector: 'app-back-dance-cat',
  templateUrl: './back-dance-cat.component.html',
  styleUrls: ['./back-dance-cat.component.css']
})
export class BackDanceCatComponent {
  danceCategories: DanceCategory[] = [];
  editingCategory: DanceCategory | null = null;
  categoryForm: FormGroup;


  constructor(private fb: FormBuilder, private danceCategoryService: DanceCategoryService) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      dcDescription: ['', Validators.required],
   
    });
  }

  loadCategories(): void {
    this.danceCategoryService.findAllDanceCat().subscribe(
      (categories: DanceCategory[]) => {
        this.danceCategories = categories;
      
      }
    );
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  addCategory() {
    if (this.categoryForm.valid) {
      const newCategory: DanceCategory = this.categoryForm.value as DanceCategory;
      console.log('New Category Object:', newCategory);
      this.danceCategoryService.addMyDanceCat(newCategory).subscribe(() => {
        this.loadCategories();
        this.categoryForm.reset();
        alert("Category added successfully!");
      });
    } else {
      alert("Category not added!");
    }
  }

  cancelEdit(): void {
    this.categoryForm.reset();
    this.editFormVisible = false;
  }

  deleteCategory(categoryId: number): void {
    const categoryToDelete = this.danceCategories.find(category => category.categorieId === categoryId);
    if (!categoryToDelete) {
      return;
    }
    const confirmation = confirm(`Are you sure you want to delete the dance category "${categoryToDelete.categoryName}"?`);
    if (confirmation) {
      
      this.danceCategoryService.deleteCategory(categoryId).subscribe(() => {
        this.loadCategories();
        alert(`The dance category "${categoryToDelete.categoryName}" has been deleted.`);
      });
    }
  }

  updateCategory(): void {
    if (this.editingCategory && this.categoryForm.valid) {
      const updatedCategory: DanceCategory = {
        ...this.editingCategory,
        ...this.categoryForm.value
      } as DanceCategory;
      this.danceCategoryService.addMyDanceCat(updatedCategory).subscribe(() => {
        this.loadCategories();
        this.categoryForm.reset();
        this.editingCategory = null;
      });
    }
  }

  editCategory(category: DanceCategory): void {
    this.editingCategory = category;
    this.categoryForm.patchValue({
      categoryName: category.categoryName,
      dcDescription: category.dcDescription
    }

  )

  ;    this.editFormVisible = true;
  }

  editFormVisible: boolean = false; 
}
