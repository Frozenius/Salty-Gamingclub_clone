import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageloaderService {
  private loading$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  get isLoading() {
    return this.loading$.asObservable();
  }

  showLoader() {
    this.loading$.next(true);
  }

  hideLoader() {
    this.loading$.next(false);
  }
}
