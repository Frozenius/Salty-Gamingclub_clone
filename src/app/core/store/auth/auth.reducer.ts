import { Account } from '@core/interfaces/account';
import { createReducer, on } from '@ngrx/store';
import { clearAccount, reloadAccount, setAccount } from '@core/store/auth/auth.actions';

export interface AccountState {
  account: Account;
  token: string;
  error: string;
  status: 'unauthorized' | 'success' | 'error';
}

export const initialState: AccountState = {
  account: null,
  error: null,
  token: null,
  status: 'unauthorized',
};

export const accountReducer = createReducer(
  initialState,
  // Login logic
  on(setAccount, (state, { account }) => ({
    ...state,
    account: account,
  })),
  // Logout logic
  on(clearAccount, (state) => ({
    ...state,
    account: null,
  })),
  on(reloadAccount, (state) => ({ ...state, status: '' }))
);

