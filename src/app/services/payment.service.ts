import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket } from '../models/Basket';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private basketSource = new BehaviorSubject<Basket>({ products: [] });

  URL = environment.musicShop_URL;

  constructor(private httpClient: HttpClient, private cartService: CartService) {
  }




  public createPaymentIntent(basketId: number) {
    return this.httpClient.post(`${this.URL}/api/payments/${basketId}`, {})
      .pipe(
        map((basket: any) => {
          this.basketSource.next(basket);
        })
      )

  }



}
