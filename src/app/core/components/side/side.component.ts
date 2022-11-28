import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from '@core/interfaces/account';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'sgc-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
})
export class SideComponent implements OnInit, OnDestroy {
  user: Account | null | undefined = null;
  subscription: any;
  privacy = false;
  impressum = false;

  constructor(private authService: AuthService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public notImplemented(): void {
    this.toastService.warn('Noch nicht implementiert');
  }
}
