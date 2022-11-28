import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from '@core/components/app-main/app-main.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '@core/services/auth.service';
import { AppComponent } from '../../../app.component';
import { ConfigService } from '@core/services/config.service';
import { AppConfig } from '@core/interfaces/app-config';
import { SubscriptionManager } from '@core/classes/subscription-manager';

@Component({
  selector: 'sgc-app-inlinemenu',
  templateUrl: './app-inlinemenu.component.html',
  styleUrls: ['./app-inlinemenu.component.scss'],
  animations: [
    trigger('inline', [
      state(
        'hidden',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})
export class AppInlinemenuComponent implements OnInit, OnDestroy {
  public user;
  config: AppConfig;
  private subscriptionManager: SubscriptionManager = new SubscriptionManager();

  constructor(public appMain: AppMainComponent, private auth: AuthService, public app: AppComponent, public configService: ConfigService) {
    this.subscriptionManager.addNewSubscription(
      this.auth.user$.subscribe({
        next: (user) => {
          this.user = user;
        },
      })
    );
    this.config = this.configService.getConfig();
  }

  ngOnInit(): void {
    this.appMain.changeColorScheme(event, this.config.dark ? 'dark' : 'light');
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribeAll();
  }

  logout() {
    this.auth.logout();
  }
}
