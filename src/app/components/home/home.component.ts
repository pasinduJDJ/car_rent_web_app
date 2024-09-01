import { Component, OnInit } from '@angular/core';
import { CarResponse, CarService } from '../../service/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(private carService: CarService){}

  vehicles:CarResponse[] = [];

  ngOnInit(): void {
    this.loadVehicle();
  }

  loadVehicle(){
    this.carService.getCar().subscribe((res:any)=>{
      console.log(res);
      this.vehicles=res;
    })
  }

}
