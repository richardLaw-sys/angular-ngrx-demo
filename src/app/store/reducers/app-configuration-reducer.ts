import { Action } from '@ngrx/store';
import { AppConfigAction } from '../actions';
import {
  APP_REQUEST_ERROR,
  APP_REQUEST_LOADED,
  APP_REQUEST_LOADING,
} from '../actions/app-configuration-action';
import {
  initialAppConfigState,
  IAppConfigurationState,
} from '../state/app-configuration-state';

export function AppConfigReducer(
  state = initialAppConfigState,
  action: AppConfigAction
): IAppConfigurationState {
  switch (action.type) {
    case APP_REQUEST_LOADING: {
      return {
        ...state,
        loading: true,
        error: '',
        isError: false,
        loaded: false,
      };
    }
    case APP_REQUEST_LOADED: {
      return {
        ...state,
        loaded: true,
        loading: false,
        isError: false,
        error: '',
      };
    }
    case APP_REQUEST_ERROR: {
      return {
        ...state,
        loaded: true,
        loading: false,
        error: action.payload.error,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
}
