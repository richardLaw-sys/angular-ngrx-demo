import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const USER_DELETE = 'user delete';
export const USER_UPDATE = 'user update';
export const USER_ADD = 'user add';

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

export class GetUserByIdAction implements Action {
  readonly type = GET_USER;

  constructor(public payload: { data: User }) {}
}

export class GetUsersAction implements Action {
  readonly type = GET_USERS;

  constructor(public payload: { data: User[] }) {}
}
