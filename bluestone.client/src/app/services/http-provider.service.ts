import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlueStoneApiService } from '../services/blue-stone-api.service';
import { IProduct } from '../products/interfaces/product.interface';
import { IProductAddEdit } from '../products/interfaces/product-add-edit.interface';

var apiUrl = "https://localhost:7046"

var httpLink = {
  getAllProducts: apiUrl + "/api/Product/all",
  getProduct: apiUrl + "/api/Product/",
  addProduct: apiUrl + "/api/Product/Add",
  updateProduct: apiUrl + "/api/Product/Update",
  archiveProduct: apiUrl + "/api/Product/Archive/"
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

  public addProduct(product: IProductAddEdit): Observable<any> {
    return this.blueStoneApiService.addProduct(httpLink.addProduct, product)
  }

  public updateProduct(product: IProductAddEdit): Observable<any> {
    return this.blueStoneApiService.updateProduct(httpLink.updateProduct, product)
  }

  public archiveProduct(productId: number): Observable<any> {
    return this.blueStoneApiService.archiveProduct(httpLink.archiveProduct + productId)
  }
}
