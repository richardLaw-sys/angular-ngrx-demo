import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  AppRequestLoading,
  AppRequestError,
  AppRequestLoaded,
} from '../store/actions/app-configuration-action';
import { GetUserByIdAction } from '../store/actions/user-action';
import {
  getLoading,
  getError,
  getLoaded,
} from '../store/selector/app-configuration-selector';
import { getSelectedUser } from '../store/selector/user-selector';
import { IRootReducerState } from '../store/state/app-state';

@Injectable()
export class PostService {
  userAPi = {} as User;
  constructor(
    private apiService: ApiService,
    private store: Store<IRootReducerState>
  ) {}

  async getUserByApi() {
    return await this.apiService.getUserFromApi();
  }

  async getUserByGraphApi() {
    return await this.apiService.getUserFromGraphApi();
  }
}
