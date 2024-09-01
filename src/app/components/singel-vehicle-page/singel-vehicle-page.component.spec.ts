import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingelVehiclePageComponent } from './singel-vehicle-page.component';

describe('SingelVehiclePageComponent', () => {
  let component: SingelVehiclePageComponent;
  let fixture: ComponentFixture<SingelVehiclePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingelVehiclePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingelVehiclePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
