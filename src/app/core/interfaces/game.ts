export class Steamgame {
  showDialog: boolean;
  plattform: string[];

  constructor(public title: string, public steamid: string, public img_icon_url: string) {}
}

export interface game {
  id: string;
  title: string;
  gamelink?: gamelink;
  logo?: string;
  logo_url?: string;
  dedicated?: boolean;
  maxPlayer?: number;
  minPlayer?: number;
}

interface gamelink {
  plattform: plattform;
  gameId: string;
  url?: string;
}

interface plattform {
  name: string;
  logo?: string;
  logo_url?: string;
}
