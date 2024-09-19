import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../service/car.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent {

  currentYear:number= 2024;
  constructor(private http: HttpClient) { }
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'success';

  vehicle = {
    car_reg_no: '',
    car_brand: '',
    car_model: '',
    car_type: '',
    car_manufacture_year: '',
    ownership:'',
    car_img: '',
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.vehicle.car_img = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.vehicle.car_reg_no && this.vehicle.car_brand && this.vehicle.car_model && this.vehicle.car_type && this.vehicle.car_manufacture_year && this.vehicle.car_img && this.vehicle.ownership) {
      this.http.post('http://localhost:8083/cars', this.vehicle)
        .subscribe(response => {
          window.location.reload();
          this.alertMessage = 'Vehicle Added successfully';
          this.alertType = 'success';
        }, error => {
          this.alertMessage = 'Vehicle Adding Fail';
          this.alertType = 'danger';
        });
    } else {
      this.alertMessage = 'Please fill out all fields correctly.';
      this.alertType = 'danger';
    }
  }


}