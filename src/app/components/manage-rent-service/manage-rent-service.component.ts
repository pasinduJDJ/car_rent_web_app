import { Component } from '@angular/core';
import { RentService } from '../../service/rent.service';
import { CarService } from '../../service/car.service';

@Component({
  selector: 'app-manage-rent-service',
  templateUrl: './manage-rent-service.component.html',
  styleUrl: './manage-rent-service.component.css'
})
export class ManageRentServiceComponent {

  car_reg_number: string = '';
  rents: any[] = [];
  selectedrent: any = null;
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

  constructor(private carService: CarService, private rentService: RentService) { }

  findcar() {
    this.carService.getCarByName(this.car_reg_number).subscribe(
      response => {
        this.loadRent()
      },
      error => {
      }
    );
  }

  loadRent() {
    this.rentService.getRentByCarNumber(this.car_reg_number).subscribe(
      (rents) => {
        if (rents.length > 0) {
          this.rents = rents;
        } else {
          this.rents = [];
          this.car_reg_number = '';
          this.alertMessage = 'Vehicle Number Not Match or no rents Previously';
          this.alertType = 'danger';
        }
      }, (error) => {
      }
    )
  }

  deleteRent(r_id: number) {
    this.rentService.deleteRent(r_id).subscribe(
      () => {
        this.loadRent();
      }
    )
  }

  fillForm(r_id: number) {
    this.rentService.getRentByID(r_id).subscribe(
      (res) => {
        this.selectedrent = res;
        if (this.selectedrent) {
          this.rent = { ...this.selectedrent };
        }
      },
      (error) => {
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
      this.rentService.updateRent(this.rent).subscribe(
        (response) => {
          this.loadRent();
          this.alertMessage='Rent updated successfully';
          this.alertType='success';
          this.rent = { r_car_no: '', r_distance: '', r_end_date: '', r_price: '', r_recp_img: '', r_start_date: '' };
        },
        (error) => {
          this.alertMessage='Error updating Rent';
          this.alertType='danger';
        }
      );
    }else {
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
