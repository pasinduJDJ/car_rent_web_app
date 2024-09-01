import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarService } from '../../service/car.service';

@Component({
  selector: 'app-add-maintance',
  templateUrl: './add-maintance.component.html',
  styleUrl: './add-maintance.component.css'
})
export class AddMaintanceComponent {

  constructor(private http: HttpClient, private carService: CarService) { }
  car_reg_number: string = '';

  maintance = {
    m_description: '',
    m_date: '',
    m_price: '',
    m_car_no: this.car_reg_number,
    m_mant_img: '',
  }

  findcar() {
    console.log('Vehicle Registration Number:', this.car_reg_number);
    this.carService.getCarByName(this.car_reg_number).subscribe(
      response => {
        if (response && Array.isArray(response) && response.length > 0) {
          // Assuming the response contains the car details
          console.log('Vehicle registration number found:', response);
          this.maintance.m_car_no = this.car_reg_number; // Set the car registration number
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
        this.maintance.m_mant_img = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log(this.maintance);
    this.http.post('http://localhost:8083/maintains', this.maintance)
      .subscribe(response => {
        console.log('Maintains added:', response);
        this.maintance = { m_description: '', m_date: '', m_price: '', m_car_no: '', m_mant_img: ''};
        this.car_reg_number='';
      });
  }

}
