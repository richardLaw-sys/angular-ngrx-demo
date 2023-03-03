import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const USER_LIST_REQUEST = 'user list request';
export const USER_LIST_SUCCESS = 'user list success';
export const USER_DELETE = 'user delete';
export const USER_UPDATE = 'user update';
export const USER_ADD = 'user add';
export const USER_LIST_ERROR = 'user list error';

export class UserListRequestAction implements Action {
  readonly type = USER_LIST_REQUEST;
}

export class UserDeleteAction implements Action {
  readonly type = USER_DELETE;

  constructor(public payload: { id: number }) {}
}

export class UserUpdateAction implements Action {
  readonly type = USER_UPDATE;

  constructor(public payload: { data: User }) {}
}

export class UserAddAction implements Action {
  readonly type = USER_ADD;

  constructor(public payload: { data: User }) {}
}

export class UserListErrorAction implements Action {
  readonly type = USER_LIST_ERROR;
}

export class UserListSuccessAction implements Action {
  readonly type = USER_LIST_SUCCESS;

  constructor(public payload: { data: User[] }) {}
}
