import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxCurrencyInputMode } from 'ngx-currency';

import { HttpProviderService } from '../services/http-provider.service';
import { IProduct } from './interfaces/product.interface';
import { CurrencyService } from '../services/currency.service';


enum SortOptions {
  nameAsc        = "Name ↑"        ,
  nameDes        = "Name ↓"        ,
  barcodeAsc     = "Barcode ↑"     ,
  barcodeDes     = "Barcode ↓"     ,
  stockAsc       = "Stock ↑"       ,
  stockDes       = "Stock ↓"       ,
  averageCostAsc = "Cost ↑"        ,
  averageCostDes = "Cost ↓"        ,
  RSPAsc         = "RSP ↑"         ,
  RSPDes         = "RSP ↓"         ,
  lastUpdatedAsc = "Last Updated ↑",
  lastUpdatedDes = "Last Updated ↓",
}

type SearchableKeys = 'name' | 'code' | 'barcode' | 'model' | 'stock' | 'averageCost' | 'rsp';


@Component({
  selector:     'app-products'             ,
  templateUrl:  './products.component.html',
  styleUrl:     './products.component.css'
})

export class ProductsComponent implements OnInit, OnDestroy {
  productList = Array<IProduct>();
  canEditProducts = true;
  productColumns: Array<keyof IProduct> = ['imageUrl' , 'name', 'code', 'barcode', 'model', 'stock', 'averageCost', 'rsp', 'lastUpdated'];
  columnHeaders: { [K in keyof IProduct]?: string } = {
    'imageUrl': '',
    'name': 'Name',
    'code': 'Code',
    'barcode': 'Barcode',
    'model': 'Model',
    'stock': 'Stock QTY',
    'averageCost': 'Avg. Cost',
    'rsp': 'RSP',
    'lastUpdated': 'Last Updated'
  };

  ngxCurrencyOptions = {
    prefix: '£ ',
    thousands: ' ',
    decimal: '.',
    allowNegative: false,
    nullable: false,
    max: 1_000_000,
    inputMode: NgxCurrencyInputMode.Financial,
    align: 'left'
  };

  options = Object.values(SortOptions);
  selectedOption = SortOptions.nameDes;
  searchQuery = '';
  selectedCurrency: string = "GBP";
  exchangeRate: number = 1;
  private subscription!: Subscription;

  constructor(private httpProvider: HttpProviderService, private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.subscription = this.currencyService.currentSelectedValue.subscribe(value => {
      this.selectedCurrency = value[0] || "GBP";
      this.exchangeRate = value[1] ;
    })
  }    

  get exchangeRateValue() {
    if (this.exchangeRate === null || this.exchangeRate === undefined || isNaN(this.exchangeRate)) {
      return 1
    } else {
      return this.exchangeRate
    }
  }

  async getAllProducts() {
    this.httpProvider.getAllProducts().subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.productList = resultData;
          this.initalizeProductSort();
        }
      }
    },
    (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.productList = Array<IProduct>();
            }
          }
        }
      });
  }

  get filteredProducts() {
    if (!this.productList) return [];
    if (!this.searchQuery) return this.productList;
    let searchQuery = this.searchQuery.toLowerCase();
    return this.productList.filter(product => {
      return (['id', 'name', 'code', 'barcode', 'model', 'stock', 'averageCost', 'RSP'] as SearchableKeys[]).some(key => {
        let value = product[key];
        if (value !== null && value !== undefined) {
          return value.toString().toLowerCase().includes(searchQuery);
        }
        return false;
      });
    });
  }

  compare(selectedKey: string) {
    let sortField = selectedKey.slice(0, -3);
    let sortOrder = selectedKey.slice(-3);
    this.productList.sort((a: IProduct, b: IProduct) => {
      let aSortField = a[sortField as keyof IProduct];
      let bSortField = b[sortField as keyof IProduct];
      if (typeof aSortField === 'number' && typeof bSortField === 'number') {
        if (aSortField != bSortField) return sortOrder === 'Asc' ? aSortField - bSortField : bSortField - aSortField;
      } else if (aSortField instanceof Date && bSortField instanceof Date) {
        if (aSortField != bSortField) return sortOrder === 'Asc' ? aSortField.getTime() - bSortField.getTime() : bSortField.getTime() - aSortField.getTime();
      }
      else {
        let aString = aSortField as String;
        let bString = bSortField as String;
        if (aString != bString) return sortOrder === 'Asc' ? aString.localeCompare(bString.toString()) : bString.localeCompare(aString.toString());
      }
      return 0;
    });
    }

  onSelectionChange(event: any) {
    let selectedValue = event.target.value;
    if (selectedValue != null) {
      let selectedKey = Object.keys(SortOptions)[Object.values(SortOptions).indexOf(selectedValue)];
      if (selectedKey != null) {
        this.compare(selectedKey);
        this.selectedOption = SortOptions[selectedKey as keyof typeof SortOptions];
      }
    }
  }

  initalizeProductSort() {
    let event = { target: { value: this.selectedOption } };
    this.onSelectionChange(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
