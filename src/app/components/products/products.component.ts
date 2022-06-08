import { Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { BrandsService } from 'src/app/services/brands.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  productId!: number;
  productList!: Product[];
  public productCount!: number;
  searchKey: string = "";
  filterTerm!: string;
  filterKey: string = "";
  productSubscription!: Subscription

  pageSize = 6;
  _pageNumber = 1;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;


  constructor(private brandService: BrandsService, private categoryService: CategoryService, private productService: ProductsService,
    private cartService: CartService,
    private router: Router) {
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this._pageNumber = event.pageIndex + 1;
    this.loadData();
  }

  ngOnInit(): void {

    this.loadData();

  }

  // ngOnDestroy(): void {
  //   this.productSubscription.unsubscribe();
  // }

  loadData() {
    this.productService.getProductsCount()
      .subscribe((count: number) => {
        this.productCount = count;
      })


    this.productService.getProducts(this._pageNumber, this.pageSize)
      .subscribe(response => {
        this.productList = response;
        console.log(this.pageSize + ' ' + this._pageNumber)

        this.productList.forEach((a: Product) => {
          Object.assign(a, { quantity: 1, total: a.productPrice });
        }), (error: Error) => {
          console.log(error.name + ' ' + error.message);
        }

        this.productList.forEach((a: Product) => {
          this.categoryService.getCategoryById(a.categoryId)
            .subscribe(res => {
              a.category = res.categoryName;
              // console.log('is a category of a ' + a.category)
            })
        }), (error: Error) => {
          console.log(error.name + ' ' + error.message);
        }

        this.productList.forEach((a: Product) => {
          this.brandService.getBrandById(a.brandId)
            .subscribe(res => {
              a.brand = res.brandName;
              // console.log('is a category of a ' + a.category)
            })
        }), (error: Error) => {
          console.log(error.name + ' ' + error.message);
        }


        // console.log(this.productList)

        // console.log(this.productCount + "is a number of items in cart")
        this.cartService.search.subscribe((val: any) => {
          this.searchKey = val;
        })

        // this.cartService.filter.subscribe((val: any) => {
        //   this.filterKey = val;
        //   console.log(this.filterKey + 'is a filter')
        // })
      })

    this.productService.currentProductId
      .subscribe(productId => this.productId = productId)



  }

  addToCart(item: Product) {
    // localStorage.setItem('products', JSON.stringify(item));

    this.cartService.addToCart(item);

  }

  getAllProducts() {

    this.productService.getProducts(this._pageNumber, this.pageSize)
      .subscribe(response => {
        this.productList = response;


      }), (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }

  }

  categorizeProducts(category: string) {
    this.productService.getProductsByCategory(category)
      .subscribe(res => {
        if (res.length > 0) {
          this.productList = res;

        } else {
          return;
        }
      }), (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }

    // console.log(category + 'this is category');
  }



  public viewProduct(itemId: number) {
    this.router.navigate(['/viewProduct']);

    this.productService.changeProductId(itemId);
    // this.productId = itemId;
  }

  public get productsCount(): number {
    return this.productCount;
  }


  public createImgPath = (serverPath: string) => {
    // const url = `http://localhost:5000/api/${serverPath}`;
    // console.log(url + ' is a URL');
    return `http://localhost:5000/${serverPath}`;
  }

  // filterByCategory(category: string) {
  //   this.filterTerm = category;
  //   // (event.target as HTMLInputElement).value;
  //   // console.log(this.searchTerm);

  //   // console.log('this is category ' + this.filterTerm)
  //   this.cartService.filter.next(this.filterTerm);
  // }

  // clickEvent() {
  //   console.log(this.productService.getProductById(1))

  // }

}
