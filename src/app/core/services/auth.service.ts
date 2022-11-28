import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, of, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Auth, createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { browserLocalPersistence, browserSessionPersistence, GithubAuthProvider, setPersistence, signInWithPopup } from '@firebase/auth';
import { deleteDoc, doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { updateDoc } from '@angular/fire/firestore/';
import { ToastService } from '@core/services/toast.service';
import { Account } from '@core/interfaces/account';

// const baseUrl = `${environment.apiUrl}/home`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$!: Observable<Account | null>;
  private lastRoute: string;

  constructor(private router: Router, private ts: ToastService, private http: HttpClient, private afs: Firestore, private auth: Auth) {
    this.lastRoute = window.location.pathname;
    // Get auth data, then get firestore user document || null
    this.user$ = user(this.auth).pipe(
      switchMap((userData: any) => {
        if (userData) {
          return docData(doc(this.afs, 'users', userData.uid)) as Observable<Account>;
        } else {
          return of(null);
        }
      })
    );
  }

  // ################################################# Permissions ################################################# //

  // checks if user has matching role
  private static checkAuthorization(userData: Account, allowedRoles: string[]): boolean {
    if (!userData) {
      return false;
    }
    for (const role of allowedRoles) {
      if (userData.roles[role]) {
        return true;
      }
    }
    return false;
  }

  // ################################################# Basic Auth ################################################# //

  public async register(account: Account): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, account.email, account.password)
      .then(async (credential) => {
        account.id = credential.user.uid;
        await this.createUser(account);
        this.ts.success('Successfully registered');
        await this.router.navigate(['/auth/login']);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public async login(email: string, password: string, remindMe: boolean): Promise<void> {
    if (!remindMe) {
      await setPersistence(this.auth, browserSessionPersistence)
        .then(async () => {
          return await signInWithEmailAndPassword(this.auth, email, password);
        })
        .then(() => this.router.navigate(['/']))
        .catch((error) => {
          console.error(error);
        });
    } else {
      await setPersistence(this.auth, browserLocalPersistence)
        .then(async () => {
          return await signInWithEmailAndPassword(this.auth, email, password);
        })
        .then(() => this.router.navigate(['/']))
        .catch((error) => {
          console.error(error);
        });
    }
  }

  public signInWithProvider(provider: string): void {
    switch (provider) {
      case 'GitHub':
        this.signInWithGithub();
        break;
      default:
        break;
    }
  }

  public async signInWithGithub(): Promise<void> {
    const provider = new GithubAuthProvider();
    provider.addScope('read:user');
    signInWithPopup(this.auth, provider)
      .then((result) => {
        // The signed-in user info.
        const data = result.user['reloadUserInfo'];
        const vorname = data.displayName.split(' ')[0];
        const nachname = data.displayName.split(' ')[1];
        const githubUser = {
          id: data.localId,
          email: data.email,
          username: data.screenName,
          vorname: vorname || '',
          nachname: nachname || '',
          avatar_url: data.photoUrl || '',
          provider: 'github',
        } as Account;
        this.update(githubUser);
        // ...
      })
      .catch((error) => {
        /// An error happened.
        if (error.code === 'auth/account-exists-with-different-credential') {
          this.ts.warn('Du bist bereits mit einem anderen Konto eingeloggt');
        }
      });
  }

  public async logout(): Promise<void> {
    await this.router.navigate(['/']);
    return await signOut(this.auth);
  }

  // ################################################## Utilities ################################################## //

  public async getUser(): Promise<Account | null | undefined> {
    return await firstValueFrom(this.user$);
  }

  async resetPassword(email: string): Promise<any> {
    // sends reset password email
    return await sendPasswordResetEmail(this.auth, email)
      .then(() => {
        this.ts.success('Email zum Zurücksetzen des Passworts wurde versendet');
        this.router.navigate(['/auth/login']);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // updates user data in db
  private async createUser(userData: Account): Promise<any> {
    const data: Account = {
      id: userData.id,
      vorname: userData.vorname || 'vorname',
      nachname: userData.nachname || 'nachname',
      username: userData.username,
      email: userData.email,
      avatar_url: userData.avatar_url || '',
      roles: {
        user: true,
        dev: false,
        admin: false,
      },
      locked: {
        locked: false,
      },
    };
    this.setUser(data).catch((error) => {
      console.error(error);
    });
  }

  private async setUser(data: Account): Promise<any> {
    const ref = doc(this.afs, 'users', data.id);
    await setDoc(ref, data);
  }

  private async update(data: Account): Promise<any> {
    const ref = await doc(this.afs, 'users', data.id);
    const docSnapshot = await getDoc(ref);
    const userData = {
      id: data.id,
      vorname: data.vorname || 'vorname',
      nachname: data.nachname || 'nachname',
      username: data.username,
      email: data.email,
      avatar_url: data.avatar_url || '',
      roles: data.roles,
      provider: data.provider,
      locked: docSnapshot.data()!.locked,
    };
    if (docSnapshot.exists()) {
      await updateDoc(ref, userData);
    } else {
      await setDoc(ref, userData);
    }
  }

  private async deleteUserInDb(userData: Account): Promise<void> {
    await deleteDoc(doc(this.afs, 'users', userData.id));
  }

  public async deleteAccount(account: Account): Promise<void> {
    const userData = this.auth.currentUser;
    if (userData) {
      await deleteDoc(doc(this.afs, 'users', account.id));
      deleteUser(userData)
        .then(() => {
          this.ts.success('Account gelöscht');
          this.logout();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // public register(account: User) {
  //   this.http.post(baseUrl + '/register/de/DE/test', account)
  //     .subscribe({
  //       next: (v) => {
  //         console.log(v)
  //         this.ts.success('Account created successfully');
  //         this.router.navigate(['/login']);
  //       },
  //       error: (e) => {
  //         this.ts.error(e.statusText);
  //         console.error(e);
  //       },
  //       complete: () => {
  //
  //       }
  //     });
  // }
  //
  // public login(username: string, password: string, rememberMe: boolean) {
  //   let authorizationData = 'Basic ' + btoa(username + ':' + password);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': authorizationData
  //   })
  //
  //   this.http.post<any>(baseUrl+'/login/de/DE/test', {}, {headers})
  //     .subscribe({
  //       next: (res: any) => {
  //         localStorage.setItem('token', res.token);
  //       },
  //       complete: () => {
  //         this.getUser();
  //         this.startRefreshTokenTimer()
  //       }
  //     })
  // }
  // public logout() {
  //   this.http.post<any>(baseUrl + '/logout',{})
  //     .subscribe({
  //       next: res => {
  //         console.log(res);
  //       },
  //       error: err => {
  //         console.error(err);
  //       },
  //       complete: () => {
  //         this.user$ = of(null);
  //         localStorage.removeItem('token');
  //         this.router.navigate(['/login']);
  //         this.stopRefreshTokenTimer();
  //       }
  //     })

  // public relog() {
  //   this.http.get(baseUrl + '/login')
  //     .subscribe((res: any) => {
  //       const token = res['token'];
  //       localStorage.setItem('token', token);
  //     }, err => {
  //       this.logout();
  //     }, () => {
  //       this.startRefreshTokenTimer();
  //     });
  // }
  //
  // private getUser(){
  //   this.http.get<User>(baseUrl+'/profile')
  //     .subscribe((user: User) => {
  //
  //     })
  // }
  //
  // private startRefreshTokenTimer() {
  //   const timeout = (60 * 1000 * 15);
  //   //const timeout = (20 * 1000);
  //   this.refreshTokenTimeout = setTimeout(() => this.relog(), timeout);
  // }
  //
  // private stopRefreshTokenTimer() {
  //   if (this.refreshTokenTimeout) {
  //     clearTimeout(this.refreshTokenTimeout);
  //   }
  // }
  //
  // getToken() {
  //   return localStorage.getItem('token');
  // }
}
