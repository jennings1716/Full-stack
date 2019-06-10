import { AuthenticationContext,adalFetch,withAdalLogin} from 'react-adal';
const adalConfig = {
 tenant: 'jenningsteam.onmicrosoft.com',
 clientId: 'xxx',//client-id
 endpoints: {
   api: 'https://login.microsoftonline.com/xxx-xxx/.well-known/openid-configuration',//identitymetdata,
   graphApi: 'https://graph.microsoft.com',
 },
 postLogoutRedirectUri: window.location.origin,
 redirectUri: 'http://localhost:3000/auth/openid/return/',//return URL
 cacheLocation: 'localStorage'
};
export const authContext = new AuthenticationContext(adalConfig);
export const getToken = () => {
 return authContext.getCachedToken(authContext.config.clientId);
};

export const adalApiFetch = (fetch, url, options) =>{
  return adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

}

export const adalGraphFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.graphApi, fetch, url, options);


export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);