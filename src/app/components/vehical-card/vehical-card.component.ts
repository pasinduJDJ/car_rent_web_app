import { Component, Input } from '@angular/core';
import { CarService } from '../../service/car.service';

@Component({
  selector: 'app-vehical-card',
  templateUrl: './vehical-card.component.html',
  styleUrl: './vehical-card.component.css'
})
export class VehicalCardComponent {

  constructor(private carService: CarService){}

  @Input('vehical') vehical:any;

  @Input() car_id:number=0;
  @Input() car_reg_no:string='';
  @Input() car_brand:string='';
  @Input() car_model:string='';
  @Input() car_type:string='';
  @Input() car_manufacture_year:number=0;
  @Input() car_img:string='';

}
