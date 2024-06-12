import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private selectedValue = new BehaviorSubject<{ [key: string]: number }>({ "£": 1 });
  currentSelectedValue = this.selectedValue.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedValue(value: string) {
    const url = "https://xecdapi.xe.com/v1/convert_from.json/?from=GBP&to=USD&amount=1";
    const apiKey = "<Insert Currency Service API key here>";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + apiKey
      })
    };
    this.http.get(url, httpOptions)
    .subscribe(response => {
      let rate = response;
      this.selectedValue.next({value : Number(rate)});
    })
  }
}
