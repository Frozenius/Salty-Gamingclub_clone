import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "@core/guards/login.guard";
import { AppMainComponent } from "@core/components/app-main/app-main.component";
import { AppErrorComponent } from "@core/components/app-error/app-error.component";
import { AppAccessdeniedComponent } from "@core/components/app-accessdenied/app-accessdenied.component";
import { AppNotFoundComponent } from "@core/components/app-not-found/app-not-found.component";
import { IsAuthenticatedGuard } from "@core/guards/is-authenticated.guard";
import { DevPermissionsGuard } from "@core/guards/dev-permissions.guard";
import { AdminPermissionsGuard } from "@core/guards/admin-permissions.guard";

// Lazy loaded modules
const homeModule = () => import('@features/home/home.module').then((x) => x.HomeModule);
const authModule = () => import('@features/auth/auth.module').then((x) => x.AuthModule);
const privateModule = () => import('@features/private/private.module').then((x) => x.PrivateModule);
const adminModule = () => import('@features/admin/admin.module').then((x) => x.AdminModule);
const arkModule = () => import('@features/ark/ark.module').then((x) => x.ArkModule);
const serverModule = () => import('@features/server/server.module').then((x) => x.ServerModule);
const spielleiterModule = () => import('@features/spielleiter/spielleiter.module').then((x) => x.SpielleiterModule);
const playgroundModule = () => import('@features/playground/playground.module').then((x) => x.PlaygroundModule);
const liveModule = () => import('@features/live/live.module').then((x) => x.LiveModule);
const calendarEventsModule = () => import('@features/calendar-events/calendar-events.module').then((x) => x.CalendarEventsModule);

// Routes
const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    children: [
      { path: '', loadChildren: homeModule },
      {
        path: 'private',
        loadChildren: privateModule,
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'administration',
        loadChildren: adminModule,
        canActivate: [IsAuthenticatedGuard, AdminPermissionsGuard, DevPermissionsGuard],
      },
      { path: 'calendar', loadChildren: calendarEventsModule },
      { path: 'ark', loadChildren: arkModule, canActivate: [IsAuthenticatedGuard] },
      {
        path: 'server',
        loadChildren: serverModule,
        canActivate: [],
      },
      {
        path: 'gaming',
        loadChildren: spielleiterModule,
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'playground',
        loadChildren: playgroundModule,
        canActivate: [IsAuthenticatedGuard, DevPermissionsGuard],
      },
      {
        path: 'live',
        loadChildren: liveModule,
        canActivate: [IsAuthenticatedGuard, DevPermissionsGuard],
      },
    ],
  },
  { path: 'error', component: AppErrorComponent },
  { path: 'access', component: AppAccessdeniedComponent },
  { path: 'notfound', component: AppNotFoundComponent },
  { path: 'auth', loadChildren: authModule, canActivate: [LoginGuard] },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
