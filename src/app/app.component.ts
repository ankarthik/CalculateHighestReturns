import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // ng build --prod --base-href https://ankarthik.github.io/CalculateHighestReturns/
  // ngh --dir=dist/CalculateHighestReturns

  title = 'calculateHighestReturns';
  data: any[];

  highestIndex: number = 0;
  lowestIndex: number = 0;
  eligibleHighestIndex: number = 0;

  buyingPrice: number;
  buyingDate: number;
  sellingPrice: number;
  sellingDate: number;

  constructor(
    private http: HttpService
  ) {
    this.getData();
  }

  getData() {
    this.http.getMarketData().subscribe((data: []) => {
      this.data = data["data"];
      this.calculateDates();
    });
  }

  calculateDates() {
    for(let i = 0; i < this.data.length; i++) {
      if(i > 0) {
        if (this.data[this.lowestIndex].low > this.data[i].low) {
          this.lowestIndex = i;
        }
        if (this.data[this.highestIndex].high < this.data[i].high) {
          this.highestIndex = i;
          if (this.data[this.highestIndex].quote_date >= this.data[this.lowestIndex].quote_date) {
            this.eligibleHighestIndex = i;
          }
        }
      }
    }
    this.buyingDate = this.data[this.lowestIndex].quote_date;
    this.buyingPrice = this.data[this.lowestIndex].low;
    
    this.sellingDate = this.data[this.eligibleHighestIndex].quote_date;
    this.sellingPrice = this.data[this.eligibleHighestIndex].high;
  }

}
