import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from '@core/interfaces/app-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {
    const config = localStorage.getItem('config');
    if (config) {
      this.config = JSON.parse(config);
    }
  }

  config: AppConfig = {
    theme: '',
    dark: true,
    inputStyle: '',
    ripple: true,
    menuPinned: false,
  };

  private configUpdate = new Subject<AppConfig>();

  configUpdate$ = this.configUpdate.asObservable();

  updateConfig(config: AppConfig) {
    this.config = config;
    this.configUpdate.next(config);
    localStorage.setItem('config', JSON.stringify(config));
  }

  getConfig() {
    return this.config;
  }
}
