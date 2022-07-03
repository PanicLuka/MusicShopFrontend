import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Basket } from 'src/app/models/Basket';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  public basket!: Basket;
  public products: Product[] = []
  public grandTotal: number = 0;
  constructor(private cartService: CartService, private router: Router) { }



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
      }), (error: Error) => {
        console.log(error.name + ' ' + error.message);

      }

    this.products.forEach((p: Product) => {
      delete p.productId
    })

    this.basket = {
      products: this.products
    }


    // console.log(this.basket.products);

    // this.products = this.cartService.getCartProducts();

  }

  removeCartItem(item: Product) {
    localStorage.removeItem('product' + ' ' + item.productId);
    this.cartService.removeCartItem(item)
  }

  emptyCart() {
    // this.cartService.getCartProducts()
    //   .subscribe(res => {
    //     const length = res.length;
    //     // console.log(length + ' is a length');
    // for(let i = 0;i<length;i++){
    //   localStorage
    // }


    //   })
    this.cartService.removeAllCartItems();
  }

  showProduct(): boolean {
    if (this.products.length > 0) {
      return true;
    }
    return false;
  }

  dontShowProduct(): boolean {
    if (this.products.length == 0) {
      return true;
    }
    return false;
  }

  toCheckout() {
    this.cartService.storeBasket(this.basket)
      .subscribe(res => {
        console.log();

      })

    this.router.navigate(['/payment'])
  }

  goToHomePage() {
    this.router.navigate(['/home'])
  }

  public createImgPath = (serverPath: String) => {

    return `http://localhost:5000/${serverPath}`;
  }
  // increaseQuantity(item: Product) {


  //   item.quantity++;
  //   item.total = item.quantity * item.productPrice;



  // }

  // decreaseQuantity(item: Product) {
  //   if (item.quantity > 1) {
  //     item.quantity--;
  //   }
  //   else {
  //     return;
  //   }
  //   item.total = item.quantity * item.productPrice;

  // }
}
