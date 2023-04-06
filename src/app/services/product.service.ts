import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

const baseUrl: string = 'https://localhost:7234/api/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<Product[]>(baseUrl);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<Product>(`${baseUrl}/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<Category[]>(baseUrl + "/CategoryList");
  }

  create(product: Product): Observable<any> {
    return this.http.post(baseUrl, product);
  }

  update(product: Product): Observable<any> {
    return this.http.put(baseUrl, product);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
