# OAuth Callbacks

The views in this directory and "intermediate" views, which are called by by oAuth providers such as Google or Facebook after the user successfully authenticated on their platform. The Get-Request is immediately fowarded to our API and converted there. Afterwards, the user will be redirected to the dashboard.

Example:
User goes to /login and clicks on "Login with Google" -> User is forwarded to Google and authenticates -> User is redirected to GoogleOAuthCallback.vue -> The request is fowarded to our API -> There, an access token for the user will be created -> the access token is returned to the client -> The user is redirected to /dashboard.
