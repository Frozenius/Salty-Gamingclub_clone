import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'sgc-app-accessdenied',
  templateUrl: './app-accessdenied.component.html',
  styleUrls: ['./app-accessdenied.component.scss'],
})
export class AppAccessdeniedComponent {
  dark: boolean;

  constructor(private themeService: ThemeService) {
    this.dark = this.themeService.isDarkTheme;
  }
}
