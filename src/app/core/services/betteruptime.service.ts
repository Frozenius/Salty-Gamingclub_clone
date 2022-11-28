import { Injectable } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BetteruptimeService {
  url = environment.betterUptimeApiUrl;
  uptimeStream: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {}

  public initUptime(): Subscription {
    return interval(1000).subscribe(() => {
      this.http.get<BetteruptimeResponse>(this.url, { headers: { Bearer: environment.betterUptimeApiKey } }).subscribe({
        next: (response: any) => {
          this.uptimeStream.next(response.data.priceUsd);
        },
      });
    });
  }
}

interface BetteruptimeResponse {
  data: [
    id: string,
    type: string,
    attributes: {
      url: string;
      pronouncable_name: string;
      monitor_type: string;
      monitor_group_id: string;
      last_check_at: string;
      status: string;
      required_keyword: string;
      verify_ssl: boolean;
      check_frequency: number;
      call: boolean;
      sms: boolean;
      email: boolean;
      push: boolean;
      team_wait: unknown;
      http_method: string;
      request_timeout: number;
      revovery_period: number;
      request_headers: unknown;
    }
  ];
  pagination: {
    first: string;
    last: string;
    prev: unknown;
    next: string;
  };
}
