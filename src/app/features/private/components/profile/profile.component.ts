import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from '@core/interfaces/account';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { AccountService } from '@core/services/account.service';
import { ConfirmationService } from 'primeng/api';
import { SubscriptionManager } from '@core/classes/subscription-manager';

@Component({
  selector: 'sgc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  loading = true;
  profile: Account;
  subscriptionManager: SubscriptionManager = new SubscriptionManager();
  uploading = false;
  percent = 0;

  constructor(readonly authService: AuthService, private toast: ToastService, private accountService: AccountService, private confirmationService: ConfirmationService) {
    this.subscriptionManager.addNewSubscription(
      this.authService.user$.subscribe({
        next: (user) => {
          if (user) this.profile = user as Account;
        },
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribeAll();
  }

  public uploadAvatar($event: any): void {
    if (!$event.target.files || $event.target.files.length === 0) {
      this.toast.warn('You must select an image to upload.');
    }

    const file = $event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    this.accountService.uploadAvatar(filePath, file, this.profile).catch((err) => {
      console.error(err);
    });
  }

  public updateProfile(vorname: string, nachname: string, username: string): void {
    const temp = {
      vorname: this.profile.vorname,
      nachname: this.profile.nachname,
      username: this.profile.username,
    };
    if (vorname) {
      this.profile.vorname = vorname;
    }
    if (nachname) {
      this.profile.nachname = nachname;
    }
    if (username) {
      this.profile.username = username;
    }
    if (this.profile.vorname === temp.vorname && this.profile.nachname === temp.nachname && this.profile.username === temp.username) {
      this.toast.warn('Du hast nichts geändert.');
      return;
    }
    this.accountService.updateAccount(this.profile).catch((err) => {
      console.error(err);
    });
  }

  confirm(event: any): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Willst du dein Profil wirklich löschen?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.deleteAccount(this.profile).catch((error) => {
          console.error(error);
        });
      },
      reject: () => {
        //reject action
      },
    });
  }
}
