import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CyvedAccountService {
  private authUrl = environment.url_cyved + '/ident/';
  private benutzerURL: string = this.authUrl + 'Benutzer';

  constructor(private http: HttpClient) {}

  public getAllBenutzer(): Observable<any> {
    return this.http.get<any>(this.benutzerURL, { params: { request_type: 'cyved' } }).pipe(
      map((response) => response.ids),
      mergeMap((ids: any[]) => forkJoin(ids.map((id) => this.getBenutzerinfo(id))))
    );
  }

  private getBenutzerinfo(id: string): Observable<any> {
    return this.http.get<any>(this.benutzerURL + '/' + id, { params: { request_type: 'cyved' } }).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
