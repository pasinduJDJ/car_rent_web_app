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

  constructor(private http: HttpClient) { }
  
  vehicle ={
    car_reg_no: '',
    car_brand: '',
    car_model:'',
    car_type: '',
    car_manufacture_year: '',
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
    console.log("this.vehicle");
    this.http.post('http://localhost:8083/cars', this.vehicle)
      .subscribe(response => {
        console.log('Vehicle added:', response);
      });
  }

  
}