import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthCyvedService } from '@core/services/cyved/auth-cyved.service';
import { CyvedAccountData } from '@core/interfaces/cyved/cyved-user';
import { SubscriptionManager } from '@core/classes/subscription-manager';

@Component({
  selector: 'sgc-cyved',
  templateUrl: './cyved.component.html',
  styleUrls: ['./cyved.component.scss'],
})
export class CyvedComponent implements OnInit, OnDestroy {
  accountData!: CyvedAccountData;
  public subscriptionManger: SubscriptionManager = new SubscriptionManager();

  constructor(private cyvedAuth: AuthCyvedService) {
    this.subscriptionManger.addNewSubscription(
      this.cyvedAuth.user$.subscribe((accountData: CyvedAccountData) => {
        this.accountData = accountData;
        console.log(accountData);
      })
    );
  }

  ngOnInit(): void {
    this.cyvedAuth.relog();
  }

  public login() {
    this.cyvedAuth.login('Administrator', '12345678');
  }

  ngOnDestroy(): void {}
}
