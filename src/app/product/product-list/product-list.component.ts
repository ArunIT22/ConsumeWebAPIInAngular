import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[];
  mySub: Subscription = null;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.mySub = this.service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => { console.log(err) }
    })
  }

  ngOnDestroy(): void {
    this.mySub?.unsubscribe();
  }

}
