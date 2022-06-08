import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCreate } from 'src/app/models/product-create';
import { Product } from 'src/app/models/product.model';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productName!: string;
  productDescription!: string;
  productPrice!: number;
  categoryId!: number;
  brandId!: number;
  employeeId!: number;
  product!: ProductCreate;
  brandName!: string;
  categoryName!: string;
  response!: { dbPath: '' };




  constructor(private categoryService: CategoryService,
    private productService: ProductsService,
    private brandService: BrandsService,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    console.log();


  }



  onCreate = () => {


    this.brandService.getBrandIdByBrandName(this.brandName)
      .subscribe(res => {
        this.brandId = res;

        this.categoryService.getCategoryIdByCategoryName(this.categoryName)
          .subscribe(res => {
            this.categoryId = res;

            this.product = {
              productName: this.productName,
              productDescription: this.productDescription,
              productPrice: this.productPrice,
              imgPath: this.response.dbPath,
              categoryId: this.categoryId,
              brandId: this.brandId,
              employeeId: this.employeeId
            }

            this.productService.createProduct(this.product)
              .subscribe(res => {
                console.log(res);
              }), (error: Error) => {
                console.log(error.name + ' ' + error.message);
              }
          })


      })





  }



  uploadFinished = (event: any) => {
    this.response = event;
  }

  // public createImgPath = (serverPath: string) => {
  //   return `http://localhost:5000/api/${serverPath}`;
  // }



}
