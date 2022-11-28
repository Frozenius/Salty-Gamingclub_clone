// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FullCalendarModule } from '@fullcalendar/angular';

// Components
import { AppComponent } from './app.component';
import { HeadComponent } from '@core/components/head/head.component';
import { SideComponent } from '@core/components/side/side.component';
import { AppTopbarComponent } from '@core/components/app-topbar/app-topbar.component';
import { AppRightmenuComponent } from '@core/components/app-rightmenu/app-rightmenu.component';
import { AppFooterComponent } from '@core/components/app-footer/app-footer.component';
import { AppMenuComponent } from '@core/components/app-menu/app-menu.component';
import { AppMenuitemComponent } from '@core/components/app-menu-item/app-menu-item.component';
import { AppInlinemenuComponent } from '@core/components/app-inlinemenu/app-inlinemenu.component';
import { AppBreadcrumpsComponent } from '@core/components/app-breadcrumps/app-breadcrumps.component';
import { AppMainComponent } from '@core/components/app-main/app-main.component';
import { AppErrorComponent } from '@core/components/app-error/app-error.component';
import { AppAccessdeniedComponent } from '@core/components/app-accessdenied/app-accessdenied.component';
import { AppNotFoundComponent } from '@core/components/app-not-found/app-not-found.component';

// Services
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ThemeService } from '@core/services/theme.service';
import { AuthService } from '@core/services/auth.service';
import { AuthCyvedService } from '@core/services/cyved/auth-cyved.service';
import { AccountService } from '@core/services/account.service';

// Firebase
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, browserLocalPersistence, browserPopupRedirectResolver, browserSessionPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FooterComponent } from '@core/components/footer/footer.component';

// Utils
import { environment } from '@environment/environment';
import { HttpErrorInterceptor } from '@core/http/http-error.interceptor';
import { TokenInterceptor } from '@core/http/token.interceptor';
import { PublicModule } from '@public/public.module';
import { StoreModule } from '@ngrx/store';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    SideComponent,
    FooterComponent,
    AppMainComponent,
    AppErrorComponent,
    AppAccessdeniedComponent,
    AppNotFoundComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppInlinemenuComponent,
    AppBreadcrumpsComponent,
    AppRightmenuComponent,
    AppFooterComponent,
    AppTopbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    RippleModule,
    ToastModule,
    InputTextModule,
    FullCalendarModule,
    StyleClassModule,
    HttpClientModule,
    DialogModule,
    TooltipModule,
    DividerModule,
    PublicModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth: Auth = initializeAuth(getApp(), {
        persistence: [browserLocalPersistence, browserSessionPersistence],
        popupRedirectResolver: browserPopupRedirectResolver
      });

      return auth;
    }),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ButtonModule,
    BreadcrumbModule,
    FormsModule,
    CalendarModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).

      registrationStrategy: "registerWhenStable:30000"
    }),
    StoreModule.forRoot({}, {})

  ],
  providers: [
    MessageService,
    ThemeService,
    AuthService,
    AuthCyvedService,
    AccountService,
    ConfirmationService,
    AngularFireAuth,
    AngularFirestore,
    AngularFireStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
