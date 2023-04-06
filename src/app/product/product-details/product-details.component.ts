import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  canDelete = false;
  mySub: Subscription = null;

  constructor(private service: ProductService, private activedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: (val) => {
        const id = Number(val.get("id"));
        this.getProductById(id);
      },
      error: (err) => { console.log(err) }
    });

  }

  getProductById(id: number) {
    this.service.getProduct(id).pipe(catchError(error => {
      const statusCode = error.status;
      statusCode == 404 ? this.route.navigate(['404']) : null;
      return throwError(error);
    }))
      .subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onDelete() {
    this.service.delete(this.product.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.route.navigate(['/products']);
      }
    })
  }

  enableDelete() {
    this.canDelete = true;
  }

  ngOnDestroy(): void {
    this.mySub?.unsubscribe();
  }
}

