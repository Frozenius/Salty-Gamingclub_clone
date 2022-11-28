import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PageloaderService } from '@core/services/pageloader.service';

@Injectable()
export class HttpCallInterceptor implements HttpInterceptor {
  constructor(private pageloaderService: PageloaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          this.pageloaderService.hideLoader();
        } else {
          this.pageloaderService.showLoader();
        }
        return event;
      })
    );
  }
}
