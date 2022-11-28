import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Account } from '@core/interfaces/account';
import { ToastService } from '@core/services/toast.service';
import { AccountService } from '@core/services/account.service';
import { AuthService } from '@core/services/auth.service';
import { SpielService } from '@core/services/spiel.service';
import { Genre, Plattform, Spiel } from '@core/interfaces/spiel';
import { CyvedAccountService } from '@core/services/cyved/cyved-account.service';
import { AuthCyvedService } from '@core/services/cyved/auth-cyved.service';
import { FadeInGrow } from '@public/animations/spielleiter.animation';
import { FadeInGrowStagger } from '@public/animations/spielleiter.animation';
import { environment } from '@environment/environment';
import { SubscriptionManager } from '@core/classes/subscription-manager';

@Component({
  selector: 'sgc-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss'],
  animations: [FadeInGrow, FadeInGrowStagger],
})
export class GameSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  dev: boolean = !environment.production;

  user: Account | null;
  accounts: Account[];
  // cyvedAccounts: any[] = [];
  cyvedAccounts: any[];
  myCyvedAccount: any;

  siteLoading: boolean = true;
  siteStatus: string = 'loading';
  siteLoadingCount: number;
  siteLoadingCountFinished: number;
  siteLoadingCountError: number;
  loadingPercent: number;
  error: boolean = false;

  // spiele: any[] = [];
  spiele: any[];
  // genres: Genre[] = [];
  genres: Genre[];
  // plattforms: Plattform[] = [];
  plattforms: Plattform[];
  // spielerAccounts: any[] = [];
  spielerAccounts: any[];
  // spielerBrowser: any[] = [];

  // spieleFromSelectedAccounts: any[] = [];
  spieleFromSelectedAccounts: any[];
  spieleUniqueFromSelectedAccounts = new Set<string>();
  spieleWithSpielerAccount = new Map<string, string[]>();
  spieleWithCount = new Map<number, any[]>();

  // filterSelectedAccounts: Account[] = [];
  // filterSelectedCyvedAccounts: any[] = [];
  filterSelectedCyvedAccounts: any[];
  // filterSelectedGenres: Genre[] = [];
  filterSelectedGenres: Genre[];
  // filterSelectedPlattforms: Plattform[] = [];
  filterSelectedPlattforms: Plattform[];

  view: boolean = false;
  // viewSpiele: any[] = [];
  viewSpiele: any[];
  // viewSortAnzahl: any[] = [];
  viewSortAnzahl: any[];
  viewSortAnzahlSelected: number;
  viewSortAnzahlMax: number;
  // viewSortOptionSelected: string = 'spiel.averageTierlist';
  viewSortOptionSelected: string;
  // viewSortOptions: object = [
  //   { label: 'A - Z', value: 'spiel.name' },
  //   { label: 'Z - A', value: '!spiel.name' },
  //   { label: 'fehlt Spieleranzahl hoch - tief', value: 'spiel.minPlayers' },
  //   { label: 'fehlt Spieleranzahl tief - hoch', value: 'spiel.maxPlayers' },
  //   { label: 'Tierlist hoch - tief', value: 'spiel.averageTierlist' },
  //   { label: 'Tierlist tief - hoch', value: '!spiel.averageTierlist' },
  // ];
  viewSortOptions: Array<object>
  viewSortOrder: number;
  viewSortField: string;

  private subscriptionManager: SubscriptionManager = new SubscriptionManager();

  constructor(
    private toastService: ToastService,
    private accountService: AccountService,
    private authService: AuthService,
    private spielService: SpielService,
    private benutzerService: CyvedAccountService,
    private authCyvedService: AuthCyvedService,
  ) {
    this.init();
    this.connect();
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribeAll();
  }

  ngAfterViewInit() { }

  private init() {
    //Listen initialisieren/zurücksetzen
    this.accounts = [];
    this.cyvedAccounts = [];
    this.filterSelectedCyvedAccounts = [];
    this.filterSelectedGenres = [];
    this.filterSelectedPlattforms = [];
    this.genres = [];
    this.loadingPercent = 0;
    this.myCyvedAccount = null;
    this.plattforms = [];
    this.siteLoadingCount = 0;
    this.siteLoadingCountError = 0;
    this.siteLoadingCountFinished = 0;
    this.siteStatus = 'loading';
    this.spiele = [];
    this.spieleFromSelectedAccounts = [];
    this.spieleUniqueFromSelectedAccounts.clear();
    this.spieleWithCount.clear();
    this.spieleWithSpielerAccount.clear();
    this.spielerAccounts = [];
    this.user = null;
    this.view = false;
    this.viewSortAnzahl = [];
    this.viewSortAnzahlMax = 0;
    this.viewSortAnzahlSelected = 0;
    this.viewSortField = '';
    this.viewSortOptionSelected = 'spiel.averageTierlist';
    this.viewSortOptions = [
      { label: 'A - Z', value: 'spiel.name' },
      { label: 'Z - A', value: '!spiel.name' },
      { label: 'fehlt Spieleranzahl hoch - tief', value: 'spiel.minPlayers' },
      { label: 'fehlt Spieleranzahl tief - hoch', value: 'spiel.maxPlayers' },
      { label: 'Tierlist hoch - tief', value: 'spiel.averageTierlist' },
      { label: 'Tierlist tief - hoch', value: '!spiel.averageTierlist' },
    ];
    this.viewSortOrder = 0;
    this.viewSpiele = [];
  }

  public connect() {
    // this.authService.user$.subscribe({
    //   next: (user) => {
    //     this.user = user;
    //     if (user != null) {
    //       this.filterSelectedAccounts = [user];
    //     }
    //   }
    // });

    this.siteLoadingCount++;
    this.subscriptionManager.addNewSubscription(
      this.benutzerService.getAllBenutzer().subscribe({
        next: (accounts) => {
          this.cyvedAccounts = accounts;
        },
        error: () => {
          this.error = true;
          this.siteStatus = 'error';
        },
        complete: () => {
          this.siteLoadingCountFinished++;
          this.checkLoading();
        },
      })
    );

    this.siteLoadingCount++;
    this.subscriptionManager.addNewSubscription(
      this.authCyvedService.getUser().subscribe({
        next: (myAccount) => {
          this.myCyvedAccount = myAccount;
          if (myAccount != null) {
            this.filterSelectedCyvedAccounts = [myAccount];
          }
        },
        error: () => {
          this.error = true;
          this.siteStatus = 'error';
        },
        complete: () => {
          this.siteLoadingCountFinished++;
          this.checkLoading();
        },
      })
    );

    this.siteLoadingCount++;
    this.subscriptionManager.addNewSubscription(
      this.spielService.getSpielerAccounts().subscribe({
        next: (spielerAccounts) => {
          this.spielerAccounts = spielerAccounts;
        },
        error: () => {
          this.error = true;
          this.siteStatus = 'error';
        },
        complete: () => {
          this.siteLoadingCountFinished++;
          this.checkLoading();
        },
      })
    );

    this.accountService.accounts$.subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
    });

    this.siteLoadingCount++;
    this.subscriptionManager.addNewSubscription(
      this.spielService.getSpiele().subscribe({
        next: (spiele) => {
          this.spiele = spiele;
        },
        error: () => {
          this.error = true;
          this.siteStatus = 'error';
        },
        complete: () => {
          this.siteLoadingCountFinished++;
          this.checkLoading();
        },
      })
    );

    this.siteLoadingCount++;
    this.subscriptionManager.addNewSubscription(
      this.spielService.getSpiele().subscribe({
        next: (spiele) => {
          this.spiele = spiele;
        },
        error: () => {
          this.error = true;
          this.siteStatus = 'error';
        },
        complete: () => {
          this.siteLoadingCountFinished++;
          this.checkLoading();
        },
      })
    );

    this.siteLoadingCount++;
    this.subscriptionManager.addNewSubscription(
      this.spielService.getGenres().subscribe({
        next: (genres) => {
          this.genres = genres;
        },
        error: () => {
          this.error = true;
          this.siteStatus = 'error';
        },
        complete: () => {
          this.siteLoadingCountFinished++;
          this.checkLoading();
        },
      })
    );

    this.siteLoadingCount++;
    this.subscriptionManager.addNewSubscription(
      this.spielService.getPlattforms().subscribe({
        next: (platform) => {
          this.plattforms = platform;
        },
        error: () => {
          this.error = true;
          this.siteStatus = 'error';
        },
        complete: () => {
          this.siteLoadingCountFinished++;
          this.checkLoading();
        },
      })
    );

    // this.siteLoadingCount++;
    // this.spielService.getSpieleliste()
    //   .subscribe({
    //     next: (spielerBrowser) => {
    //       this.spielerBrowser = spielerBrowser;
    //     },
    //     error: () => {
    //       this.error = true;
    //     },
    //     complete: () => {
    //       this.siteLoadingCountFinished++;
    //       this.checkLoading()
    //     }
    //   });
  }

  public checkLoading() {
    // Loading Variante 1
    let percent = Math.floor((100 / this.siteLoadingCount) * this.siteLoadingCountFinished);
    this.loadingPercent = percent == 100 ? 99 : percent;
    console.log(this.siteLoadingCount + ' / ' + this.siteLoadingCountFinished + ' = ' + percent + ' / ' + this.loadingPercent);

    if (this.siteLoadingCount == this.siteLoadingCountFinished) {
      this.loadingPercent = 100;
      setTimeout(() => {
        this.siteLoading = false;
        this.siteStatus = '';

        // this.loadingPercent = 0;
      }, 1500);
    }

    // Loading Variante 2
    // this.loadingPercent = Math.floor((100 / this.siteLoadingCount) * this.siteLoadingCountFinished);
    // if (this.siteLoadingCount == this.siteLoadingCountFinished)
    //   this.siteLoading = false;
  }

  public start() {
    if (this.getSelectedAccountLenght() < 2) {
      this.toastService.info('Bitte mindestens Zwei Accounts auswählen');
      return;
    }
    this.masterAlgorithmus();

    // Sortierung init
    let max = -1;
    for (const key of this.spieleWithCount.keys()) {
      this.viewSortAnzahl.push(key);
      if (key > max) max = key;
    }
    this.viewSortAnzahlSelected = max;
    this.viewSortAnzahlMax = max;

    this.setSpieleList(max);
    this.view = true;

    setTimeout(() => {
      this.jumpToAnchor('spiele');
    }, 270);
  }

  public jumpToAnchor(anchorName) {
    let el = document.getElementById(anchorName);
    var top = el!.offsetTop; //Getting Y of target element
    window.scrollTo(0, top); //Go there directly or some transition
  }

  private masterAlgorithmus() {
    this.init()
    //Alle Spiele von SpielerAccounts
    let ids: any[] = [];
    this.filterSelectedCyvedAccounts.forEach((benutzer) => {
      ids.push(benutzer.id);
    });
    console.log(ids);

    this.spielerAccounts.forEach((spielerAccount) => {
      if (ids.includes(spielerAccount.benutzer.id)) {
        var spieleListe: string[] = [];
        spielerAccount.spiele.entrys.forEach((spiel) => {
          spieleListe.push(spiel.id);
        });
        this.spieleWithSpielerAccount.set(spielerAccount.player_id, spieleListe);
        // Alle Spiele in zwei Listen (unique und nicht unique)
        spielerAccount.spiele.entrys.forEach((spiele) => {
          this.spieleFromSelectedAccounts.push(spiele.id);
          this.spieleUniqueFromSelectedAccounts.add(spiele.id);
        });
      }
    });

    // Fügt Spiele in die Liste, der jeweiligen Anzahl hinzu.
    this.spieleUniqueFromSelectedAccounts.forEach((spielId) => {
      let count = this.spieleFromSelectedAccounts.filter((x) => x == spielId).length;
      if (this.spieleWithCount.has(count)) {
        var spieleListe: any[] = [];
        spieleListe.push.apply(spieleListe, this.spieleWithCount.get(count));
        spieleListe.push(this.getSpielObject(spielId));
        this.spieleWithCount.set(count, spieleListe);
      } else {
        var spieleListe: any[] = [];
        spieleListe.push(this.getSpielObject(spielId));
        this.spieleWithCount.set(count, spieleListe);
      }
    });
    //this.spieleWithCount = new Map([...this.spieleWithCount.entries()].sort().reverse());
  }

  private getSpielObject(spielId: string) {
    var spielobj = this.getSpielWithId(spielId);
    var plattformListe: any[] = [];
    spielobj.plattforms.entrys.forEach((plattform) => {
      plattformListe.push(this.getPlattformWithId(plattform.key.id, plattform.value));
    });

    var genreListe: any[] = [];
    spielobj.genres.entrys.forEach((genre) => {
      genreListe.push(this.getGenreWithId(genre.id));
    });

    return {
      id: spielId,
      spiel: spielobj,
      plattforms: plattformListe,
      genres: genreListe,
      spieler: this.getSpielerAccountsWithSpielId(spielId),
    };
  }

  public getSpielWithId(spielId: string): any {
    return this.spiele.find((obj) => {
      return obj.id === spielId;
    });
  }

  private getSpielerAccountsWithSpielId(spielId: string): any {
    var spieler = new Set<string>();
    var keineSpieler = new Set<string>();
    this.spieleWithSpielerAccount.forEach((value: string[], key: string) => {
      if (value.findIndex((x) => x == spielId) >= 0) {
        spieler.add(key);
      } else {
        keineSpieler.add(key);
      }
    });

    var out = new Map();
    out.set('yes', spieler);
    out.set('no', keineSpieler);

    return out;
  }

  private getPlattformWithId(plattformId: string, plattformValue: string): any {
    return this.plattforms.find((obj) => {
      obj.key = plattformValue;
      return obj.id === plattformId;
    });
  }

  private getGenreWithId(genreId: string): any {
    return this.genres.find((obj) => {
      return obj.id === genreId;
    });
  }

  public findIdInArray(array, id) {
    return array.find((obj) => obj.id === id);
  }

  public getListFromMap(arr: Map<any, any>, key) {
    return arr.get(key)!;
  }

  public onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.viewSortOrder = -1;
      this.viewSortField = value.substring(1, value.length);
    } else {
      this.viewSortOrder = 1;
      this.viewSortField = value;
    }
  }

  public onAnzahlChange(event) {
    let value = event.value;
    if (this.viewSortAnzahl.includes(value)) this.setSpieleList(value);
  }

  private setSpieleList(key) {
    this.viewSpiele = this.spieleWithCount.get(key)!;
  }

  public getSelectedAccountLenght(): number {
    return this.filterSelectedCyvedAccounts.length;
  }
}
