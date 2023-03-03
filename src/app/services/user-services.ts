import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { take } from 'rxjs/operators';
import { Post } from '../models/post';
import { Comment } from '../models/post';
import { IRootReducerState } from '../store/state/app-state';
import {
  getLoaded,
  getLoading,
  getUsers,
} from '../store/selector/user-selector';
import {
  UserListRequestAction,
  UserListSuccessAction,
} from '../store/actions/user-action';

@Injectable()
export class UserService {
  constructor(
    private apiService: ApiService,
    private store: Store<IRootReducerState>
  ) {}

  getUserList(force = false): [Observable<boolean>, Observable<User[]>] {
    const loading$ = this.store.select(getLoading);
    const loaded$ = this.store.select(getLoaded);
    const getUserData$ = this.store.select(getUsers);

    combineLatest([loaded$, loading$])
      .pipe(take(1))
      .subscribe((data) => {
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(new UserListRequestAction());
          this.apiService.getAllUser().subscribe((response) => {
            this.store.dispatch(new UserListSuccessAction({ data: response }));
          });
        }
      });

    return [loading$, getUserData$];
  }

  deleteUser(id: number) {
    // first we will call actual delete api
  }

  updateUser(data: User) {
    // first send details to actual api
  }

  addUser(data: User) {
    // first call api to add a user and then update it in store
  }

  getUserById(id: number) {
    // get user from reducer if exist otherwise from api
    return this.apiService.getUser(id);
  }
}
