import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpProviderService } from '../../services/http-provider.service';
import { IProductAddEdit } from '../interfaces/product-add-edit.interface';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.css'
})
export class ProductAddEditComponent implements OnInit {
  productId: string | null = null;
  currentProduct: IProductAddEdit | null = null;
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

  constructor(private route: ActivatedRoute, private httpProvider: HttpProviderService, private router: Router) { }

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
          this.fillProductForm();
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

  async addProduct() {
    this.httpProvider.addProduct(this.currentProduct!).subscribe((data: any) => {
      this.router.navigate(['/products']);
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

  async updateProduct() {
    this.httpProvider.updateProduct(this.currentProduct!).subscribe((data: any) => {
      this.router.navigate(['/products']);
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
    this.getProductFromForm();
    if (this.addOrSave == 'Save Changes') {
      this.updateProduct()
    } else {
      this.addProduct()
    }
  }

  fillProductForm() {
    this.productForm.patchValue({
      imageUrl    : this.currentProduct?.imageUrl,
      name        : this.currentProduct?.name,
      code        : this.currentProduct?.code,
      barcode     : this.currentProduct?.barcode,
      model       : this.currentProduct?.model,
      stock       : this.currentProduct?.stock?.toString(),
      averageCost : this.currentProduct?.averageCost?.toString(),
      rsp         : this.currentProduct?.rsp?.toString(),
    });    
  }

  getProductFromForm() {
    let avgCostValue = this.getNumberValueFromString('averageCost', true);
    let rspValue = this.getNumberValueFromString('rsp', true);

    this.currentProduct = {
      id: this.currentProduct?.id ?? undefined,
      imageUrl: this.productForm.get('imageUrl')?.value ?? '',
      name: this.productForm.get('name')?.value ?? '',
      code: this.productForm.get('code')?.value ?? '',
      barcode: this.productForm.get('barcode')?.value ?? '',
      model: this.productForm.get('model')?.value ?? '',
      stock: Number(this.productForm.get('stock')?.value) ?? 0,
      averageCost: avgCostValue ?? 0,
      rsp: rspValue ?? 0
    }
  }

  getNumberValueFromString(givenString: string, getFromProductForm: boolean): number {
    let numValue = 0;
    if (getFromProductForm) {
      let formString = this.productForm.get(givenString)?.value;
      if (formString != null) {
        numValue = Number(formString.replace('£', ''));
      }
    }
    else {
      numValue = Number(givenString);
    }
    return numValue;    
  }
}
