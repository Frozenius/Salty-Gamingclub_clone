import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { from, map, Observable } from 'rxjs';
import { CyvedUser } from '@core/interfaces/cyved/cyved-user';

@Injectable({
  providedIn: 'root',
})
export class CyvedGruppenService {
  private homeUrl = environment.url_cyved;

  constructor(private http: HttpClient) {}

  public extractGruppen(user: Observable<CyvedUser>) {
    const groups: any[] = [];
    user.subscribe({
      next: (userData) => {
        userData.gruppen.entrys.forEach((entry) => {
          this.getGruppe(entry.id).pipe(
            map((gruppe) => {
              groups.push(gruppe);
            })
          );
        });
      },
    });
    return from(groups);
  }

  private getGruppe(id: string) {
    return this.http.get(this.homeUrl + '/gruppe/' + id, { params: { request_type: 'cyved' } }).pipe(
      map((gruppe) => {
        return gruppe;
      })
    );
  }
}
