import * as fromUser from './user-reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { IRootReducerState } from '../state/app-state';

export const rootReducer: ActionReducerMap<IRootReducerState, any> = {
  usersState: fromUser.UserReducer,
};
