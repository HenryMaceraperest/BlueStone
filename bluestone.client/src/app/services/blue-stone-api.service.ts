import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IProduct } from '../../app/products/interfaces/product.interface';

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

  addProduct(url: string, product: IProduct): Observable<any> {
    return this.httpClient.post(
      url,
      product)
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)      
        );
  }

  updateProduct(url: string, product: IProduct): Observable<any> {
    return this.httpClient.patch(url, product)
      .pipe(
          map((response: any) => this.ReturnResponseData(response)),
          catchError(this.handleError)
          );
  }

  archiveProduct(url: string, productID: number): Observable<any> {
    return this.httpClient.patch(url, productID)
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
