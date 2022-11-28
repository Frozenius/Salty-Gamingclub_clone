import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class DevPermissionsGuard implements CanActivate {
  constructor(private authService: AuthService, private ts: ToastService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      take(1),
      map((user) => !!user?.roles.dev || !!user?.roles.admin),
      tap((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['/access']);
        }
      })
    );
  }
}
