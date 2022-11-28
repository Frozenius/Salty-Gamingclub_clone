import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from '@core/interfaces/account';
import { AccountService } from '@core/services/account.service';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { BreadcrumpService } from '@core/services/breadcrump.service';

@Component({
  selector: 'sgc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public user: Account | null;

  public loading = false;
  private dataSource: Account[];
  public totalAccounts = 0;

  deleteUserDialog = false;

  switchRoleDialog = false;

  accounts: Account[];

  account: Account;

  selectedUsers: Account[];

  submitted: boolean;

  cols: any[];

  switchingRole: string;

  constructor(
    private accountService: AccountService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private toastService: ToastService,
    private breadcrumps: BreadcrumpService
  ) {
    this.breadcrumps.setItems([
      { label: 'Administration', routerLink: ['/'] },
      { label: 'Users', routerLink: ['/administration/users'] },
    ]);
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.accountService.accounts$.subscribe((accounts) => {
      this.dataSource = accounts;
      this.accounts = accounts;
      this.totalAccounts = accounts.length;
      this.loading = false;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public getUsers(event: any): void {
    this.loading = true;
    if (event) {
      setTimeout(() => {
        if (this.dataSource) {
          this.accounts = this.dataSource.slice(event.first, event.first + event.rows);
          this.loading = false;
        }
      }, 1000);
    }
  }

  public customSort(event: any): void {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = 0;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }

      return event.order * result;
    });
  }

  confirm(event: any, role: string, account: Account): void {
    this.switchRoleDialog = true;
    this.switchingRole = role;
    this.account = { ...account };
  }

  public switchRole(account: Account, role: string): void {
    this.switchRoleDialog = false;
    if (account.id === this.user?.id) {
      if (!account.roles!.admin && role === 'admin') {
        this.toastService.warn('Du kannst nicht deinen eigenen Account als Admin ändern!');
        return;
      }
    }
    const value = !account?.roles![role];
    const newUser = {
      ...account,
      roles: {
        ...account.roles,
        [role]: value,
      },
    };
    this.accountService.updateAccount(newUser).catch((error) => {
      console.error(error);
    });
  }

  lock(event: any, account: Account): void {
    const temp = {
      ...account,
      locked: {
        locked: true,
      },
    };
    this.accountService.updateAccount(temp).catch((error) => {
      console.error(error);
    });
  }

  unLock(event: any, account: Account): void {
    const temp = {
      ...account,
      locked: {
        locked: false,
        reason: '',
      },
    };
    this.accountService.updateAccount(temp).catch((error) => {
      console.error(error);
    });
  }

  confirmDelete() {
    this.deleteUserDialog = false;
    this.accounts = this.accounts.filter((val) => val.email !== this.account.email);
    this.toastService.success('Account wurde gelöscht!');
    this.account = {} as Account;
  }
}
