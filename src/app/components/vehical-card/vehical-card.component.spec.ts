import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalCardComponent } from './vehical-card.component';

describe('VehicalCardComponent', () => {
  let component: VehicalCardComponent;
  let fixture: ComponentFixture<VehicalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicalCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
