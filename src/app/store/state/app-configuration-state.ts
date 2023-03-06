import { AppConfiguration } from 'src/app/models/app-configuration';

export interface IAppConfigurationState {
  loading: boolean;
  loaded: boolean;
  isError: boolean;
  error: string;
}

export const initialAppConfigState: IAppConfigurationState = {
  loading: false,
  loaded: false,
  isError: false,
  error: '',
};
