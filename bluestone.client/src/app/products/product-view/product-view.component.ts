import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../interfaces/product.interface';
import { HttpProviderService } from '../../services/http-provider.service';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit {
  productId: string | null = null;
  currentProduct: IProduct | null = null;
  selectedCurrency: string = "GBP";
  exchangeRate: number = 1;
  private subscription!: Subscription;

  constructor(private route: ActivatedRoute, private httpProvider: HttpProviderService, private router: Router, private currencyService: CurrencyService) { }

  ngOnInit() {

    this.productId = this.route.snapshot.paramMap.get('productId');

    if (this.productId != null) {
      this.getProduct(this.productId)
    } else {
      this.currentProduct = null;
    }
    this.subscription = this.currencyService.currentSelectedValue.subscribe(value => {
      this.selectedCurrency = value[0] || "GBP";
      this.exchangeRate = value[1] || 1;
    })

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

  onDeleteClick() {
    if (this.currentProduct?.id != null && this.currentProduct?.id != undefined) {
      this.httpProvider.archiveProduct(this.currentProduct.id).subscribe((data: any) => {
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
    else {
      // product doesnt have an id 
    }
  }
}
