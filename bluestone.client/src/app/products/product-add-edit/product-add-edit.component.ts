import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/product.interface';
import { HttpProviderService } from '../../services/http-provider.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.css'
})
export class ProductAddEditComponent implements OnInit {
  productId: string | null = null;
  currentProduct: IProduct | null = null;
  constructor(private route: ActivatedRoute, private httpProvider: HttpProviderService) { }

  ngOnInit() {

    this.productId = this.route.snapshot.paramMap.get('productId');

    if (this.productId) {
      // Edit product

    } else {
      // Add new product
    }
  }

  async getProduct(productID: string) {
    this.httpProvider.getProduct(productID).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.currentProduct = resultData;
        }
      }
    },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.currentProduct = null;
            }
          }
        }
      });
  }
}
