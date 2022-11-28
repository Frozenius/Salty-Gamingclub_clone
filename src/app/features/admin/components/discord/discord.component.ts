import { Component, OnInit } from '@angular/core';
import { BreadcrumpService } from '@core/services/breadcrump.service';

@Component({
  selector: 'sgc-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.scss'],
})
export class DiscordComponent implements OnInit {
  constructor(private breadcrumps: BreadcrumpService) {
    this.breadcrumps.setItems([
      { label: 'Administration', routerLink: ['/'] },
      { label: 'Discord', routerLink: ['/administration/discord'] },
    ]);
  }

  ngOnInit(): void {}
}
