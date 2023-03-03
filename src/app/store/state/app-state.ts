import * as fromUser from '../state/user-state';

export interface IRootReducerState {
  usersState: fromUser.IUserReducerState;
}
