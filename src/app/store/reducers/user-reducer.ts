import { Action } from '@ngrx/store';
import { UserAction } from '../actions';
import {
  USER_ADD,
  USER_DELETE,
  USER_LIST_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE,
} from '../actions/user-action';
import { initialUserState, IUserReducerState } from '../state/user-state';

export function UserReducer(
  state = initialUserState,
  action: UserAction
): IUserReducerState {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case USER_LIST_SUCCESS: {
      const updatedUsers = state.users.concat(action.payload.data);
      return {
        ...state,
        loading: false,
        loaded: true,
        users: updatedUsers,
      };
    }
    default: {
      return state;
    }
  }
}

// selectors
export const getLoading = (state: IUserReducerState) => state.loading;
export const getLoaded = (state: IUserReducerState) => state.loaded;
export const getUsers = (state: IUserReducerState) => state.users;
