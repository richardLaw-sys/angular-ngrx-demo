import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  ProtectedResourceScopes,
} from '@azure/msal-angular';
import {
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { authRequest, msalConfig, protectedResources } from './msal-auth';

/** Here we pass the configuration parameters to create an MSAL instance.*/
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/** Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: authRequest,
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<
    string,
    Array<string | ProtectedResourceScopes> | null
  >();

  protectedResourceMap.set(protectedResources.apiScopeConfiguration.endpoint, [
    {
      httpMethod: 'GET',
      scopes: [...protectedResources.apiScopeConfiguration.scopes.get],
    },
    {
      httpMethod: 'POST',
      scopes: [...protectedResources.apiScopeConfiguration.scopes.post],
    },
  ]);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
  };
}
