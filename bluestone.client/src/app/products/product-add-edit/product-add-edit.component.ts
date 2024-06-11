import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/product.interface';
import { HttpProviderService } from '../../services/http-provider.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.css'
})
export class ProductAddEditComponent implements OnInit {
  productId: string | null = null;
  currentProduct: IProduct | null = null;
  productForm = new FormGroup({
    imageUrl: new FormControl(''),
    name: new FormControl(''),
    code: new FormControl(''),
    barcode: new FormControl(''),
    model: new FormControl(''),
    stock: new FormControl(''),
    averageCost: new FormControl(''),
    rsp: new FormControl(''),
  });
  formattedAmount: number | string | null = null;
  amount: number | string | null = null;
  addOrSave: "Add Product" | "Save Changes" | "" = "";

  constructor(private route: ActivatedRoute, private httpProvider: HttpProviderService, private currencyPipe: CurrencyPipe) { }

  ngOnInit() {

    this.productId = this.route.snapshot.paramMap.get('productId');

    if (this.productId != null) {
      this.addOrSave = "Save Changes";
      this.getProduct(this.productId)
    } else {
      this.addOrSave = "Add Product";
    }
    
  }

  async getProduct(productID: string) {
    this.httpProvider.getProduct(productID).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.currentProduct = resultData;
          console.log(resultData);
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

  onSubmit() {
    console.log(this.productForm.value);
  }

  transformAmount(element: any) {
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '£');

    element.target.value = this.formattedAmount;
  }
}
