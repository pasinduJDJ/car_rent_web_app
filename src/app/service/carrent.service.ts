import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface CarRentResponse {
  "rentcar_id": number;
  "car_reg_no": String;
  "rent_payment": number;
  "pay_date": String;
  "month": String;
  "payment_bill": string;
}

@Injectable({
  providedIn: 'root'
})
export class CarrentService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = "http://localhost:8083/rentCars"
  private specapiUrl = "http://localhost:8083"

  saveRentCar(formData: FormData) {
    return this.httpClient.post(this.apiUrl, formData)
  }

  getRentCar(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  getRentCarByID(id: number) {
    const url = this.apiUrl + "/" + id;
    return this.httpClient.get(url);
  }

  updateRentCar(rentcar: object) {
    return this.httpClient.put(this.apiUrl, rentcar);
  }

  deleteRentCar(id: number) {
    const url = this.apiUrl + "/" + id;
    return this.httpClient.delete(url);
  }
  getRentCarByCarNumber(car_reg_no: String): Observable<any> {
    const url = this.specapiUrl + "/rentCars?car_reg_no="+car_reg_no;
    return this.httpClient.get(url);
  }
}
