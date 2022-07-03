import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket } from '../models/Basket';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  index!: any;
  public cartItemList: Product[] = []
  public productList = new BehaviorSubject<Product[]>([]);
  public search = new BehaviorSubject<string>("");
  public URL = environment.musicShop_URL;

  constructor(private httpClient: HttpClient) { }

  getCartProducts() {
    // console.log(this.productList)

    return this.productList.asObservable();

  }

  setCartProducts(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: Product) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    // console.log(this.cartItemList);

  }

  getTotalPrice() {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.index = this.cartItemList.findIndex(e => e.productId === product.productId);
    // console.log(this.index);

    this.cartItemList.splice(this.index, 1);

  }
  removeAllCartItems() {
    // console.log(this.cartItemList);
    for (let i = 0; i < this.cartItemList.length; i++) {
      let j = this.cartItemList[i].productId;
      localStorage.removeItem('product' + ' ' + j);
    }

    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
  increaseQuantity(productId: number) {
    let product = this.cartItemList.find(item => {
      item.productId == productId
    })
    // console.log('this is the prodcut ' + product);

  }

  public storeBasket(basket: Basket): Observable<Basket> {
    return this.httpClient.post<Basket>(`${this.URL}/api/baskets`, basket);
  }

  public getBasketById(basketId: number): Observable<Basket> {
    return this.httpClient.get<Basket>(`${this.URL}/api/baskets/${basketId}`);
  }


  public getCurrentBasket(): Observable<number> {

    return this.httpClient.get<number>(`${this.URL}/api/baskets/current`);

  }

  public resetCustomerBasket(basketId: number): Observable<Basket> {
    return this.httpClient.delete<Basket>(`${this.URL}/api/baskets/${basketId}`);
  }

  public getCurrentBasketProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.URL}/api/customerProducts`);
  }

}
