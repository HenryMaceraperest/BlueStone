import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private selectedValue = new BehaviorSubject<{ [key: string]: number }>({ "£": 1 });
  currentSelectedValue = this.selectedValue.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedValue(value: string) {
    const baseUrl = environment.currencyApi.apiBaseUri;
    const apiKey = environment.currencyApi.apiKey;
    let url = baseUrl + apiKey + "/pair/GBP/" + value
    this.http.get(url)
    .subscribe(response => {
      let rate = response;
      this.selectedValue.next({value : Number(rate)});
    })
  }
}
