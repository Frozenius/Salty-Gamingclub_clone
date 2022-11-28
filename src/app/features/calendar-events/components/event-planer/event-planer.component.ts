import { Component, OnInit } from '@angular/core';
import { EventService } from '@core/services/event.service';
import { SubscriptionManager } from '@core/classes/subscription-manager';
import { CalendarEvent } from '@core/interfaces/calendar-event';
import { AuthService } from '@core/services/auth.service';
import { map } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'sgc-event-planer',
  templateUrl: './event-planer.component.html',
  styleUrls: ['./event-planer.component.scss'],
})
export class EventPlanerComponent implements OnInit {
  options: any;

  eventDialog: boolean;

  checked1 = false;

  addDialog = false;

  changedEvent: any;

  clickedEvent: any = null;

  rangeDates: Date[];

  title: string;

  startDate: Date;

  endDate: Date;

  events: any[];

  private subscriptionManager = new SubscriptionManager();

  private user;

  constructor(private eventService: EventService, private auth: AuthService) {
    this.subscriptionManager.addNewSubscription(
      this.auth.user$.subscribe((user) => {
        this.user = user;
      })
    );
  }

  ngOnInit(): void {
    this.options = {
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventClick: (e) => {
        this.eventDialog = true;

        this.clickedEvent = e.event;

        this.changedEvent.title = this.clickedEvent?.title;
        this.changedEvent.start = this.clickedEvent?.start;
        this.changedEvent.end = this.clickedEvent?.end;
      },
    };

    this.subscriptionManager.addNewSubscription(
      this.eventService.currentEvents$
        .pipe(
          map((events) => {
            return events.map((event) => {
              return {
                title: event.title,
                start: moment.unix(event.start.seconds).format('YYYY-MM-DDThh:mm:ss'),
                end: moment.unix(event.end.seconds).format('YYYY-MM-DDThh:mm:ss'),
                allDay: event.allDay,
              };
            });
          })
        )
        .subscribe((events) => {
          this.events = events;
          console.log(events);
          this.options = { ...this.options, ...{ events: events } };
        })
    );

    this.changedEvent = { title: '', start: null, end: '', allDay: null };
  }

  save() {
    this.eventDialog = false;

    this.clickedEvent.setProp('title', this.changedEvent.title);
    this.clickedEvent.setStart(this.changedEvent.start);
    this.clickedEvent.setEnd(this.changedEvent.end);
    this.clickedEvent.setAllDay(this.changedEvent.allDay);

    this.changedEvent = { title: '', start: null, end: '', allDay: null };
  }

  add() {
    this.addDialog = false;

    const event: CalendarEvent = {
      createdBy: this.user.id,
      title: this.title,
      start: this.startDate || this.rangeDates[0],
      end: this.endDate || this.rangeDates[1],
      allDay: this.checked1,
    };
    console.log(event);
    this.eventService.createEvent(event);
    this.resetForm();
  }

  private resetForm() {
    this.title = '';
  }

  reset() {
    this.changedEvent.title = this.clickedEvent.title;
    this.changedEvent.start = this.clickedEvent.start;
    this.changedEvent.end = this.clickedEvent.end;
  }
}
