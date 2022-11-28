export interface GameServer {
  game: string;
  servers: Array<Server>;
}

interface Server {
  name: string;
  ip: string;
  port: number;
  status: boolean;
  map?: string;
  customText?: string;
}
