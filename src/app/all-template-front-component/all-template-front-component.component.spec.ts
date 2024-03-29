import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTemplateFrontComponentComponent } from './all-template-front-component.component';

describe('AllTemplateFrontComponentComponent', () => {
  let component: AllTemplateFrontComponentComponent;
  let fixture: ComponentFixture<AllTemplateFrontComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTemplateFrontComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTemplateFrontComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
