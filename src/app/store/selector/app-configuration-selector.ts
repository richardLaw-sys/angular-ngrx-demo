import { createSelector } from "@ngrx/store";
import { IAppConfigurationState } from "../state/app-configuration-state";
import { IRootReducerState } from "../state/app-state";

const appConfigState = (state: IRootReducerState) => state.appConfigState;

export const getLoading = createSelector(
  appConfigState,
  (state: IAppConfigurationState) => state.loading
);

export const getLoaded = createSelector(
  appConfigState,
  (state: IAppConfigurationState) => state.loaded
);

export const getError = createSelector(
  appConfigState,
  (state: IAppConfigurationState) => state.error
);
