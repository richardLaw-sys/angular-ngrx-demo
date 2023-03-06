import {
  AppRequestLoading,
  AppRequestLoaded,
  AppRequestError,
} from './app-configuration-action';
import {
  UserUpdateAction,
  UserDeleteAction,
  UserAddAction,
  GetUserByIdAction,
  GetUsersAction,
} from './user-action';

export type UserAction =
  | GetUserByIdAction
  | GetUsersAction
  | UserUpdateAction
  | UserDeleteAction
  | UserAddAction;

export type AppConfigAction =
  | AppRequestLoading
  | AppRequestLoaded
  | AppRequestError;
