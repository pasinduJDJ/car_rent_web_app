import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CarService } from '../../service/car.service';

@Component({
  selector: 'app-add-maintance',
  templateUrl: './add-maintance.component.html',
  styleUrl: './add-maintance.component.css'
})
export class AddMaintanceComponent implements OnInit{

  constructor(private http: HttpClient, private carService: CarService) { }

  ngOnInit(): void {
    const today= new Date();
    this.maxDate= today.toISOString().split('T')[0];
  }
  car_reg_number: string = '';
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'success';

  maintance = {
    m_description: '',
    m_date: '',
    m_price: '',
    m_car_no: this.car_reg_number,
    m_mant_img: '',
  }

  maxDate : String='';

  findcar() {
    this.carService.getCarByName(this.car_reg_number).subscribe(
      response => {
        if (response && Array.isArray(response) && response.length > 0) {
          this.maintance.m_car_no=this.car_reg_number;
          this.alertMessage = 'Add Maintance under this Vehicle Number';
          this.alertType = 'success';
        } else {
          this.alertMessage = 'Vehicle not found Please Check again';
          this.alertType = 'danger';
        }
      },
      error => {
        this.alertMessage = 'Vehicle not found Please Check again-';
        this.alertType = 'danger';
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
    if (this.maintance.m_description && this.maintance.m_date && this.maintance.m_price && this.maintance.m_mant_img) {
      this.http.post('http://localhost:8083/maintains', this.maintance)
        .subscribe(response => {
          this.alertMessage = 'Maintenance record added successfully';
          this.alertType = 'success';
          this.resetForm();
        }, error => {
          this.alertMessage = 'Failed to add maintenance record';
          this.alertType = 'danger';
        });
    } else {
      this.alertMessage = 'Please fill out all fields correctly.';
      this.alertType = 'danger';
    }
  }

  resetForm() {
    this.maintance = { m_description: '', m_date: '', m_price: '', m_car_no: this.car_reg_number, m_mant_img: '' };
    this.car_reg_number = '';
  }

}
