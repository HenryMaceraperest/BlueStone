import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlueStoneApiService } from '../services/blue-stone-api.service';
import { IProduct } from '../products/interfaces/product.interface';

var apiUrl = "https://localhost:7046"

var httpLink = {
  getAllProducts: apiUrl + "/api/product/all",
  getProduct: apiUrl + "/api/product/"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private blueStoneApiService: BlueStoneApiService) { }

  public getAllProducts(): Observable<IProduct> {
    return this.blueStoneApiService.getProducts(httpLink.getAllProducts);
  }

  public getProduct(productID: string): Observable<IProduct> {
    return this.blueStoneApiService.getProduct(httpLink.getProduct + productID);
  }
}
