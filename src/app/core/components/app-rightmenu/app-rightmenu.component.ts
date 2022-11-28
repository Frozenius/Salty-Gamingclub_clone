import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from '@core/components/app-main/app-main.component';
import { AuthService } from '@core/services/auth.service';
import { SubscriptionManager } from '@core/classes/subscription-manager';
import { Account } from '@core/interfaces/account';
import { EventService } from '@core/services/event.service';
import { CalendarEvent } from '@core/interfaces/calendar-event';
import { map } from 'rxjs';
import * as moment from 'moment/moment';

@Component({
  selector: 'sgc-app-rightmenu',
  templateUrl: './app-rightmenu.component.html',
  styleUrls: ['./app-rightmenu.component.scss'],
})
export class AppRightmenuComponent implements OnInit, OnDestroy {
  public user: Account | null;
  date: Date;
  private subscriptionManager: SubscriptionManager = new SubscriptionManager();
  upcomingEvents: CalendarEvent[];

  constructor(public appMain: AppMainComponent, private auth: AuthService, private events: EventService) {
    this.subscriptionManager.addNewSubscription(
      this.auth.user$.subscribe({
        next: (user) => {
          this.user = user;
        },
      })
    );
  }

  ngOnInit(): void {
    this.date = new Date();
    this.events.upcomingEvents$
      .pipe(
        map((events) => {
          return events.map((event) => {
            return {
              id: event.id,
              title: event.title,
              start: moment.unix(event.start.seconds).format('YYYY-MM-DD hh:mm'),
              end: moment.unix(event.end.seconds).format('YYYY-MM-DD hh:mm'),
              allDay: event.allDay,
              createdBy: event.createdBy,
            };
          });
        })
      )
      .subscribe({
        next: (events) => {
          console.log(events);
          this.upcomingEvents = events;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribeAll();
  }
}
