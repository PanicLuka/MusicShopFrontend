import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList!: Product[];
  constructor(private productService: ProductsService) {
  }

  ngOnInit(): void {

    this.productService.getProducts(6, 2)
      .subscribe(response => {
        this.productList = response;
        console.log(this.productList)

      })

  }

  // clickEvent() {
  //   console.log(this.productService.getProductById(1))

  // }

}
