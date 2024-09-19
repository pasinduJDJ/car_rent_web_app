import { Component } from '@angular/core';
import { CarService } from '../../service/car.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-car-rent',
  templateUrl: './add-car-rent.component.html',
  styleUrl: './add-car-rent.component.css'
})
export class AddCarRentComponent {

  constructor(private http: HttpClient, private carService: CarService) { }
  maxDate : String='';
  car_reg_number: string = '';
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'success';

  ngOnInit(): void {
    const today= new Date();
    this.maxDate= today.toISOString().split('T')[0];
  }

  rentcar = {
    car_reg_no: this.car_reg_number,
    rent_payment: '',
    pay_date: '',
    month: '',
    payment_bill: '',
  }

  findcar() {
    console.log('Vehicle Registration Number:', this.car_reg_number);
    this.carService.getCarByName(this.car_reg_number).subscribe(
      response => {
        if (response && Array.isArray(response) && response.length > 0) {
          this.rentcar.car_reg_no=this.car_reg_number;
          this.alertMessage = 'Add Payment under this Vehicle Number';
          this.alertType = 'success';
        } else {
          this.alertMessage = 'Vehicle registration number not found';
          this.alertType = 'danger';
        }
      },
      error => {
        this.alertMessage = 'Vehicle registration number not found';
        this.alertType = 'danger';
        console.error('Error retrieving vehicle registration number:', error);
      }
    );
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.rentcar.payment_bill = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.rentcar.car_reg_no && this.rentcar.month && this.rentcar.pay_date && this.rentcar.rent_payment && this.rentcar.payment_bill) {
      this.http.post('http://localhost:8083/rentCars', this.rentcar)
        .subscribe(response => {
          window.location.reload();
          this.alertMessage = 'Rent Payment record added successfully';
          this.alertType = 'success';
        }, error => {
          this.alertMessage = 'Failed to add Rent Payment record';
          this.alertType = 'danger';
        });
    } else {
      this.alertMessage = 'Please fill out all fields correctly.';
      this.alertType = 'danger';
    }
  }
}
