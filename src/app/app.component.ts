import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { Account } from '@core/interfaces/account';
import { AuthService } from '@core/services/auth.service';
import { AuthCyvedService } from '@core/services/cyved/auth-cyved.service';
import { AccountService } from '@core/services/account.service';
import { EventService } from '@core/services/event.service';

@Component({
  selector: 'sgc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuMode = 'sidebar';

  layout = 'teal';

  theme = 'teal';

  ripple: boolean;

  colorScheme = 'dark';

  private readonly lastRoute: string;
  private user$!: Observable<Account | null>;

  constructor(private primengConfig: PrimeNGConfig, private authService: AuthService, private cyved: AuthCyvedService, private accountService: AccountService, private eventService: EventService) {
    this.primengConfig.ripple = true;
    this.user$ = this.authService.user$;
    this.eventService.initListener();
    this.accountService.initListener();
    // this.cyved.login(
    //   '',
    //   ''
    // );
    this.cyved.login(
      'Ruxery',
      '123456789'
    );
    if (window.location.pathname === '/teamspeak') {
      window.open('ts3server://teamspeak.salty-gamingclub.de');
    }
  }
}
