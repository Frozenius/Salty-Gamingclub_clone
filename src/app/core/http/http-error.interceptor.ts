import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastService } from '@core/services/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        switch (error?.status) {
          case 400:
            this.toastService.error('Bad Request', error.status);
            break;
          case 404:
            this.toastService.error('Item not found', error.status);
            break;
          case 401:
            this.toastService.error('Unauthorize', error.status);
            break;
          case 500:
            this.toastService.error('Some thing wrong in the server', error.status);
            break;
          default:
            this.toastService.error('An unknown error occurred', error.status);
            break;
        }
        return throwError(error);
      })
    );
  }
}
