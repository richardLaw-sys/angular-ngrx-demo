import { createSelector } from '@ngrx/store';
import { IRootReducerState } from '../state/app-state';
import { IUserReducerState } from '../state/user-state';

const usersState = (state: IRootReducerState) => state.usersState;

export const getUsers = createSelector(
  usersState,
  (state: IUserReducerState) => state.users
);

export const getSelectedUser = createSelector(
  usersState,
  (state: IUserReducerState) => state.selectedUser
);
