import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  private readonly lastRoute: string;
  constructor(private authService: AuthService, private ts: ToastService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.user$.subscribe({
      next: (user) => {
        if (!user) {
          return true;
        }
        this.router.navigate(['/']).catch((error) => {
          console.error(error);
        });
        return false;
      },
    });
    return true;
  }
}
