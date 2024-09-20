import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RentService } from '../../service/rent.service';
import { CarService } from '../../service/car.service';

@Component({
  selector: 'app-add-rent',
  templateUrl: './add-rent.component.html',
  styleUrl: './add-rent.component.css'
})
export class AddRentComponent {

  constructor(private http: HttpClient, private rentService: RentService, private carService: CarService) { }
  car_reg_number: string = '';
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'success';

  rent = {
    r_start_date: "",
    r_end_date: "",
    r_distance: "",
    r_price: "",
    r_car_no: this.car_reg_number,
    r_recp_img: "",
  }

  findcar() {
    this.carService.getCarByName(this.car_reg_number).subscribe(
      response => {
        if (response && Array.isArray(response) && response.length > 0) {
          this.alertMessage = 'Add Rent Details This Vehicle Number';
          this.alertType = 'success';
          this.rent.r_car_no = this.car_reg_number;
        } else {
          this.alertMessage = 'Vehicle registration number not found';
          this.alertType = 'danger';
        }
      },
      error => {
        this.alertMessage = 'Vehicle registration number not found';
        this.alertType = 'danger';
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.rent.r_recp_img = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.rent.r_start_date && this.rent.r_end_date && this.rent.r_distance && this.rent.r_price && this.rent.r_recp_img) {
      this.http.post('http://localhost:8083/rents', this.rent)
        .subscribe(response => {
          this.alertMessage = 'Rent details added successfully';
          this.alertType = 'success';
          this.resetForm();
        }, error => {
          console.error('Failed to add rent:', error);
          this.alertMessage = 'Failed to add rent details';
          this.alertType = 'danger';
        });
    } else {
      this.alertMessage = 'Please fill out all fields correctly.';
      this.alertType = 'danger';
    }
  }

  resetForm() {
    this.rent = {
      r_start_date: '',
      r_end_date: '',
      r_distance: '',
      r_price: '',
      r_car_no: this.car_reg_number,
      r_recp_img: ''
    };
    this.car_reg_number = '';
  }
}
