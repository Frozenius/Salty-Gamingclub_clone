import { createAction, props } from '@ngrx/store';
import { Account } from '@core/interfaces/account';

export const setAccount = createAction('[Account] Set Account', props<{ account: Account }>());

export const clearAccount = createAction('[Account] Clear Account');

export const setToken = createAction('[Account] Set Token', props<{ token: string }>());

export const clearToken = createAction('[Account] Clear Token');

export const reloadAccount = createAction('[Account] Reload Account');

export const reloadAccountSuccess = createAction('[Account] Reload Account Success', props<{ account: Account }>());

export const reloadAccountFailure = createAction('[Account] Reload Account Failure');

export const reloadToken = createAction('[Account] Reload Token');

export const reloadTokenSuccess = createAction('[Account] Reload Token Success', props<{ token: string }>());

export const reloadTokenFailure = createAction('[Account] Reload Token Failure');

