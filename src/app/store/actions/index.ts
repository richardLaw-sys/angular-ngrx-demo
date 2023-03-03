import {
  UserListRequestAction,
  UserUpdateAction,
  UserDeleteAction,
  UserAddAction,
  UserListErrorAction,
  UserListSuccessAction,
} from './user-action';

export type UserAction =
  | UserListRequestAction
  | UserUpdateAction
  | UserDeleteAction
  | UserAddAction
  | UserListErrorAction
  | UserListSuccessAction;
