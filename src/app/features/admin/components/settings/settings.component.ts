import { Component, OnInit } from '@angular/core';
import { BreadcrumpService } from '@core/services/breadcrump.service';

@Component({
  selector: 'sgc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private breadcrumps: BreadcrumpService) {
    this.breadcrumps.setItems([
      { label: 'Administration', routerLink: ['/administration'] },
      { label: 'Settings', routerLink: ['/administration/settings'] },
    ]);
  }

  ngOnInit(): void {}
}
