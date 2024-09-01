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
          console.log("please Check Vehicle Number");
          this.maintances = [];
          alert("Vehicle Number Not Match or no Maintances");
          this.car_reg_number = '';
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
    this.maintainService.updateMaintance(this.maintance).subscribe(
      (response) => {
        console.log(this.maintance);
        console.log('Maintance updated successfully', response);
        this.maintance = { m_description: '', m_date: '', m_price: '', m_car_no: '', m_mant_img: ''};
        this.loadMaintance();
      },
      (error) => {
        console.error('Error updating Maintance:', error);
      }
    );
  }

  deleteMinatnce(m_id :number) {
    this.maintainService.deleteMaintance(m_id).subscribe(
      ()=>{
        this.loadMaintance();
      }
    )
  }

}
