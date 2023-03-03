import { createSelector } from '@ngrx/store';
import { IRootReducerState } from '../state/app-state';
import { IUserReducerState } from '../state/user-state';

const usersState = (state: IRootReducerState) => state.usersState;

export const getLoading = createSelector(
  usersState,
  (state: IUserReducerState) => state.loading
);

export const getLoaded = createSelector(
  usersState,
  (state: IUserReducerState) => state.loaded
);

export const getUsers = createSelector(
  usersState,
  (state: IUserReducerState) => state.users
);
