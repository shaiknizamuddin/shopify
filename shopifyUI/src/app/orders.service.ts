import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private headers: HttpHeaders = new HttpHeaders();
  private fetchServiceUrl = `http://localhost:3000/api/v1/order/fetch`;
  private updateServiceUrl = `http://localhost:3000/api/v1/order/update`;
  constructor(public _http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }


  fetchOrders(): Observable<any> {
    return this._http.get(`${this.fetchServiceUrl}`, { headers: this.headers });
  }

  updateOrder(data) {
    const obj = {
      email: data.email,
      phone: data.phone
    }
    return this._http.put(`${this.updateServiceUrl}/${data.id}`, obj , {headers: this.headers});
  }
}
