import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MaintanceResponse{
  "m_id":number,
  "m_description": string;
  "m_date": string;
  "m_price": number;
  "m_car_no": string;
  "m_mant_img": string;
}

@Injectable({
  providedIn: 'root'
})
export class MaintanceService {

  constructor(private httpClient :HttpClient) { }

  private apiUrl ='http://localhost:8083/maintains';
  private specapiUrl ='http://localhost:8083';

  saveMaintance(formData: FormData) {
    return this.httpClient.post(this.apiUrl, formData);
  }

  getMaintance(): Observable<any>{
    return this.httpClient.get(this.apiUrl);
  }
  getMaintanceById(id:number){
    const url = this.apiUrl + "/" + id;
    return this.httpClient.get(url);
  }

  updateMaintance(maintance :object){
    return this.httpClient.put(this.apiUrl,maintance);
  }

  deleteMaintance(id :number){
    const url = this.apiUrl + "/" + id;
    return this.httpClient.delete(url);
  }
  
  getMaintanceByCarNumber(car_reg_no:string): Observable<any>{
    const url =this.specapiUrl + "/maintains?m_car_no="+car_reg_no;
    return this.httpClient.get(url);
  }
}
