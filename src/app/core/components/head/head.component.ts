import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { Account } from '@core/interfaces/account';
import { CyvedAccountData } from '@core/interfaces/cyved/cyved-user';
import { AuthCyvedService } from '@core/services/cyved/auth-cyved.service';

@Component({
  selector: 'sgc-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit, OnDestroy {
  user: Account | null | undefined = null;
  cyvedUser: CyvedAccountData | null | undefined = null;
  dark!: boolean;
  subscription: any;
  cyvedSubscription: any;

  constructor(private themeService: ThemeService, private authService: AuthService, private toastService: ToastService, private cyvedAuth: AuthCyvedService) {
    this.dark = this.themeService.isDarkTheme;
    this.subscription = this.authService.user$.subscribe({
      next: (user) => {
        this.user = user;
        if (user) {
          if (user.locked.locked) {
            this.toastService.warn('Ihr Account wurde gesperrt. Bitte kontaktieren Sie den Administrator.');
            this.authService.logout().catch((error) => {
              console.error(error);
            });
          }
        }
      },
    });
    this.cyvedSubscription = this.cyvedAuth.user$.subscribe({
      next: (user) => {
        this.cyvedUser = user;
        if (user) {
          this.toastService.info('Successfully relogged in with Cyved');
        }
      },
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleColor(theme: string): void {
    this.themeService.switchTheme(theme);
    this.dark = localStorage.getItem('theme') === 'dark';
  }

  public logout(): void {
    this.authService.logout().catch((error) => {
      console.error(error);
    });
  }

  public notImplemented(): void {
    this.toastService.warn('Noch nicht implementiert');
  }
}
