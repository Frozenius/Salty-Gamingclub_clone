import { Component } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'sgc-app-not-found',
  templateUrl: './app-not-found.component.html',
  styleUrls: ['./app-not-found.component.scss'],
})
export class AppNotFoundComponent {
  constructor(public app: AppComponent) {}
}
