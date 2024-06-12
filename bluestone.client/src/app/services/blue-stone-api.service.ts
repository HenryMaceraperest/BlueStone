import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IProduct } from '../../app/products/interfaces/product.interface';
import { IProductAddEdit } from '../products/interfaces/product-add-edit.interface';

@Injectable({
  providedIn: 'root'
})

export class BlueStoneApiService {
  constructor(private httpClient: HttpClient) { }

  getProducts(url: string): Observable<IProduct> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
      observe: "response" as 'body'
    };
    return this.httpClient.get<IProduct[]>(
      url,
      httpOptions
    )
    .pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    )
  }

  getProduct(url: string): Observable<IProduct> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
      observe: "response" as 'body'
    };
    return this.httpClient.get<IProduct>(
      url,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      )
  }

  addProduct(url: string, product: IProductAddEdit): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': '*/*',
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(
      url,
      product,
      httpOptions
      )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)      
        );
  }

  updateProduct(url: string, product: IProductAddEdit): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.patch(url, product, httpOptions)
      .pipe(
          map((response: any) => this.ReturnResponseData(response)),
          catchError(this.handleError)
          );
  }

  archiveProduct(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.patch(url, httpOptions)
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  private ReturnResponseData(response: any) {
    return response;
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
