import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMaintanceComponent } from './manage-maintance.component';

describe('ManageMaintanceComponent', () => {
  let component: ManageMaintanceComponent;
  let fixture: ComponentFixture<ManageMaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageMaintanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
