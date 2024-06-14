import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ICurrencyAPIResponse {
  result: string | null,
  documentation: string,
  terms_of_use: string,
  time_last_update_unix: string,
  time_last_update_utc: string,
  time_next_update_unix: string,
  time_next_update_utc: string,
  base_code: string,
  target_code: string,
  conversion_rate: number
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private selectedValue = new BehaviorSubject<[string, number]>([ "GBP", 1 ]);
  currentSelectedValue = this.selectedValue.asObservable();
  currencyAPIConversionRate: number | null = null;

  constructor(private http: HttpClient) { }

  changeSelectedValue(value: string) {
    const baseUrl = environment.currencyApi.apiBaseUri;
    const apiKey = environment.currencyApi.apiKey;
    let url = baseUrl + apiKey + "/pair/GBP/" + value
    this.http.get<ICurrencyAPIResponse>(url)
      .subscribe({
        next: data => {
          this.currencyAPIConversionRate = data.conversion_rate;
          if (this.currencyAPIConversionRate != null) {
            this.selectedValue.next([ value, this.currencyAPIConversionRate ]);
          } else {
            this.selectedValue.next([ "GBP", 1 ]);
          }
        },
        error: error => {
          this.handleError(error);
        }
      })
  }
  private handleError(error: any) {
    return throwError(error);
  }
}
