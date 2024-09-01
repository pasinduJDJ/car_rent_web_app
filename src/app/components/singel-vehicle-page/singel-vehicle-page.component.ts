import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../service/car.service';
import { MaintanceService } from '../../service/maintance.service';
import { RentService } from '../../service/rent.service';

@Component({
  selector: 'app-singel-vehicle-page',
  templateUrl: './singel-vehicle-page.component.html',
  styleUrl: './singel-vehicle-page.component.css'
})
export class SingelVehiclePageComponent implements OnInit {

  constructor(private route:ActivatedRoute , private carService:CarService ,private maintainService: MaintanceService, private rentService:RentService){}

  car_id: number | null = null; 
  car:any = null;
  car_no: string | undefined ;
  maintances:any []=[];
  rents: any[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.car_id = +id; 
      console.log(this.car_id);
      this.loadCarData();
    }
  }

  loadCarData() {
    if (this.car_id !== null) {
      console.log('Vehicle Registration Number:', this.car_id);
      this.carService.getCarById(this.car_id).subscribe(
        (response) => {
          this.car = response;
          console.log(this.car);
          // Save the car registration number to local storage
          if (this.car && this.car.car_reg_no) {
            this.car_no=this.car.car_reg_no;
            this.loadMaintainData(this.car_no);
            this.loadRentData(this.car_no);
          }
        },
        error => {
          console.error('Error loading car Data', error);
        }
      );
    } else {
      console.error('Car ID is null');
    }
  }
  

  loadMaintainData(car_reg_number:any) {
    console.log(car_reg_number);
    this.maintainService.getMaintanceByCarNumber(car_reg_number).subscribe(
      (maintances)=>{
        if(maintances.length>0){
          this.maintances = maintances;
        }else{
          console.log("please Check Vehicle Number");
          this.maintances = [];
          alert("Vehicle Number Not Match or no Maintances");
        }  
      },(error) =>{
        console.log('Error fetching Maintance',error)
      }
    )
  }
  
  loadRentData(car_reg_no:any){
    this.rentService.getRentByCarNumber(car_reg_no).subscribe(
      (rents) => {
        if (rents.length > 0) {
          this.rents = rents;
        } else {
          console.log("please Check Vehicle Number");
          this.rents = [];
          alert("Vehicle Number Not Match or no rents Previously");
        }
      }, (error) => {
        console.log('Error fetching rents', error)
      }
    )
  }

}