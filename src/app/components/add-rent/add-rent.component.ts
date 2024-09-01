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

  constructor(private http: HttpClient, private rentService: RentService, private carService:CarService) { }
  car_reg_number: string='';

  rent = {
    r_start_date : "",
    r_end_date : "",
    r_distance : "",
    r_price : "",
    r_car_no: this.car_reg_number,
    r_recp_img : "",
  }

  findcar() {
    console.log('Vehicle Registration Number:', this.car_reg_number);
    this.carService.getCarByName(this.car_reg_number).subscribe(
      response => {
        if (response && Array.isArray(response) && response.length > 0) {
          // Assuming the response contains the car details
          console.log('Vehicle registration number found:', response);
          this.rent.r_car_no = this.car_reg_number; // Set the car registration number
        } else {
          console.error('Vehicle registration number not found or empty response.');
        }
      },
      error => {
        console.error('Error retrieving vehicle registration number:', error);
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
    console.log(this.rent);
    this.http.post('http://localhost:8083/rents', this.rent)
      .subscribe(response => {
        console.log('Rent added:', response);
        this.rent = { r_car_no: '', r_distance: '', r_end_date: '', r_price: '', r_recp_img: '', r_start_date: ''};
        this.car_reg_number='';
      });
  }
}
