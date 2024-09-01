import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RentResponse{
  "r_id": number,
  "r_start_date": String,
  "r_end_date": String,
  "r_distance": number,
  "r_price": number,
  "r_recp_img": String,
}

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private httpClient:HttpClient) { }

  private apiUrl ='http://localhost:8083/rents';
  private specUrl ='http://localhost:8083';

  saveRent(formData: FormData) {
    return this.httpClient.post(this.apiUrl, formData);
  }

  getRent(): Observable<any>{
    return this.httpClient.get(this.apiUrl);
  }

  getRentByID(id:number){
    const url = this.apiUrl + "/" + id;
    return this.httpClient.get(url);
  }

  updateRent(car :object){
    return this.httpClient.put(this.apiUrl,car);
  }

  deleteRent(id :number){
    const url = this.apiUrl + "/" + id;
    return this.httpClient.delete(url);
  }
  
  getRentByCarNumber(car_reg_no:string): Observable<any>{
    const url =this.specUrl + "/rent?r_car_no="+car_reg_no;
    return this.httpClient.get(url);
  }

}
