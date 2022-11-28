import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PtyServer } from '@core/interfaces/pterodactyl/pty-server';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PterodactylService {
  private url = 'https://pterodactyl.file.properties/api/client';

  constructor(private http: HttpClient) {}

  public getServerList(): Observable<PtyServer> {
    return this.http.get<PtyServer>(this.url, {
      params: {
        request_type: 'pterodactyl',
      },
    });
  }
}
