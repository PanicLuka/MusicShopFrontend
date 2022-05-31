import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product!: Product;
  productId!: number;
  constructor(private productService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {

    // console.log(this.productId);


    this.productService.currentProductId
      .subscribe(productId => this.productId = productId)

    console.log(this.productId);

    this.productService.getProductById(this.productId)
      .subscribe(res => {
        // console.log(res)
        this.product = res;
        Object.assign(this.product, { quantity: 1 }, { total: this.product.productPrice })
        console.log(this.product)
      })



    // console.log(this.product);

  }

  addToCart() {
    this.cartService.addToCart(this.product)
    console.log(this.product + ' this is a product');

  }


}
