import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  private URL = environment.musicShop_URL;

  public getCategories(pageSize: number, pageNumber: number): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.URL}/api/categories`, {
      params: {
        pageSize: pageSize,
        pageNumber: pageNumber
      }
    });
  }

  public getCategoryById(categoryId: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.URL}/api/categories/${categoryId}`)
  }

  public getCategoryIdByCategoryName(categoryName: string): Observable<number> {
    return this.httpClient.get<number>(`${this.URL}/api/categories/category/${categoryName}`);
  }
}
