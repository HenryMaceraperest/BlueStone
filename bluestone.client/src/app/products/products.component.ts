import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { HttpProviderService } from '../services/http-provider.service';
import { IProduct } from './interfaces/product.interface';
import { ISorting } from './interfaces/productSorting.interface';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productList = Array<IProduct>();
  canEditProducts = true;
  filter = new FormControl('', { nonNullable: true });
  productColumns: Array<keyof IProduct> = ['id', 'name', 'code', 'barcode', 'model', 'stock', 'averageCost', 'RSP', 'lastUpdated'];
  sorting: ISorting = {
    column: 'id',
    order: 'asc'
  }
  constructor(private httpProvider: HttpProviderService) {
  }
 
  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts() {
    this.httpProvider.getAllProducts(this.sorting).subscribe((data: any) => {
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

  isDescendingSorting(column: string) {
    return this.sorting.column === column && this.sorting.order === 'desc';
  }

  isAscendingSorting(column: string) {
    return this.sorting.column === column && this.sorting.order === 'asc';
  }

  sortTable(column: keyof IProduct): void{
    const futureSortingOrder = this.isDescendingSorting(column) ? 'asc' : 'desc';
    this.sorting.order = futureSortingOrder;
    this.compare(column, futureSortingOrder);
  }

  compare(sortType: keyof IProduct, ascDesc:'asc' | 'desc') {
    this.productList.sort((a: IProduct, b: IProduct) => {
      let comparison = 0;

      if (sortType === 'lastUpdated') {
        let dateA = new Date(a[sortType]);
        let dateB = new Date(b[sortType]);
        comparison = dateA.getTime() < dateB.getTime() ? -1 : dateA.getTime() > dateB.getTime() ? 1 : 0;
      }
      else if (typeof a[sortType] === 'number' || typeof a[sortType] === 'string') {
        comparison = a[sortType] < b[sortType] ? -1 : a[sortType] > b[sortType] ? 1 : 0;
      }        

      return ascDesc === 'asc' ? comparison : -comparison;
    });
  }
}
