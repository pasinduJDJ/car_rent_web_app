import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../service/car.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrl: './manage-vehicle.component.css'
})
export class ManageVehicleComponent implements OnInit {

  vehicle = {
    car_reg_no: '',
    car_brand: '',
    car_model: '',
    car_type: '',
    car_manufacture_year: '',
    car_img: '',
  }
  vehicles: any[] = [];
  selectedvehicle: any = null;

  constructor(private fb: FormBuilder, private carService: CarService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.loadAllVehicles();
  }

  loadAllVehicles() {
    this.carService.getCar().subscribe(
      (vehicles) => {
        this.vehicles = vehicles;
        // Log to check the format of car_img
        console.log('Vehicle images:', this.vehicles.map(v => v.car_img));
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
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
  fillForm(car_id: number) {
    this.carService.getCarById(car_id).subscribe(
      (res) => {
        console.log(res);
        this.selectedvehicle = res;
        if (this.selectedvehicle) {
          this.vehicle = { ...this.selectedvehicle }; // Make a shallow copy of the selected vehicle data
        }
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
      }
    );
  }

  onSubmit() {
    this.carService.updateCar(this.vehicle).subscribe(
      (response) => {
        console.log(this.vehicle);
        console.log('Vehicle updated successfully', response);
        this.vehicle = { car_reg_no: '', car_brand: '', car_model: '', car_type: '', car_manufacture_year: '', car_img: '' };
        this.loadAllVehicles();
      },
      (error) => {
        console.error('Error updating vehicle:', error);
      }
    );
  }


  deleteVehicle(car_id :number) {
    this.carService.deleteCar(car_id).subscribe(
      ()=>{
        this.loadAllVehicles();
      }
    )
  }


}
