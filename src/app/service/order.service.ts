import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:8081/api/orders';

  constructor(private http: HttpClient) { }

  getOrders(page: number = 1): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    return this.http.get<any>(this.apiUrl, { params, withCredentials: true });
  }

  getOrderDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  updateStatus(orderId: number, status: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/status?status=${status}`, {}, { withCredentials: true });
  }
}
