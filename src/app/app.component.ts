import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculateHighestReturns';
  
  constructor(
    private http: HttpClient
  ) { 
    this.http.get("https://modularfinance.se/static/files/puzzles/index-trader.json?callback=func").subscribe((res) => {
      console.log(res);
    });
  }
}
