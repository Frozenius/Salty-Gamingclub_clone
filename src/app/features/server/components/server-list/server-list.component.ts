import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumpService } from '@core/services/breadcrump.service';
import { ServerService } from '@core/services/server.service';
import { SubscriptionManager } from '@core/classes/subscription-manager';

@Component({
  selector: 'sgc-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss'],
})
export class ServerListComponent implements OnInit, OnDestroy {
  selectedPlatform: any;
  selectedGame: any;
  server: any[];
  orderGame: any[];
  subscriptionManger: SubscriptionManager = new SubscriptionManager();

  constructor(private breadcrumps: BreadcrumpService, private serverService: ServerService) {
    breadcrumps.setItems([
      {
        label: 'Server',
        routerLink: ['/server'],
      },
      {
        label: 'Liste',
        routerLink: ['/server/list'],
      },
    ]);
  }

  ngOnInit(): void {
    this.baseTable();
  }

  ngOnDestroy(): void {
    this.subscriptionManger.unsubscribeAll();
  }

  baseTable() {
    this.subscriptionManger.addNewSubscription(
      this.serverService.getAllServer().subscribe((server) => {
        this.server = server;
      })
    );
    this.selectedGame = '';
    this.selectedPlatform = '';
  }

  updatePlatform(event: any) {
    this.subscriptionManger.addNewSubscription(
      this.serverService.getServerByPlatform(event.value.name).subscribe((server) => {
        this.server = server;
      })
    );
  }

  updateGame(event: any) {
    this.subscriptionManger.addNewSubscription(
      this.serverService.getServerByPlatform(event.value.name).subscribe((server) => {
        console.log(server);
      })
    );
  }

  orderPlatform = [
    {
      name: 'Steam',
      code: '0',
    },
    {
      name: 'Minecraft',
      code: '1',
    },
  ];
}
