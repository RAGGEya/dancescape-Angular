import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceCategoryComponent } from './dance-category.component';

describe('DanceCategoryComponent', () => {
  let component: DanceCategoryComponent;
  let fixture: ComponentFixture<DanceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanceCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
