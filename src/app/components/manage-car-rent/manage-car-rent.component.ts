import { Component, OnInit } from '@angular/core';
import { CarrentService } from '../../service/carrent.service';
import { CarService } from '../../service/car.service';

@Component({
  selector: 'app-manage-car-rent',
  templateUrl: './manage-car-rent.component.html',
  styleUrl: './manage-car-rent.component.css'
})
export class ManageCarRentComponent implements OnInit {

  car_reg_number: string = '';
  rentcars: any[] = [];
  selectedRentcars: any = null;
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'success';

  rentcar = {
    car_reg_no: this.car_reg_number,
    rent_payment: '',
    pay_date: '',
    month: '',
    payment_bill: '',
  }
  constructor(private carRentService: CarrentService, private carService: CarService) { }

  ngOnInit(): void {
  }

  loadCarRentPayment() {
    this.carRentService.getRentCarByCarNumber(this.car_reg_number).subscribe(
      (rentcars) => {
        if (rentcars.length > 0) {
          this.rentcars = rentcars;
        } else {
          this.rentcars = [];
          this.car_reg_number = '';
          this.alertMessage = 'Vehicle Number Not Match or no Payments Previously';
          this.alertType = 'danger';
        }
      }, (error) => {
      }
    )
  }
  findcar() {
    this.carService.getCarByName(this.car_reg_number).subscribe(
      response => {
        this.loadCarRentPayment()
      },
      error => {
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

  fillForm(rentcar_id: number) {
    this.carRentService.getRentCarByID(rentcar_id).subscribe(
      (res) => {
        this.selectedRentcars = res;
        if (this.selectedRentcars) {
          this.rentcar = { ...this.selectedRentcars };
        }
      },
      (error) => {
      }
    );
  }

  deleteRentCar(rentcar_id: number) {
    this.carRentService.deleteRentCar(rentcar_id).subscribe(
      () => {
        this.loadCarRentPayment();
      }
    )
  }

  onSubmit() {
    if (this.rentcar.rent_payment && this.rentcar.pay_date && this.rentcar.month) {
      this.carRentService.updateRentCar(this.rentcar).subscribe(
        (response) => {
          this.alertMessage = 'Payments updated successfully';
          this.alertType = 'success';
          this.resetForm();
          this.loadCarRentPayment();
        },
        (error) => {
          this.alertMessage = 'Error updating Payment';
          this.alertType = 'danger';
        }
      );
    } else {
      this.alertMessage = 'Please fill out all fields correctly.';
      this.alertType = 'danger';
    }
  }

  resetForm(){
    this.rentcar = {
      car_reg_no: '',
      rent_payment: '',
      pay_date: '',
      month: '',
      payment_bill: '',
    };
  }


}
