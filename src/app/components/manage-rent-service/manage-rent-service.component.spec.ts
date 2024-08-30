import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRentServiceComponent } from './manage-rent-service.component';

describe('ManageRentServiceComponent', () => {
  let component: ManageRentServiceComponent;
  let fixture: ComponentFixture<ManageRentServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageRentServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRentServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
