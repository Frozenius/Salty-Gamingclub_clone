import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarEventsRoutingModule } from './calendar-events-routing.module';
import { EventPlanerComponent } from './components/event-planer/event-planer.component';
import { EventsComponent } from './components/events/events.component';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, interactionPlugin]);

@NgModule({
  declarations: [EventPlanerComponent, EventsComponent],
  imports: [CommonModule, CalendarEventsRoutingModule, CalendarModule, FullCalendarModule, DialogModule, InputTextModule, FormsModule, CheckboxModule, ToggleButtonModule, FullCalendarModule],
})
export class CalendarEventsModule {}
