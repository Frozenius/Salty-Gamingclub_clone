import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { ToastService } from '@core/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { SteamGameList } from '@core/interfaces/steam/steam-game-list';

@Injectable({
  providedIn: 'root',
})
export class SteamGameService {
  private steamUrl = environment.url_steam;
  private apiKey = environment.key_steam;

  constructor(private http: HttpClient, private toast: ToastService) {}

  public getGamesBySteamId(steamId: string): void {
    const url: string = this.steamUrl + '/IPlayerService/GetOwnedGames/v0001/?key=' + this.apiKey + '&steamid=' + steamId + '&format=json';
    this.http.get<any>(url).subscribe({
      next: (r) => {
        const response: SteamGameList = r.response;
        console.dir(response);
      },
    });
  }
}
