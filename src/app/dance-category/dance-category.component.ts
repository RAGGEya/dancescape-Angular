import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DanceCategoryService } from '../Services/dance-category.service';
import { DanceCategory } from '../Models/dance-category';

@Component({
  selector: 'app-dance-category',
  templateUrl: './dance-category.component.html',
  styleUrls: ['./dance-category.component.css']
})
export class DanceCategoryComponent implements OnInit {
  
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

  ;this.scrollToEditForm();
  }
  scrollToEditForm() {
    const editForm = document.getElementById('editEventForm');
    if (editForm) {
        editForm.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
