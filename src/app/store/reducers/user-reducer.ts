import { Action } from '@ngrx/store';
import { UserAction } from '../actions';
import {
  USER_ADD,
  USER_DELETE,
  GET_USER,
  GET_USERS,
  USER_UPDATE,
} from '../actions/user-action';
import { initialUserState, IUserReducerState } from '../state/user-state';

export function UserReducer(
  state = initialUserState,
  action: UserAction
): IUserReducerState {
  switch (action.type) {
    case GET_USERS: {
      const updatedUsers = state.users.concat(action.payload.data);
      return {
        ...state,
        users: updatedUsers,
      };
    }
    case GET_USER: {
      const user = action.payload.data;
      return {
        ...state,
        selectedUser: user,
      };
    }
    default: {
      return state;
    }
  }
}
