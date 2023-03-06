import { User } from 'src/app/models/user';

export interface IUserReducerState {
  users: User[];
  selectedUser: User;
}

export const initialUserState: IUserReducerState = {
  users: [],
  selectedUser: {} as User,
};
