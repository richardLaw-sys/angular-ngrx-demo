import { User } from 'src/app/models/user';

export interface IUserReducerState {
  loading: boolean;
  loaded: boolean;
  users: User[];
}

export const initialUserState: IUserReducerState = {
  loaded: false,
  loading: false,
  users: [],
};
