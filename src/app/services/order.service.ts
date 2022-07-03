import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL = environment.musicShop_URL;
  constructor(private httpClient: HttpClient) { }

  public createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.URL}/api/orders`, order);
  }

  public pay(order: Order): Observable<string> {
    return this.httpClient.post<string>(`${this.URL}/api/orders/pay`, order)
  }
}
