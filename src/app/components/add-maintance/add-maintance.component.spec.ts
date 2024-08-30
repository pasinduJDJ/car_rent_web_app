import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintanceComponent } from './add-maintance.component';

describe('AddMaintanceComponent', () => {
  let component: AddMaintanceComponent;
  let fixture: ComponentFixture<AddMaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMaintanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
