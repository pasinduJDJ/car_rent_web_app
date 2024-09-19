import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarRentComponent } from './add-car-rent.component';

describe('AddCarRentComponent', () => {
  let component: AddCarRentComponent;
  let fixture: ComponentFixture<AddCarRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCarRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
