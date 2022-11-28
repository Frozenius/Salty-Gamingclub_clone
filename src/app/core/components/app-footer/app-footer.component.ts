import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'sgc-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss'],
})
export class AppFooterComponent implements OnInit {
  privacy: any;
  impressum: any;
  nutzung: any;
  constructor(public app: AppComponent) {}

  ngOnInit(): void {}

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
