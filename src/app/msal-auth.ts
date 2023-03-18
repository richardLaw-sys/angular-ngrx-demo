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
    authority: 'https://login.microsoftonline.com/Enter_the_Tenant_Info_Here',
    redirectUri: 'https://localhost:4200/',
    postLogoutRedirectUri: '',
    clientCapabilities: ['CP1'],
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
  apiTodoList: {
    endpoint: 'https://localhost:5001/api/',
    scopes: {
      read: ['api://Enter_the_Web_Api_Application_Id_Here/TodoList.Read'],
      write: ['api://Enter_the_Web_Api_Application_Id_Here/TodoList.ReadWrite'],
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [],
};
