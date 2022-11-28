import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socketSubject: WebSocketSubject<unknown>;
  public socketStream: Subject<unknown> = new Subject<unknown>();
  constructor(private url: string) {
    this.socketSubject = webSocket(url);
  }

  public listen() {
    return this.socketSubject.subscribe({
      next: (msg) => this.socketStream.next(msg),
      error: (error) => console.error(error),
      complete: () => console.log('socket closed'),
    });
  }

  public send(obj: unknown) {
    this.socketSubject.next(obj);
  }
}
