import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL = environment.musicShop_URL;

  constructor(private httpClient: HttpClient) { }

  public getProducts(pageSize: number, pageNumber: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.URL}/api/products`, {
      params: {
        pageSize: pageSize,
        pageNumber: pageNumber
      }
    })
  }

  public getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.URL}/api/products/${productId}`);
  }

}
