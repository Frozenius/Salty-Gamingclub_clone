export interface Roles {
  admin?: boolean;
  user?: boolean;
  dev?: boolean;
}

export interface UserLocked {
  locked?: boolean;
  reason?: string;
}

export interface Account {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  avatar_url?: string;
  vorname?: string;
  nachname?: string;
  password?: any;
  mcId?: string;
  dcId?: string;
  steamId?: number;
  roles: Roles;
  provider?: string;
  locked: UserLocked;
}
