import {
  LogLevel,
  Configuration,
  BrowserCacheLocation,
} from '@azure/msal-browser';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export const msalConfig: Configuration = {
  auth: {
    clientId: 'e62659c5-138d-4584-9686-d5564b18ace8',
    authority:
      'https://login.microsoftonline.com/6c5022bf-bac3-426e-86e6-25596394470a',
    redirectUri: 'http://localhost:4200/',
    postLogoutRedirectUri: '/',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage,
    storeAuthStateInCookie: isIE, //for IE
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
};

export const protectedResources = {
  apiScopeConfiguration: {
    endpoint: 'https://localhost:5001/api/',
    scopes: {
      get: ['api://0f612509-5c06-4482-900d-255b5578ddce/Api.Read'],
      post: ['api://0f612509-5c06-4482-900d-255b5578ddce/Api.Write'],
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 */
export const authRequest = {
  scopes: ['User.Read'],
};
