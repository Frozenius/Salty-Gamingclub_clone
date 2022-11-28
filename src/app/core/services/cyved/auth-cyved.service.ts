import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment/environment';
import { forkJoin, map, ReplaySubject } from 'rxjs';
import { CyvedAccountData, CyvedUser } from '@core/interfaces/cyved/cyved-user';
import { ToastService } from '@core/services/toast.service';
import { CyvedGruppenService } from '@core/services/cyved/cyved-gruppen.service';

@Injectable({
  providedIn: 'root',
})
export class AuthCyvedService {
  private userSubject = new ReplaySubject<CyvedAccountData>(1);
  private token: any;
  private authUrl = environment.url_cyved;
  private refreshTokenTimeout: any;
  public user$ = this.userSubject.asObservable();

  constructor(private toast: ToastService, private router: Router, private http: HttpClient, private gruppen: CyvedGruppenService) {
    this.token = localStorage.getItem('token')?.replace('"', '').replace('"', '');
  }

  public register(user: CyvedUser): void {
    this.http.post<CyvedUser>(this.authUrl + '/register', user).subscribe({
      next: () => {
        this.toast.success('User registered successfully');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public login(username: string, password: string) {
    const authorization = 'Basic ' + btoa(username + ':' + password);
    const headers = new HttpHeaders({
      Authorization: authorization,
    });
    return this.http.post<any>(this.authUrl + '/login', {}, { headers }).subscribe({
      next: (response: any) => {
        if (response.token) {
          this.setToken(response['token']);
          this.toast.info('Login successful');
          this.prepareUser();
        }
      },
      error: (error) => {
        console.error(error);
        this.logout();
      },
      complete: () => {
        this.startRefreshTokenTimer();
      },
    });
  }

  public logout(): void {
    this.http.post<any>(this.authUrl + '/logout', {}).subscribe({
      next: () => {
        this.stopRefreshTokenTimer();
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
      },
      error: (error: any) => {
        console.error(error);
        this.stopRefreshTokenTimer();
        localStorage.removeItem('token');
      },
      complete: () => {
        this.toast.success('Logout successful');
      },
    });
  }

  private prepareUser() {
    const user = this.getUser();
    const apps = '';
    const digitaleSignatur = '';
    const gruppen = this.gruppen.extractGruppen(user);
    const shorthistory = '';
    const spezifischeRechte = '';

    return forkJoin({
      user,
      // apps,
      // digitaleSignatur,
      gruppen,
      // shorthistory,
      // spezifischeRechte
    }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.userSubject.next(data);
      },
    });
  }

  public getUser() {
    return this.http.get<CyvedUser>(this.authUrl + '/profile', { params: { request_type: 'cyved' } }).pipe(map((user: CyvedUser) => user));
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public relog(): void {
    if (!this.token) {
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    this.http.get(this.authUrl + '/login', { headers: headers }).subscribe({
      next: (response: any) => {
        this.setToken(response['token']);
        this.prepareUser();
      },
      error: (error) => {
        console.error(error);
        this.logout();
      },
      complete: () => {
        this.startRefreshTokenTimer();
      },
    });
  }

  private startRefreshTokenTimer() {
    const timeout = 60 * 1000 * 14;
    //const timeout = (20 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.relog(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
