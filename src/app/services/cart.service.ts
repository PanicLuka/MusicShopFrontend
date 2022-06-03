import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  index!: any;
  public cartItemList: Product[] = []
  public productList = new BehaviorSubject<Product[]>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

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
    console.log(this.cartItemList);

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
    console.log(this.index);

    this.cartItemList.splice(this.index, 1);

  }
  removeAllCartItems() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
  increaseQuantity(productId: number) {
    let product = this.cartItemList.find(item => {
      item.productId == productId
    })
    console.log('this is the prodcut ' + product);

  }
}
