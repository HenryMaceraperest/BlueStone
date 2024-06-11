import { Component, OnInit } from '@angular/core';

import { HttpProviderService } from '../services/http-provider.service';
import { IProduct } from './interfaces/product.interface';

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

type SearchableKeys = 'id' | 'name' | 'code' | 'barcode' | 'model' | 'stock' | 'averageCost' | 'RSP';


@Component({
  selector:     'app-products'             ,
  templateUrl:  './products.component.html',
  styleUrl:     './products.component.css'
})

export class ProductsComponent implements OnInit {
  productList = Array<IProduct>();
  canEditProducts = true;
  productColumns: Array<keyof IProduct> = ['id', 'name', 'code', 'barcode', 'model', 'stock', 'averageCost', 'RSP', 'lastUpdated'];
  options = Object.values(SortOptions);
  selectedOption = SortOptions.nameDes;
  searchQuery = '';

  constructor(private httpProvider: HttpProviderService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts() {
    this.httpProvider.getAllProducts().subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.productList = resultData;
          console.log(resultData);
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
      if (selectedKey != null) this.compare(selectedKey)
    }
  }
}