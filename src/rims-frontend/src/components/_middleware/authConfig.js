import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
	auth: {
		clientId: window._env_.ADB2C_CLIENT_ID,
		authority: window._env_.ADB2C_AUTHORITY,
		knownAuthorities: window._env_.ADB2C_KNOWN_AUTHORITIES.split(','),
		redirectUri: window._env_.ADB2C_REDIRECT_URI,
		postLogoutRedirectUri: window._env_.ADB2C_POST_LOGOUT_REDIRECT_URI
	},
	cache: {
		// More information here: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/caching.md
		// Using localStorage to allow for cross-tab use
		cacheLocation: 'localStorage',
		storeAuthStateInCookie: false
	},
	system: {
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case LogLevel.Error:
						console.error(message);
						return;
					case LogLevel.Info:
						console.info(message);
						return;
					case LogLevel.Verbose:
						console.debug(message);
						return;
					case LogLevel.Warning:
						console.warn(message);
						return;
					default:
						console.log(message);
						return;
				}
			}
		}
	}
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
	scopes: window._env_.ADB2C_LOGIN_SCOPES
		? window._env_.ADB2C_LOGIN_SCOPES.split(',')
		: []
};

export const editProfile = {
	authority: window._env_.ADB2C_EDIT_PROFILE_AUTHORITY
};

export const policyNames = {
	signUpSignIn: window._env_.ADB2C_SIGNUP_SIGNIN_POLICY
};
