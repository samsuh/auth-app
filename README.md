Auth Flow: 
Signing up --> Verify Email is not in use --> JSON Web Token (JWT)

Signing In --> Verify Email/Password --> JWT

Auth'd Request --> Verify Token (exists and is correct using JWT Strategy) --> Resource Access on protected route 


User Experience Flow: 
1. Arrive on Landing page (to be built later)
2. Get to /signup route (Signup Button)
3. Create account using Email and Password. 
4. Automatically get authenticated using JWT, and redirected to their Dashboard on the route /dashboard
