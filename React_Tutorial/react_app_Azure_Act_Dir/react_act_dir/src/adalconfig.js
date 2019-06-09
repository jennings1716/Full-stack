import { AuthenticationContext } from 'react-adal';
const adalConfig = {
 tenant: 'xxxxx.onmicrosoft.com',
 clientId: '',//client-id
 endpoints: {
   api: ''//identitymetdata
 },
 postLogoutRedirectUri: window.location.origin,
 redirectUri: '',//return URL
 cacheLocation: 'sessionStorage'
};
export const authContext = new AuthenticationContext(adalConfig);
export const getToken = () => {
 return authContext.getCachedToken(authContext.config.clientId);
};