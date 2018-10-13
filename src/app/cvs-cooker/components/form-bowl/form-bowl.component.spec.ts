import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBowlComponent } from './form-bowl.component';

describe('FormBowlComponent', () => {
  let component: FormBowlComponent;
  let fixture: ComponentFixture<FormBowlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBowlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBowlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
