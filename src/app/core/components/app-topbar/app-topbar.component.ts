import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from '@core/components/app-main/app-main.component';
import { AppComponent } from 'app/app.component';
import { Account } from '@core/interfaces/account';
import { AuthService } from '@core/services/auth.service';
import { ConfigService } from '@core/services/config.service';

@Component({
  selector: 'sgc-app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.scss'],
})
export class AppTopbarComponent implements OnInit, OnDestroy {
  user: Account | null;
  private subscription: any;

  constructor(public app: AppComponent, public appMain: AppMainComponent, private authService: AuthService, public configService: ConfigService) {
    this.subscription = this.authService.user$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(event) {
    this.authService.logout();
    event.preventDefault();
  }
}
