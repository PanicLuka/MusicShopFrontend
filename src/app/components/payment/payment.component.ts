import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/models/Basket';
import { DestinationAddress } from 'src/app/models/destination-address';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // public basket!: Basket;
  products: Product[] = [];
  address!: DestinationAddress;
  basketId!: number;
  // key!: string;
  constructor(private paymentService: PaymentService, private toastr: ToastrService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {

    // for (let i = 2; i < localStorage.length; i++) {
    //   let product = localStorage.getItem('product' + ' ' + i);
    //   console.log()
    //   this.products.push(JSON.parse(product!));
    // }

    // var keys = Object.keys(localStorage);
    // // console.log(keys);

    // for (let i = 0; i < keys.length; i++) {
    //   let key = keys[i];
    //   if (key === 'address' || key === '__paypal_storage__' || 'JWT_NAME') {
    //     continue;
    //   }
    //   var product = localStorage.getItem(key!)
    //   // console.log(JSON.parse(product!));


    //   this.products.push(JSON.parse(product!));

    this.cartService.getCurrentBasketProducts()
      .subscribe(res => {
        this.products = res;
      })



    // }

    // this.basket = {
    //   items: this.products

    // }

    // console.log(this.basket.items)

    // this.basket.items = this.products;


    // console.log(this.basket.items);


    // var add = localStorage.getItem('address');
    // this.address = JSON.parse(add!);


    // console.log(this.basket.items)
    // this.order.totalPrice = 400;
    // console.log(this.products);
    // console.log(this.products);
  }


  createPayment() {
    this.cartService.getCurrentBasket()
      .subscribe(res => {
        this.basketId = res;
        // console.log(this.basketId);
        this.paymentService.createPaymentIntent(this.basketId)
          .subscribe(res => {
            this.toastr.success('Payment intent created!')
          }), (err: Error) => {
            console.log(err.message + ' ' + err.name);
          }

      })



    this.router.navigate(['/checkout']);
  }



}
