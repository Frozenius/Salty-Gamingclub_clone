import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BitcoinService } from '@core/services/bitcoin.service';
import { LineChartComponent } from '@public/components/line-chart/line-chart.component';
import { SubscriptionManager } from '@core/classes/subscription-manager';
import { Subscription } from 'rxjs';
import { PterodactylService } from '@core/services/ptyrodactyl/pterodactyl.service';

@Component({
  selector: 'sgc-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit, OnDestroy {
  chartData: number[] = [];
  @ViewChild(LineChartComponent) lineChart!: LineChartComponent;
  subscriptionManger: SubscriptionManager = new SubscriptionManager();

  constructor(private bitcoinService: BitcoinService, private pty: PterodactylService) {}

  ngOnInit(): void {
    this.subscriptionManger.addNewSubscription(this.bitcoinService.initBitcoin());
    this.subscriptionManger.addNewSubscription(this.listenBitcoin());
    this.subscriptionManger.addNewSubscription(
      this.pty.getServerList().subscribe({
        next: (value) => console.log,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionManger.unsubscribeAll();
  }

  public listenBitcoin(): Subscription {
    return this.bitcoinService.bitcoinStream.subscribe({
      next: (bitcoin) => {
        const bitcoinValue = bitcoin.toString().split('.')[0] as unknown as number;
        this.lineChart.addData(bitcoinValue);
      },
    });
  }
}
