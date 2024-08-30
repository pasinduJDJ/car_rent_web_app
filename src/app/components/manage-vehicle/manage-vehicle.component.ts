import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../service/car.service';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrl: './manage-vehicle.component.css'
})
export class ManageVehicleComponent {

  vehicleregisterform!: FormGroup;

  constructor(private fb:FormBuilder, private carService:CarService){
    
  }

  onSubmit() {
    console.log(this.vehicleregisterform.value);
    this.carService.updateCar(this.vehicleregisterform.value).subscribe(
      response =>{
        this.vehicleregisterform.reset();
      }
    )
  }
  

}
