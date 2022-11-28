export interface CalendarEvent {
  id?: string;
  start: any;
  end: any;
  title: string;
  createdBy: string;
  allDay?: boolean;
  link?: string;
}
