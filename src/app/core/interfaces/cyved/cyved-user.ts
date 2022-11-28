export interface CyvedUser {
  anmeldename: string;
  class: string | 'klassen.Benutzer';
  id: string;
  locked: boolean;
  mailadresse: string;
  vorname: string;
  nachname: string;
  apps: any | null;
  digitaleSignatur: any | null;
  gruppen: any | null;
  shorthistory: any | null;
  spezifischeRechte: any | null;
}

export interface CyvedAccountData {
  user: CyvedUser;
}
