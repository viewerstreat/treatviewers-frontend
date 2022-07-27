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
2. Read values from App Persistent Storage.
- LOGIN_SCHEME_USED
- REFRESH_TOKEN 


LOGIN_SCHEME_USED = GOOGLE 
- invoke silent login 
- if idToken received 
call backend API with the idToken /getAppToken scheme = google, token = idToken 
Response: 
    - apiToken 
    - user details 
        - put the apiToken in redux store 
        - put user details in redux store 
        - put a flag in redux store to indicate valid user login exists.
        - redirect to home screen 
        - put a flag in the redux store to mark that a valid user login exists.


- If silent login failed or idToken is null 
then clear values from App Persistent storage. 
This will be similar to the situation as if user hasn't logged in yet. 
Redirect to home screen. 


LOGIN_SCHEME_USED = FACEBOOK 
- get FB_TOKEN from async storage 
- if FB_TOKEN does not exists in the async storage then clear values from async storage
similar to the situation as if user hasn't logged in yet. 
- redirect to the home screen 

call AccessToken api to get a new token 
if new token is received then user has a valid login 
call backend API with the idToken /getAppToken scheme = facebook, token = fbToken  
Response: 
    - apiToken 
    - user details 
        - put the apiToken in redux store 
        - put user details in redux store 
        - put a flag in redux store to indicate valid user login exists.
        - redirect to home screen 
        - put a flag in the redux store to mark that a valid user login exists.


if new token is not received then user does not have a valid login 
then clear values from App Persistent storage. 
This will be similar to the situation as if user hasn't logged in yet. 
Redirect to home screen. 



LOGIN_SCHEME_USED = OTP_BASED 
- get REFRESH_TOKEN from the async storage 
- if REFRESH_TOKEN does not exists in the async storage then clear values from async storage 
similar to the situation as if user hasn't logged in yet. 
- redirect to the home screen 

call backend API with the refresh token /getAppToken scheme = otp_based, token = refreshToken  
Response: 
    - apiToken 
    - new refreshToken 
    - user details 
        - put the apiToken in redux store 
        - put user details in redux store 
        - put a flag in redux store to indicate valid user login exists.
        - redirect to home screen 
        - put a flag in the redux store to mark that a valid user login exists.



LOGIN_SCHEME_USED = NULL 
- Do nothing and redirect to home screen. 




<!-- -------------- -->
1. Login with Google -> 
2. Attempt login
call /api/v1/user/create api with scheme as google, idToken and user details. 
- backend /api/v1/user/create api validate the google idToken 
2. Response apiToken , user details 
3. store apiToken, user details in redux store,
4. save LOGIN_SCHEME_USED = GOOGLE in async storage 

<!-- -------------- -->
1. Login with Facebook -> 
2. Get AccessToken from facebook.  
3. call /api/v1/user/create api with scheme as facebook, fbToken 
4. backend /api/v1/user/create api validate the fbToken 
5. Response apiToken, user details 
6. store apiToken, user details in redux store,
7. save LOGIN_SCHEME_USED = FACEBOOK in async storage 
8. save fbToken in async storage 


<!--
/api/v1/user/renewToken 
request parameters:
- scheme
- ?idToken 
- ?fbToken
- ?refreshToken 
-->

if scheme = google 
> validate google idToken with google-auth-library 
> if the idToken is not valid then return 400 Bad Request
> get user details from the database by email id 
> if the user not found then return 400 Bad Request
> generate an apiToken short lived 
> return success response with apiToken and user details. 

if scheme = facebook 
> validate facebook fbToken with facebook graph API me
> if the fbToken is not valid then return 400 Bad Request 
> get user details from the database by email id 
> if the user not found then return 400 Bad Request 
> generate an apiToken short lived 
> return success response with apiToken and user details. 

if scheme = otp_based 
> check if the token exists in the usedToken database 
> if the token exists in usedToken database then return 400 Bad Request. 
> validate refreshToken (JWT validation)
> refreshToken should be valid, signature wise and not expired.
> get the userId from the decoded payload from the token 
> insert into database and mark as the token as used already 
> get the user details from the database 
> if there user details not found then return 400 Bad Request 
> generate a new RefreshToken (long lived)
> generate a new apiToken (short lived)
> return success response with apiToken, refreshToken and user details.

<!-- 
/api/v1/user/create
Request Parameter:
- scheme = GOOGLE | FACEBOOK | OTP_BASED 
- User Details = name, email, phone, profilePic 
- ?idToken 
- ?fbToken 
 -->
if scheme = google 
> validate google idToken with google-auth-library 
> if the idToken is not valid then return 400 Bad Request
> validate the email in the payload and from the idToken is same otherwise return 400 Bad Request
> find user in the data with email id 
> update the value in the database
> if user does not exists in the data then insert with new user Id. 
> save the loginScheme in database
> generate an apiToken short lived 
> return success response with apiToken and user details. 

if scheme = facebook 
> validate facebook fbToken with facebook graph API me
> if the fbToken is not valid then return 400 Bad Request 
> validate the email in the payload and from me API is same otherwise return 400 Bad Request
> find user in the data with email id 
> update the value in the database
> if user does not exists in the data then insert with new user Id. 
> save the loginScheme in database
> generate an apiToken short lived 
> return success response with apiToken and user details. 

if scheme = otp_based
> check if the phone no already exists in the database then return 400 Bad Request 
> insert into user database 
> generate a new otp and send otp through sms 
> save the loginScheme in database
> return success response



<!-- 
/api/v1/user/checkOtp
Request Parameter:
- PhoneNo
- otp
 -->
> check the user database by phone no
> if no user found then return 400 Bad Request 
> findOneAndUpdate Otp database and set isUsed = true 
> where phone, otp, isUsed=false, validTill > current timestamp 
> if the update was unsucessful then return 400 Bad Request 
> generate new refreshToken (long lived)
> generate new apiToken (short lived)
> return success reponse with apiToken and user details


<!-- 
/api/v1/user/verify
Request Parameter: 
- phoneNo
 -->
> check if the user database by phoneNo 
> if no user found then return 400 Bad Request 
> generate a new otp and send otp through sms 
> save the loginScheme in database
> return success response






