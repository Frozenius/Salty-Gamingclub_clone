import { Component, OnDestroy } from '@angular/core';
import { BreadcrumpService } from '@core/services/breadcrump.service';
import { AppMainComponent } from '@core/components/app-main/app-main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sgc-app-breadcrumps',
  templateUrl: './app-breadcrumps.component.html',
  styleUrls: ['./app-breadcrumps.component.scss'],
})
export class AppBreadcrumpsComponent implements OnDestroy {
  subscription: Subscription;

  items: MenuItem[];

  home: MenuItem;

  search: string;

  constructor(public breadcrumbService: BreadcrumpService, public appMain: AppMainComponent) {
    this.subscription = breadcrumbService.itemsHandler.subscribe((response) => {
      this.items = response;
    });

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
