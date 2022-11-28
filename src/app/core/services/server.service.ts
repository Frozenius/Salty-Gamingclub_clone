import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CyvedServer } from '@core/interfaces/cyved/cyved-server';
import { map, mergeMap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private _jsonURL = 'assets/json/server.json';

  constructor(private http: HttpClient) {}

  public getAllServer() {
    return this.http.get<CyvedServer>(this._jsonURL).pipe(
      map((server) => server.platforms),
      mergeMap((platforms) => platforms.map((platform) => platform.games)),
      mergeMap((games) => games.map((game) => game.servers)),
      mergeMap((servers) => servers),
      toArray()
    );
  }

  public getServerByPlatform(platform: string) {
    return this.http.get<CyvedServer>(this._jsonURL).pipe(
      map((server) => {
        return server.platforms.find((p) => p.name === platform.toLowerCase());
      }),
      mergeMap((platform) => platform!.games.map((game) => game.servers)),
      mergeMap((servers) => servers),
      toArray()
    );
  }

  public getServerByPlatformAndGame(platform: string, game: string) {
    return this.http.get<CyvedServer>(this._jsonURL).pipe(
      map((server) => {
        return server.platforms.find((p) => p.name === platform.toLowerCase());
      }),
      mergeMap(async (platform) => platform!.games.find((g) => g.name === game.toLowerCase())),
      mergeMap((game) => game!.servers),
      toArray()
    );
  }
}
