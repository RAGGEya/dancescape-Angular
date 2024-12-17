import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEventComponent } from './back-event.component';

describe('BackEventComponent', () => {
  let component: BackEventComponent;
  let fixture: ComponentFixture<BackEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
