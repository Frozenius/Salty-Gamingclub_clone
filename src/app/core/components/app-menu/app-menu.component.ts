import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { AppMainComponent } from '@core/components/app-main/app-main.component';
import { MenuItem } from 'primeng/api';
import { Account } from '@core/interfaces/account';

@Component({
  selector: 'sgc-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnChanges {
  public model: MenuItem[] | any[];
  @Input() user: Account | null;

  constructor(public app: AppComponent, public appMain: AppMainComponent) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.model = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/'],
      },
      this.user && this.user.roles.admin
        ? {
          label: 'Administration',
          icon: 'pi pi-fw pi-cog',
          routerLink: ['/administration'],
          items: [
            {
              label: 'Users',
              icon: 'pi pi-fw pi-user',
              routerLink: ['/administration/users'],
            },
            {
              label: 'Discord',
              icon: 'pi pi-fw pi-discord',
              routerLink: ['/administration/discord'],
            },
          ],
        }
        : null,
      this.user
        ? {
          label: 'Calendar',
          icon: 'pi pi-fw pi-calendar',
          routerLink: ['/calendar'],
          items: [
            {
              label: 'Events',
              icon: 'pi pi-fw pi-calendar',
              routerLink: ['/calendar/events'],
            },
            this.user.roles.admin
              ? {
                label: 'Event Planer',
                icon: 'pi pi-fw pi-calendar-plus',
                routerLink: ['/calendar/event-planer'],
              }
              : null,
          ],
        }
        : null,
      {
        label: 'Server',
        icon: 'pi pi-fw pi-server',
        routerLink: ['/server'],
        items: [
          {
            label: 'Status',
            icon: 'pi pi-fw pi-server',
            routerLink: ['/server/status'],
          },
          {
            label: 'Serverliste',
            icon: 'pi pi-list',
            routerLink: ['/server/list'],
          },
          this.user && this.user.roles.admin
            ? {
                label: 'Dashboard',
                icon: 'pi pi-chart-bar',
                routerLink: ['/server/dashboard'],
              }
            : null,
        ],
      },
      this.user
        ? {
            label: 'Gaming',
            icon: 'mdi mdi-gamepad',
            routerLink: ['/gaming'],
            items: [
              {
                label: 'Spielsuche',
                icon: 'mdi mdi-gamepad-variant',
                routerLink: ['/gaming/game-search'],
              },
              {
                label: 'Mitspielersuche',
                icon: 'mdi mdi-account-search',
                routerLink: ['/gaming/player-search'],
              },
              {
                separator: true,
                visible: false,
              },
              {
                label: 'Deine Gruppen',
                icon: 'mdi mdi-account-group',
                routerLink: ['/gaming/my-groups'],
              },
              {
                label: 'Deine Spiele',
                icon: 'mdi mdi-archive-outline',
                routerLink: ['/gaming/my-games'],
              },
              {
                label: 'Deine Tierlist',
                icon: 'mdi mdi-ballot-outline',
                routerLink: ['/gaming/my-tierlist'],
              },
              this.user.roles.admin
                ? {
                    separator: true,
                    visible: false,
                  }
                : null,
              this.user.roles.admin
                ? {
                    label: 'Alle Spiele',
                    icon: 'mdi mdi-archive-search-outline',
                    routerLink: ['/gaming/all-games'],
                  }
                : null,
            ],
          }
        : null,
      this.user
        ? {
            label: 'Lifestream',
            icon: 'mdi mdi-video',
            routerLink: ['/live'],
          }
        : null,
      this.user && this.user.roles.dev
        ? {
            label: 'Playground',
            icon: 'pi pi-fw pi-play',
            routerLink: ['/playground'],
          }
        : null,
    ];
  }
}
