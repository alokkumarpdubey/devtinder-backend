# DevTinder API List

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter
- POST /request/send/:status/:toUserId
- POST /request/review/:status/:requestId


userRouter
- GET /user/requests
- GET /user/connections
- GET /user/feed?page=1&limit=5
    - User should be able to see all the users card except
        - 0. his own card
        - 1. his connections
        - 2. ignored users
        - 3. already sent the connection request

STATUS : ignored, interested, accepted, rejected