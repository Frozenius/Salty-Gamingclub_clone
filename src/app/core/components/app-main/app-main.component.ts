import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from '../../../app.component';
import { MenuService } from '@core/services/menu.service';
import { AppConfig } from '@core/interfaces/app-config';
import { ConfigService } from '@core/services/config.service';
import { AuthService } from '@core/services/auth.service';
import { Account } from '@core/interfaces/account';

@Component({
  selector: 'sgc-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss'],
})
export class AppMainComponent implements OnInit, OnDestroy {
  overlayMenuActive: boolean;

  staticMenuDesktopInactive = false;

  staticMenuMobileActive: boolean;

  sidebarActive = false;

  sidebarStatic = false;

  menuClick: boolean;

  menuHoverActive = false;

  topbarMenuActive: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;

  configActive: boolean;

  configClick: boolean;

  rightMenuActive: boolean;

  rightMenuClick: boolean;

  searchActive: boolean;

  searchClick: boolean;

  activeInlineProfile: boolean;

  pinActive: boolean;

  config: AppConfig;

  public user: Account | null;

  private subscription: any;

  constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig, public app: AppComponent, public configService: ConfigService, private authService: AuthService) {
    this.config = configService.getConfig();
  }

  ngOnInit() {
    this.sidebarActive = this.config.menuPinned!;
    this.pinActive = this.config.menuPinned!;
    this.sidebarStatic = this.config.menuPinned!;
    this.subscription = this.authService.user$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeColorScheme(event, scheme) {
    this.changeStyleSheetsColor('layout-css', 'layout-' + scheme + '.css', 1);
    this.changeStyleSheetsColor('theme-css', 'theme-' + scheme + '.css', 1);

    this.app.colorScheme = scheme;
    this.configService.updateConfig({
      ...this.config,
      ...{ dark: scheme === 'dark' },
    });
    event?.preventDefault();
  }

  changeStyleSheetsColor(id, value, from) {
    const element = document.getElementById(id);
    const urlTokens = element?.getAttribute('href')?.split('/');

    if (from === 1) {
      // which function invoked this function - change scheme
      urlTokens![urlTokens!.length - 1] = value;
    } else if (from === 2) {
      // which function invoked this function - change color
      urlTokens![urlTokens!.length - 2] = value;
    }

    const newURL = urlTokens!.join('/');

    this.replaceLink(element, newURL);
  }

  replaceLink(linkElement, href) {
    if (this.isIE()) {
      linkElement.setAttribute('href', href);
    } else {
      const id = linkElement.getAttribute('id');
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute('href', href);
      cloneLinkElement.setAttribute('id', id + '-clone');

      linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', id);
      });
    }
  }

  isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (this.configActive && !this.configClick) {
      this.configActive = false;
    }

    if (this.rightMenuActive && !this.rightMenuClick) {
      this.rightMenuActive = false;
    }

    if (this.searchActive && !this.searchClick) {
      this.searchActive = false;
    }

    if (!this.menuClick) {
      if ((this.isSlim() || this.isHorizontal()) && !this.isMobile()) {
        this.menuService.reset();
        this.menuHoverActive = false;
      }

      if (this.overlayMenuActive || this.staticMenuMobileActive) {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
      }
    }

    this.configClick = false;
    this.rightMenuClick = false;
    this.searchClick = false;
    this.menuClick = false;
    this.topbarItemClick = false;
  }

  onSidebarClick($event) {
    this.menuClick = true;
  }

  onToggleMenu(event) {
    this.menuClick = true;
    if (this.overlayMenuActive) {
      this.overlayMenuActive = false;
    }

    if (this.sidebarActive) {
      this.sidebarStatic = !this.sidebarStatic;
    }
    this.configService.updateConfig({
      ...this.config,
      ...{ menuPinned: this.sidebarStatic },
    });
    event.preventDefault();
  }

  onSidebarMouseOver(event) {
    if (this.app.menuMode === 'sidebar' && !this.sidebarStatic) {
      this.sidebarActive = this.isDesktop();
      setTimeout(() => {
        this.pinActive = this.isDesktop();
      }, 200);
    }
  }

  onSidebarMouseLeave($event) {
    if (this.app.menuMode === 'sidebar' && !this.sidebarStatic) {
      setTimeout(() => {
        this.sidebarActive = false;
        this.pinActive = false;
      }, 250);
    }
  }

  onMenuButtonClick(event) {
    this.menuClick = true;

    if (this.isOverlay()) {
      this.overlayMenuActive = !this.overlayMenuActive;
    }

    if (this.isDesktop()) {
      this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
    } else {
      this.staticMenuMobileActive = !this.staticMenuMobileActive;
    }

    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onTopbarSubItemClick(event) {
    event.preventDefault();
  }

  onRippleChange(event) {
    this.app.ripple = event.checked;
    this.primengConfig.ripple = event.checked;
  }

  onConfigClick(event) {
    this.configClick = true;
  }

  onRightMenuButtonClick() {
    this.rightMenuClick = true;
    this.rightMenuActive = true;
  }

  onRightMenuClick($event) {
    this.rightMenuClick = true;
  }

  isStatic() {
    return this.app.menuMode === 'static';
  }

  isOverlay() {
    return this.app.menuMode === 'overlay';
  }

  isSlim() {
    return this.app.menuMode === 'slim';
  }

  isHorizontal() {
    return this.app.menuMode === 'horizontal';
  }

  isSidebar() {
    return this.app.menuMode === 'sidebar';
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return window.innerWidth <= 991;
  }
}
