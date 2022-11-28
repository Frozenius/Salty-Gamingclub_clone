import { SteamGame } from '@core/interfaces/steam/steam-game';

export interface SteamGameList {
  game_count: number;
  games: SteamGame[];
}
