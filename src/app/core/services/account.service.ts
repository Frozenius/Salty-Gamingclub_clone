import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getDocs, onSnapshot, query, setDoc } from '@angular/fire/firestore';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore/';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { ToastService } from '@core/services/toast.service';
import { Account } from '@core/interfaces/account';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  public accounts$ = this.accountsSubject.asObservable();
  private subscription: any;

  constructor(private toastService: ToastService, private authService: AuthService, private firestore: Firestore, private storage: Storage) {
    this.getAccounts().catch((error) => {
      console.error(error);
    });
  }

  // ################################################## Utilities ################################################## //

  // Account Section
  public async getAccounts(): Promise<void> {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    const accounts: Account[] = [];
    querySnapshot.forEach((doc) => {
      const data: any = doc.data();
      const id = doc.id;
      accounts.push({ id, ...data });
    });
    this.accountsSubject.next(accounts);
  }

  public async updateAccount(account: Account): Promise<void> {
    this.update(account)
      .then(() => {
        this.toastService.success('User erfolgreich bearbeitet');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public async createAccount(account: Account): Promise<void> {
    this.create(account)
      .then(() => {
        this.toastService.success('Account created successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private async update(account: any): Promise<void> {
    const temp = {
      ...account,
      roles: {
        ...account.roles,
      },
    };
    const docRef = doc(this.firestore, 'users', account.id);
    return await updateDoc(docRef, account);
  }

  private async create(account: any): Promise<void> {
    const docRef = doc(this.firestore, 'users', account.id);
    return await setDoc(docRef, account);
  }

  public async uploadAvatar(filePath: string, file: File, account: Account): Promise<boolean> {
    const avatarRef = ref(this.storage, account.id + '/' + filePath);
    await uploadBytes(avatarRef, file)
      .then((snapshot) => {
        this.toastService.success('Avatar hochgeladen');
      })
      .catch((error) => {
        console.error(error);
        return;
      });
    if (account.avatar) {
      await this.deleteImage(account);
    }
    await getDownloadURL(avatarRef).then((url) => {
      account.avatar = filePath;
      account.avatar_url = url;
    });
    await this.updateAccount(account);
    return true;
  }

  public async deleteImage(acccount: Account): Promise<void> {
    const deleteRef = ref(this.storage, acccount.id + '/' + acccount.avatar);
    deleteObject(deleteRef)
      .then(() => {
        this.toastService.success('Avatar gelöscht');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  initListener() {
    const q = query(collection(this.firestore, 'users'));
    this.subscription = onSnapshot(q, async (querySnapshot) => {
      const accounts: Account[] = [];
      querySnapshot.forEach((doc) => {
        const data: any = doc.data();
        const id = doc.id;
        accounts.push({ id, ...data });
      });
      this.accountsSubject.next(accounts);
    });
  }

  removeListener() {
    this.subscription();
  }
}
