import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCreate } from '../models/product-create';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productId = new BehaviorSubject<number>(1)

  currentProductId = this.productId.asObservable();
  private URL = environment.musicShop_URL;


  constructor(private httpClient: HttpClient) { }

  changeProductId(productId: number) {
    this.productId.next(productId);
  }

  public getProducts(_pageNumber: number, pageSize: number,): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.URL}/api/products`, {
      params: {
        _pageNumber: _pageNumber,
        pageSize: pageSize
      }
    })
  }

  public getProductsCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.URL}/api/products/count`);
  }

  public getProductsByCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.URL}/api/products/filter/${category}`);
  }


  public getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.URL}/api/products/${productId}`);
  }

  public createProduct(product: ProductCreate): Observable<ProductCreate> {
    return this.httpClient.post<ProductCreate>(`${this.URL}/api/products`, product);
  }



}
