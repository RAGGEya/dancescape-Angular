import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackDanceCatComponent } from './back-dance-cat.component';

describe('BackDanceCatComponent', () => {
  let component: BackDanceCatComponent;
  let fixture: ComponentFixture<BackDanceCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackDanceCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackDanceCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
