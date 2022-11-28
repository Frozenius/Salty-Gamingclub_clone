import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subject, Subscription } from 'rxjs';
import { SubscriptionManager } from '@core/classes/subscription-manager';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  private url = 'https://api.coincap.io/v2/assets/bitcoin';
  bitcoinStream: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {}

  public initBitcoin(): Subscription {
    return interval(1000).subscribe(() => {
      this.http.get(this.url).subscribe({
        next: (response: any) => {
          this.bitcoinStream.next(response.data.priceUsd);
        },
      });
    });
  }
}
