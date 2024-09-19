import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCarRentComponent } from './manage-car-rent.component';

describe('ManageCarRentComponent', () => {
  let component: ManageCarRentComponent;
  let fixture: ComponentFixture<ManageCarRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCarRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCarRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
