import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: Product[] = []
  public grandTotal: number = 0;
  constructor(private cartService: CartService) { }



  ngOnInit(): void {
    this.cartService.getCartProducts()
      .subscribe(res => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
        // this.products.forEach((a: Product) => {
        //   a.total = a.productPrice * a.quantity
        // })
        // console.log(this.grandTotal)
        // console.log(this.products + 'is a product')
      })


  }

  removeCartItem(item: Product) {
    this.cartService.removeCartItem(item)
  }

  emptyCart() {
    this.cartService.removeAllCartItems();
  }

  increaseQuantity(item: Product) {


    item.quantity++;
    item.total = item.quantity * item.productPrice;



  }

  decreaseQuantity(item: Product) {
    if (item.quantity > 1) {
      item.quantity--;
    }
    else {
      return;
    }
    item.total = item.quantity * item.productPrice;

  }
}
