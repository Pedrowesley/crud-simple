import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInformationsComponent } from './form-informations.component';

describe('FormInformationsComponent', () => {
  let component: FormInformationsComponent;
  let fixture: ComponentFixture<FormInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
