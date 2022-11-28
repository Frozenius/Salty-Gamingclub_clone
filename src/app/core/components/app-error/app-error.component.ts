import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'sgc-app-error',
  templateUrl: './app-error.component.html',
  styleUrls: ['./app-error.component.scss'],
})
export class AppErrorComponent {
  constructor(public app: AppComponent) {}
}
