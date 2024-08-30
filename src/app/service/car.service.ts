import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CarResponse{
  "car_id": number;
  "car_reg_no": string;
  "car_brand": string;
  "car_model": string;
  "car_type": string;
  "car_manufacture_year": number;
  "car_img": any;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl ='http://localhost:8083/cars'

  constructor(private httpClient :HttpClient) { }

  saveCar(car:object){
    console.log(car);
    return this.httpClient.post(this.apiUrl,car);
  }

  getCar(){
    return this.httpClient.get(this.apiUrl);
  }

  getCarById(id:number){
    const url = this.apiUrl + "/" + id;
    return this.httpClient.get(url);
  }

  updateCar(car :object){
    return this.httpClient.put(this.apiUrl,car);
  }

  deleteCar(id :number){
    const url = this.apiUrl + "/" + id;
    return this.httpClient.delete(url);
  }
  
  getCarByName(car_reg_no:string){
    const url =this.apiUrl + "/cars?car_reg_no="+car_reg_no;
    return this.httpClient.get(url);
  }
}