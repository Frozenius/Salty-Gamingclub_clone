export interface Spiel {
  id: string;
  name: string;
  // game_id?: String;
  dedicated?: boolean;
  maxPlayer?: number;
  minPlayer?: number;
  logo_url?: string;
  logo?: string;
  thumbnail_url?: string;
  thumbnail?: string;
  Genre?: Array<Genre>;
  plattform?: Array<Plattform>;
  showDialog?: boolean;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Plattform {
  id: string;
  name: string;
  browser_shop_url?: string;
  run_url?: string;
  application_shop_url?: string;
  key?: string;
}
