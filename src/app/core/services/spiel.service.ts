import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { ToastService } from './toast.service';
import { Genre, Plattform, Spiel } from '@core/interfaces/spiel';

@Injectable({
  providedIn: 'root',
})
export class SpielService {
  private authUrl = environment.url_cyved + '/ident/';
  private spieleURL: string = this.authUrl + 'Spiel';
  private genreURL: string = this.authUrl + 'Genre';
  private plattformURL: string = this.authUrl + 'Plattform';
  private spielerAccountURL: string = this.authUrl + 'SpielerAccount';
  private spielBrowserURL: string = this.authUrl + 'SpielBrowser';

  private spielBrowser: string | null = null;

  constructor(private toast: ToastService, private http: HttpClient) {}

  public getSpiele(): Observable<any> {
    return this.http.get<any>(this.spieleURL, { params: { request_type: 'cyved' } }).pipe(
      map((response) => response.ids),
      mergeMap((ids: any[]) => forkJoin(ids.map((id) => this.getSpiel(id))))
    );
  }

  private getSpiel(id: string): Observable<Spiel> {
    return this.http.get<Spiel>(this.spieleURL + '/' + id, { params: { request_type: 'cyved' } }).pipe(
      map((data: Spiel) => {
        return data;
      })
    );
  }

  public getGenres(): Observable<any> {
    return this.http.get<any>(this.genreURL, { params: { request_type: 'cyved' } }).pipe(
      map((response) => response.ids),
      mergeMap((ids: any[]) => forkJoin(ids.map((id) => this.getGenre(id))))
    );
  }

  private getGenre(id: string): Observable<any> {
    return this.http.get<any>(this.genreURL + '/' + id, { params: { request_type: 'cyved' } }).pipe(
      map((data: Genre) => {
        return data;
      })
    );
  }

  public getPlattforms(): Observable<any> {
    return this.http.get<any>(this.plattformURL, { params: { request_type: 'cyved' } }).pipe(
      map((response) => response.ids),
      mergeMap((ids: any[]) => forkJoin(ids.map((id) => this.getPlattform(id))))
    );
  }

  private getPlattform(id: string): Observable<any> {
    return this.http.get<any>(this.plattformURL + '/' + id, { params: { request_type: 'cyved' } }).pipe(
      map((data: Plattform) => {
        return data;
      })
    );
  }

  public getSpielerAccounts(): Observable<any> {
    return this.http.get<any>(this.spielerAccountURL, { params: { request_type: 'cyved' } }).pipe(
      map((response) => response.ids),
      mergeMap((ids: any[]) => forkJoin(ids.map((id) => this.getSpielerAccount(id))))
    );
  }

  private getSpielerAccount(id: string): Observable<any> {
    return this.http.get<any>(this.spielerAccountURL + '/' + id, { params: { request_type: 'cyved' } }).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  private getSpielBrowser(): any {
    if (this.spielBrowser == null) {
      this.http.get<any>(this.spielBrowserURL, { params: { request_type: 'cyved' } }).subscribe({
        next: (spielBrowser) => {
          console.log('spielBrowser');
          console.log(spielBrowser.ids[0]);
          return (this.spielBrowser = spielBrowser.ids[0]);
        },
      });
    } else {
      return this.spielBrowser;
    }
  }

  public getSpieleliste(): Observable<any> {
    var bla = `{
      "benutzer": {
        "class": "klassen.Benutzer",
          "entrys": [
            "ab9wEgj3mDmE1HeGw26rem8gCTw6m9tf0pwoM8xMkX7WR0A3jnkp6hVyl6z0bS1pW",
            "EE0WQfv0TU872zzaO2PTE48qDis6eiWj016nn8xWaj7dH5u3xMXO6Zn2n6dmiF1zL"
          ]
      }
    }`;

    return this.http.post<any>(this.spielerAccountURL + '/' + this.getSpielBrowser(), { params: { request_type: 'cyved' }, title: bla }).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
