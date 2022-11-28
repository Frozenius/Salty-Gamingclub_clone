import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventPlanerComponent } from '@features/calendar-events/components/event-planer/event-planer.component';
import { IsAuthenticatedGuard } from '@core/guards/is-authenticated.guard';
import { AdminPermissionsGuard } from '@core/guards/admin-permissions.guard';
import { EventsComponent } from '@features/calendar-events/components/events/events.component';

const routes: Routes = [
  { path: 'event-planer', component: EventPlanerComponent, canActivate: [IsAuthenticatedGuard, AdminPermissionsGuard] },
  { path: 'events', component: EventsComponent },
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarEventsRoutingModule {}
