import * as fromUser from '../state/user-state';
import * as fromAppConfig from '../state/app-configuration-state';

export interface IRootReducerState {
  usersState: fromUser.IUserReducerState;
  appConfigState: fromAppConfig.IAppConfigurationState;
}
