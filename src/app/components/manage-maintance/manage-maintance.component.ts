import { Component, OnInit } from '@angular/core';
import { CarService } from '../../service/car.service';
import { MaintanceService } from '../../service/maintance.service';

@Component({
  selector: 'app-manage-maintance',
  templateUrl: './manage-maintance.component.html',
  styleUrl: './manage-maintance.component.css'
})
export class ManageMaintanceComponent implements OnInit {

  car_reg_number: string = '';
  maintances:any []=[];
  selectedmaintances:any =null;
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'success';

  maintance = {
    m_description:'',
    m_date:'',
    m_price:'',
    m_car_no:this.car_reg_number,
    m_mant_img:'',
  }

  constructor(private carService: CarService, private maintainService:MaintanceService) { }

  ngOnInit(): void {
  }

  loadMaintance() {
    console.log(this.car_reg_number);
    this.maintainService.getMaintanceByCarNumber(this.car_reg_number).subscribe(
      (maintances)=>{
        if(maintances.length>0){
          this.maintances = maintances;
        }else{
          this.maintances = [];
          this.car_reg_number = '';
          this.alertMessage = 'Vehicle Number Not Match or no rents Previously';
          this.alertType = 'danger';
        }  
      },(error) =>{
        console.log('Error fetching Maintance',error)
      }
    )
  }

  findcar() {
    console.log('Vehicle Registration Number:', this.car_reg_number);
    this.carService.getCarByName(this.car_reg_number).subscribe(
      response => {
        console.log('Vehicle registration number saved successfully', response);
        this.loadMaintance()
      },
      error => {
        console.error('Error saving vehicle registration number', error);
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

  fillForm(m_id:number){
    console.log(m_id);
    this.maintainService.getMaintanceById(m_id).subscribe(
      (res) => {
        console.log(res);
        this.selectedmaintances = res;
        if (this.selectedmaintances) {
          this.maintance = { ...this.selectedmaintances }; 
        }
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
      }
    );
  }

  onSubmit() {
    if (this.maintance.m_description && this.maintance.m_date && this.maintance.m_price && this.maintance.m_mant_img) {
      this.maintainService.updateMaintance(this.maintance).subscribe(
        (response) => {
          console.log(this.maintance);
          this.maintance = { m_description: '', m_date: '', m_price: '', m_car_no: '', m_mant_img: ''};
          this.loadMaintance();
          this.alertMessage='Maintance updated successfully';
          this.alertType='success';
          window.location.reload();
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

  deleteMinatnce(m_id :number) {
    this.maintainService.deleteMaintance(m_id).subscribe(
      ()=>{
        this.loadMaintance();
      }
    )
  }

}
