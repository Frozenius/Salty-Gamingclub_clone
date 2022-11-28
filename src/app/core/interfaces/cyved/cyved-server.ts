export interface CyvedServer {
  author: string;
  description: string;
  lastEdit: string;
  editBy: string;
  platforms: Platform[];
}

interface Platform {
  name: string;
  games: Game[];
}

interface Game {
  name: string;
  servers: Server[];
}

interface Server {
  logo: string;
  name: string;
  ip: string;
  port: number;
  description: string;
  longDescriptions: string[];
}
