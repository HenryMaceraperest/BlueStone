import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlueStoneApiService } from '../services/blue-stone-api.service';
import { IProduct } from '../products/interfaces/product.interface';

var apiUrl = "https://localhost:7046"

var httpLink = {
  getAllProducts: apiUrl + "/api/product/all",
  getProduct: apiUrl + "/api/product/",
  addProduct: apiUrl + "api/product/add",
  updateProduct: apiUrl + "api/product/update",
  archiveProduct: apiUrl + "api/product/archive"
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

  public addProduct(product: IProduct): Observable<any> {
    return this.blueStoneApiService.addProduct(httpLink.addProduct, product)
  }

  public updateProduct(product: IProduct): Observable<any> {
    return this.blueStoneApiService.updateProduct(httpLink.updateProduct, product)
  }

  public archiveProduct(productId: number): Observable<any> {
    return this.blueStoneApiService.archiveProduct(httpLink.archiveProduct, productId)
  }
}
