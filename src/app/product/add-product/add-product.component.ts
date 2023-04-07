import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  product: Product;
  submitted = false;
  mySub: Subscription = null;
  categories: Category[];

  constructor(private service: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      product_Name: new FormControl('', Validators.required),
      listPrice: new FormControl('', Validators.required),
      sellingPrice: new FormControl('', Validators.required),
      discount: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
    })

    this.getCategories();
  }

  addProduct() {
    this.product = this.productForm.value;

    if (this.productForm.valid) {
      this.service.create(this.product).subscribe({
        next: (data) => {
          this.submitted = true;
          console.log(data);
        },
        error: (err) => { console.log(err) },
        complete: () => {
          this.toastr.success("Product added successfully", "SUCCESS");
          this.productForm.reset();
        }
      })
    }
  }

  getCategories() {
    this.service.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => { console.log(err) }

    })
  }

  ngOnDestroy(): void {
    this.mySub?.unsubscribe();
  }
}
