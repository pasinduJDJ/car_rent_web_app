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
  selectedrent:any =null;

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
    console.log('Vehicle Registration Number:', this.car_reg_number);
    this.carService.getCarByName(this.car_reg_number).subscribe(
      response => {
        console.log('Vehicle registration number saved successfully', response);
        this.loadRent()
      },
      error => {
        console.error('Error saving vehicle registration number', error);
      }
    );
  }

  loadRent() {
    console.log(this.car_reg_number);
    this.rentService.getRentByCarNumber(this.car_reg_number).subscribe(
      (rents) => {
        if (rents.length > 0) {
          this.rents = rents;
        } else {
          console.log("please Check Vehicle Number");
          this.rents = [];
          alert("Vehicle Number Not Match or no rents Previously");
          this.car_reg_number = '';
        }
      }, (error) => {
        console.log('Error fetching rents', error)
      }
    )
  }
  
  deleteRent(r_id: number) {
    this.rentService.deleteRent(r_id).subscribe(
      ()=>{
        this.loadRent();
      }
    )
  }

  fillForm(r_id: number) {
    console.log(r_id);
    this.rentService.getRentByID(r_id).subscribe(
      (res) => {
        console.log(res);
        this.selectedrent = res;
        if (this.selectedrent) {
          this.rent = { ...this.selectedrent }; 
        }
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
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
    this.rentService.updateRent(this.rent).subscribe(
      (response) => {
        console.log(this.rent);
        console.log('Rent updated successfully', response);
        this.rent = { r_car_no: '', r_distance: '', r_end_date: '', r_price: '', r_recp_img: '', r_start_date: ''};
        this.loadRent();
      },
      (error) => {
        console.error('Error updating Rent:', error);
      }
    );
  }

}
