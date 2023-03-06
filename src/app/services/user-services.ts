import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { take } from 'rxjs/operators';
import { IRootReducerState } from '../store/state/app-state';
import { getSelectedUser, getUsers } from '../store/selector/user-selector';
import {
  getError,
  getLoaded,
  getLoading,
} from '../store/selector/app-configuration-selector';
import {
  GetUsersAction,
  GetUserByIdAction,
} from '../store/actions/user-action';
import {
  APP_REQUEST_ERROR,
  APP_REQUEST_LOADING,
  APP_REQUEST_LOADED,
  AppRequestLoading,
  AppRequestLoaded,
  AppRequestError,
} from '../store/actions/app-configuration-action';

@Injectable()
export class UserService {
  constructor(
    private apiService: ApiService,
    private store: Store<IRootReducerState>
  ) {}

  getUserList(
    force = false
  ): [Observable<boolean>, Observable<User[]>, Observable<string>] {
    const loading$ = this.store.select(getLoading);
    const loaded$ = this.store.select(getLoaded);
    const error$ = this.store.select(getError);
    const getUserData$ = this.store.select(getUsers);

    combineLatest([loaded$, loading$])
      .pipe(take(1))
      .subscribe((data) => {
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(new AppRequestLoading());
          this.apiService.getAllUser().subscribe({
            next: (response) => {
              this.store.dispatch(new GetUsersAction({ data: response }));
            },
            error: (e) => {
              this.store.dispatch(new AppRequestError({ error: e }));
            },
            complete: () => {
              this.store.dispatch(new AppRequestLoaded());
            },
          });
        }
      });

    return [loading$, getUserData$, error$];
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

  getUserById(
    Id: number,
    force = false
  ): [Observable<boolean>, Observable<User>, Observable<string>] {
    const loading$ = this.store.select(getLoading);
    const error$ = this.store.select(getError);
    const user$ = this.store.select(getSelectedUser);

    user$.pipe(take(1)).subscribe((res) => {
      const isUserInStore = res?.id == Id;
      if (force || !isUserInStore) {
        this.store.dispatch(new AppRequestLoading());
        this.apiService.getUser(Id).subscribe({
          next: (response) => {
            this.store.dispatch(new GetUserByIdAction({ data: response }));
          },
          error: (e) => {
            this.store.dispatch(new AppRequestError({ error: e }));
          },
          complete: () => {
            this.store.dispatch(new AppRequestLoaded());
          },
        });
      }
      return res;
    });

    return [loading$, user$, error$];
  }
}
