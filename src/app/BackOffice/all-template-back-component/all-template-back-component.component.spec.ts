import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTemplateBackComponentComponent } from './all-template-back-component.component';

describe('AllTemplateBackComponentComponent', () => {
  let component: AllTemplateBackComponentComponent;
  let fixture: ComponentFixture<AllTemplateBackComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTemplateBackComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTemplateBackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
