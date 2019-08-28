import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private configUrl: string = './assets/index-trader.json';

  constructor(
    private http: HttpClient
  ) { }

  getMarketData() {
    return this.http.get(this.configUrl);
  }
}
