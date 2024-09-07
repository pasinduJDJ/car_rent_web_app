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
  currentYear: number= 2024;
  constructor(private fb: FormBuilder, private carService: CarService, private http: HttpClient) {}

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
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'success';

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
        this.alertMessage='Please Check Conection or Not Add Vehicle';
        this.alertType='danger';
        
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
          this.vehicle = { ...this.selectedvehicle };
        }
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
      }
    );
  }

  onSubmit() {
    if (this.vehicle.car_reg_no && this.vehicle.car_brand && this.vehicle.car_model && this.vehicle.car_type && this.vehicle.car_manufacture_year && this.vehicle.car_img){
      this.carService.updateCar(this.vehicle).subscribe(
        (response) => {
          console.log(this.vehicle);
          this.vehicle = { car_reg_no: '', car_brand: '', car_model: '', car_type: '', car_manufacture_year: '', car_img: '' };
          this.loadAllVehicles();
          this.alertMessage='Vehicle updated successfully';
          this.alertType='success';
          window.location.reload();
        },
        (error) => {
          this.alertMessage='Error updating vehicle';
          this.alertType='danger';
        }
      );
    }else {
      this.alertMessage = 'Please fill out all fields correctly.';
      this.alertType = 'danger';
    }
  }


  deleteVehicle(car_id :number) {
    this.carService.deleteCar(car_id).subscribe(
      ()=>{
        this.loadAllVehicles();
      }
    )
  }


}
