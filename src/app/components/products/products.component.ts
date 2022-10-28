import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/product.service';
import { ValueService } from '../../services/value.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  rta = '';

  constructor(
    private productService: ProductsService,
    private valueService: ValueService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productService.getAll(this.limit, this.offset).subscribe({
      next: (prod) => {
        this.products = [...this.products, ...prod];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: (error) => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000);
      },
    });
  }

  async callPromise() {
    const rta = await this.valueService.getPromise();
    this.rta = rta;
  }
}
