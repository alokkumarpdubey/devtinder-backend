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
- GET /user/feed

STATUS : ignored, interested, accepted, rejected