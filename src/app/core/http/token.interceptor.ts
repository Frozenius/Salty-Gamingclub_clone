import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthCyvedService } from '@core/services/cyved/auth-cyved.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private cyvedAuth: AuthCyvedService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    switch (request.params.get('request_type')) {
      case 'pterodactyl':
        return this.pterodactyl(request, next);
        break;
      case 'cyved':
        return this.cyved(request, next);
        break;
      default:
        return next.handle(request);
    }
  }

  private getAuthToken(): string {
    return localStorage.getItem('token')?.replace('"', '').replace('"', '') as string;
  }

  private cyved(request, next) {
    if (request.headers.has('Authorization')) {
      return next.handle(request);
    }

    const token = this.getAuthToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            this.cyvedAuth.logout();
          }
        }
        return throwError(error);
      })
    );
  }

  private pterodactyl(request, next) {
    return next.handle(request);
  }
}
