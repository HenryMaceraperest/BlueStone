import { BrowserCacheLocation, LogLevel } from "@azure/msal-browser";

export const msalEnvironment = {
  auth: {
    clientId: '<Enter ClientID here>',
    authority: '<Enter the authority here in the formap https://login.microsoftonline.com/tenantID>',
    redirectUri: 'https://localhost:4200',
    postLogoutRedirectUri: '/'
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage,
    storeAuthStateInCookie: false,
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

export const environment = {
  auth: {
    microsoftGraphUri: 'https://graph.microsoft.com/v1.0/me',
    graphScope: 'user.read'
  },
  currencyApi: {
    apiKey: "<Enter Currency API Key here>",
    apiBaseUri: "<Enter Currency base Uri here>"
  }
};
