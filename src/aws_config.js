import Amplify from "aws-amplify";
Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_COGNITO_CREDENTIALS_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_COGNITO_CREDENTIALS_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_CREDENTIALS_USER_POOL_ID,
    userPoolWebClientId:
      process.env.REACT_APP_COGNITO_CREDENTIALS_USER_POOL_WEB_CLIENT_ID
  }
});
