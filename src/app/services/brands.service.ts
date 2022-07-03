import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient: HttpClient) { }

  private URL = environment.musicShop_URL;

  public getBrands(pageSize: number, pageNumber: number): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${this.URL}/api/brands`, {
      params: {
        pageSize: pageSize,
        pageNumber: pageNumber
      }
    });
  }

  public getBrandById(brandId: number): Observable<Brand> {
    return this.httpClient.get<Brand>(`${this.URL}/api/brands/${brandId}`);
  }

  public getBrandIdByBrandName(brand: String): Observable<number> {
    return this.httpClient.get<number>(`${this.URL}/api/brands/brand/${brand}`);
  }

  public createBrand(brand: Brand): Observable<Brand> {
    return this.httpClient.post<Brand>(`${this.URL}/api/brands`, brand);
  }
}
