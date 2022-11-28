import { Injectable } from '@angular/core';
import { ToastService } from '@core/services/toast.service';
import { addDoc, Firestore, getDocs, onSnapshot, query, where } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from '@core/interfaces/calendar-event';
import { collection } from '@angular/fire/firestore/';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  currentEventsSubject = new BehaviorSubject<CalendarEvent[]>([]);
  currentEvents$ = this.currentEventsSubject.asObservable();
  upcomingEventsSubject = new BehaviorSubject<CalendarEvent[]>([]);
  upcomingEvents$ = this.upcomingEventsSubject.asObservable();
  private subscription: any;

  constructor(private ts: ToastService, private afs: Firestore) {
    this.getUpcoming(new Date()).catch((error) => {
      console.error(error);
    });
    this.getEvents().catch((error) => {
      console.error(error);
    });
  }

  public async createEvent(_event: CalendarEvent) {
    const event: CalendarEvent = {
      createdBy: _event.createdBy,
      start: _event.start,
      end: _event.end,
      allDay: _event.allDay,
      link: _event.link || '',
      title: _event.title,
    };

    await addDoc(collection(this.afs, 'events'), event);
  }

  private async getEvents() {
    const q = query(collection(this.afs, `events`));
    return await getDocs(q);
  }

  private async getUpcoming(dateNow: Date) {
    const q = query(collection(this.afs, `events`), where('startDate', '>', dateNow));
    return await getDocs(q);
  }

  public initListener() {
    const q = query(collection(this.afs, `events`));
    onSnapshot(q, (querySnapshot) => {
      const events: CalendarEvent[] = [];
      querySnapshot.forEach((doc) => {
        const data: CalendarEvent = doc.data() as CalendarEvent;
        const id = doc.id;
        events.push({ id, ...data });
      });
      this.currentEventsSubject.next(events);
      this.getUpcoming(new Date()).catch((error) => {
        console.error(error);
      });
    });

    const qu = query(collection(this.afs, `events`), where('start', '>=', new Date()));
    onSnapshot(qu, (querySnapshot) => {
      const events: CalendarEvent[] = [];
      querySnapshot.forEach((doc) => {
        const data: CalendarEvent = doc.data() as CalendarEvent;
        const id = doc.id;
        events.push({ id, ...data });
      });
      this.upcomingEventsSubject.next(events);
      this.getUpcoming(new Date()).catch((error) => {
        console.error(error);
      });
    });
  }
}
