import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerListComponent } from '@features/server/components/server-list/server-list.component';
import { ServerDashboardComponent } from '@features/server/components/server-dashboard/server-dashboard.component';
import { AdminPermissionsGuard } from '@core/guards/admin-permissions.guard';
import { IsAuthenticatedGuard } from '@core/guards/is-authenticated.guard';
import { ServerStatusComponent } from '@features/server/components/server-status/server-status.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'status', component: ServerStatusComponent },
  { path: 'list', component: ServerListComponent },
  { path: 'dashboard', component: ServerDashboardComponent, canActivate: [IsAuthenticatedGuard, AdminPermissionsGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerRoutingModule {}
