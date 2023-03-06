import { Action } from '@ngrx/store';
import { AppConfiguration } from 'src/app/models/app-configuration';

export const APP_REQUEST_LOADING = 'APP_REQUEST_LOADING';
export const APP_REQUEST_LOADED = 'APP_REQUEST_LOADED';
export const APP_REQUEST_ERROR = 'APP_REQUEST_ERRROR';

export class AppRequestLoading implements Action {
  readonly type = APP_REQUEST_LOADING;
}

export class AppRequestLoaded implements Action {
  readonly type = APP_REQUEST_LOADED;
}

export class AppRequestError implements Action {
  readonly type = APP_REQUEST_ERROR;

  constructor(public payload: { error: string }) {}
}
