import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productId!: number;
  productList!: Product[];
  public productCount!: number;
  searchKey: string = "";
  constructor(private categoryService: CategoryService, private productService: ProductsService, private cartService: CartService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.productService.getProducts(6, 2)
      .subscribe(response => {
        this.productList = response;

        this.productList.forEach((a: Product) => {
          Object.assign(a, { quantity: 1, total: a.productPrice });
        })

        this.productList.forEach((a: Product) => {
          this.categoryService.getCategoryById(a.categoryId)
            .subscribe(res => {
              a.category = res.categoryName;
              console.log('is a category of a ' + a.category)
            })
        })
        // console.log(this.productList)

        // console.log(this.productCount + "is a number of items in cart")
        this.cartService.search.subscribe((val: any) => {
          this.searchKey = val;
        })
      })

    this.productService.currentProductId
      .subscribe(productId => this.productId = productId)


  }

  addToCart(item: Product) {
    this.cartService.addToCart(item)

  }

  public viewProduct(itemId: number) {
    this.router.navigate(['/viewProduct']);

    this.productService.changeProductId(itemId);
    // this.productId = itemId;
  }



  // clickEvent() {
  //   console.log(this.productService.getProductById(1))

  // }

}
