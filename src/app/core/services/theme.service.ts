import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkTheme = false;

  constructor() {
    this.darkTheme = localStorage.getItem('theme') === 'dark';
  }

  public switchTheme(theme: string): void {
    localStorage.setItem('theme', `${theme}`);
    this.darkTheme = theme === 'dark';
  }

  get isDarkTheme(): boolean {
    return this.darkTheme;
  }
}
