# AUTH IMPLEMENTATION STRATEGY


LOGIN_SCHEME = GOOGLE | FACEBOOK | OTP_BASED
ITEMS TO BE STORED IN APP PERSISTENT STOAGE 
- REFRESH_TOKEN
- LOGIN_SCHEME_USED

<!-- 
Access token which will be used to call the API will never be stored in App Persistent Storage. 
For OTP_BASED login scheme system will generate a single use long lived Refresh Token 
which can be exchanged with the backend server to obtain a new Access token. 
For GOOGLE / FACEBOOK login scheme, the IdToken received from Google/Facebook 
will act as Refresh Token. Backend server will validate the token by calling Google/Facebook 
API from backend. If the token is valid then issue a new Access Token. 
Access Token for the backend API server will be shortlived (e.g: 1 hour) and will never be 
stored in the Persistent storage. It will be stored within the react context or redux store.

 -->


1. User opens the app and the splash screen is shown. 
2. 


