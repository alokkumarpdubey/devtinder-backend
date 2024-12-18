- create root folder : devtinder
- initiated a project : npm init
- created a package.json file : npm init -y
- installed express : npm install express
- created src folder and app.js file in src folder
- created server in node src/app.js
    const express = require("express");
    const app = express();
- listen on port 3000 : 
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
- created request handlers
    app.use("/hello", (req, res) => {
        res.send("Hello from the server.");
    });
    app.use("/test", (req, res) => {
        res.send("Test from the server.");
    });
- tested server : curl http://localhost:3000/hello
- tested server : curl http://localhost:3000/test
- added nodemon : npm install -g nodemon
- learn about caret vs tilde in package.json
- updated script in package.json : "start": "node src/app.js", "dev": "nodemon src/app"
- tested server : npm run dev
- routing handlers
    orders in which routing handlers are defined matter
    first match first serve
    /hello and /test are defined before /, so they will be matched first
    / will be matched last
    if no match is found, it will return "Cannot GET /"
- using postman to test api
    install postman
    test api : http://localhost:3000/hello
    test api : http://localhost:3000/test
    test api : http://localhost:3000/
- some routing patterns
    "/user"
    "/user/"
    "/user/123"
    "/user/123/"
    "/user/123/profile"
- routing parameters (dynamic values / regex)
    "/user?userId=123"
    "/user/123"
    Example :
        app.get("/user/:userId", (req, res) => {
            console.log("req.query", req.query);
            console.log("req.params", req.params);
            res.send({ name: "Alok", age: 30 });
        });
- explain middleware/route handlers
    middleware is functions between request and response
    used for authentication, logging, validation, etc.
    next() is used to pass control to the next middleware
    next() is not a function to be called, it's just a placeholder for the next middleware
    array of middleware functions are executed in sequence
    if any middleware function does not call next(), execution will stop
- Why do we need middleware?
- Error handling middleware
    - used to handle errors in the application
    - must have 4 parameters : err, req, res, next
    - must be defined after all other routes/middleware
    - if error is thrown in any middleware, it will be caught by the error handling middleware
    - can be used to send a custom error message or status code
- create cluster in mongodb atlas
- connect to cluster in node.js
    install mongoose : npm install mongoose
    connect to cluster :
        const mongoose = require("mongoose");
        const connectDB = async () => {
            await mongoose.connect("mongodb+srv://alokkumarpdubey:A5Hgq7dvMBOINpf4@learningnode.lk5pa.mongodb.net/");
        }
        module.exports = connectDB;
    connect to database and listen on port 3000 :
        connectDB().then(() => {
            console.log("connected to database");
            app.listen(3000, () => {
                console.log("Server is running on port 3000");
            });
        }).catch(err => {
            console.log("error connecting to database", err);
        })
- create schema and model
    const mongoose = require("mongoose");
    const userSchema = new mongoose.Schema({
        name: String,
        age: Number
    });
    const User = mongoose.model("User", userSchema);
- create POST route for signup
    app.post("/signup", async (req, res) => {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    });
- Push some data to database using postman
    http://localhost:3000/signup
    body : 
        {
            "firstName": "Alok",
            "lastName": "Dubey",
        }
- error handling while pushing data to database
- include express.json() middleware
- make your API dynamic
    - use req.body instead of hardcoded values
- create APIs for finding user by email and getting all users
- create a DELETE API for deleting a user by id
    - use findByIdAndDelete method
- create a PATCH API for updating a user by id
    - use findByIdAndUpdate method
    - use {new: true} option to return the updated user
- Explore schema options
    - validate : used to validate the data before saving to database
    - trim : used to remove whitespace from the data
    - lowercase : used to convert the data to lowercase
    - unique : used to make the data unique
    - minlength : used to set the minimum length of the data
    - maxlength : used to set the maximum length of the data
    - timestamps : automatically adds createdAt and updatedAt fields
    - improved user schema
        - added email, password, age, gender, photo, about, skills
        - added validations for email, password, age, gender
        - added default values for photo and about
        - added timestamps to the schema
- Data sanitization at API level
    - validate the data before saving to database
    - use try catch to handle errors
    - send appropriate status codes and messages
- Learn about validator package
    - install validator : npm install validator
    - use validator to validate the data
    - validator.isEmail(value) : used to validate email
    - validator.isStrongPassword(value) : used to validate password
- Install and explore validator package
    - npm install validator
    - use validator to validate the data
    - validator.isEmail(value) : used to validate email
    - validator.isStrongPassword(value) : used to validate password
    - validator.isURL(value) : used to validate URL
- Data sanitization for signup request
    - validate firstName, lastName, email, password
    - throw error if any of the fields are missing or invalid
    - send 400 status code and error message if any of the fields are missing or invalid
    - hash the password before saving to database
    - use bcrypt to hash the password
- Create a login API
    - validate email and password
    - send 400 status code and error message if email or password is missing or invalid
    - find user by email
    - compare the password using bcrypt.compare
    - send 200 status code and success message if email and password are correct
- Send a cookie to the client
    - use res.cookie to send a cookie to the client
    - to read cookie, use req.cookies
    - cookie parser is used to parse the cookie
        - install cookie parser : npm install cookie-parser
    - JSONWEBTOKEN : use jwt to sign the cookie
        - install jsonwebtoken : npm install jsonwebtoken
        - use jwt.sign to sign the cookie
        - use jwt.verify to verify the cookie
        - use JWT_SECRET to sign and verify the cookie
        - JWT_SECRET is a secret key used to sign and verify the cookie
        - create profile API to get the user details
            - use jwt to get the user details
            - send 200 status code and user details
            - send 401 status code and unauthorized message if token is missing or invalid

- Add userAuth middleware to protect all API
- setting JWT token and cookie expiration time
- create userSchema methods
    - getJWTToken
    - validatePassword
- Group APIs into different routers
    - create route folders : src/routes
        - create authRouter.js in routes folder
        - create profileRouter.js in routes folder
        - create requestRouter.js in routes folder
    - Import routers in app.js
    - test APIs using postman
- Created GET /logout API
    - clear the cookie
    - send 200 status code and success message
- Created PATCH /profile/edit API
    - validate the request
    - update the user profile
    - send 200 status code and success message
- Assignments
    - Create PATCH /profile/password API
        - validate the request
        - update the user photo
        - send 200 status code and success message

- Created Connection Request Schema and APIs
    - POST /request/send/:status/:toUserId
    - proper validation for request body and params
    - Covered corner cases for API validations
    - what is indexing in mongoose?
        - indexing is used to improve the performance of the queries
        - indexing is used to create a faster access path to the data
        - indexing is used to enforce uniqueness of the data
        - compound indexing
    - $or and $and operators in mongoose
        - $or is used to match any of the conditions
        - $and is used to match all the conditions
    - pre middleware in mongoose
        - pre middleware is used to perform some actions before the data is saved, updated and deleted

- GET /user/requests/received API
- reference in mongoose
    - reference is used to create a relationship between two collections (user collection and connection request collection)
    - reference is created using ref option in schema
- populate method in mongoose
    - populate method is used to replace the reference with actual data
    - populate method is used to get the data from other collection (ex : user details from user collection in connection request collection)
- GET /user/connections API
    - $or and $and operators in mongoose
        - $or is used to match any of the conditions
        - $and is used to match all the conditions

- GET /user/feed API
    - get all users except logged in user, his connections, ignored users, already sent the connection request
    - use $nin operator in mongoose
        - $nin is used to exclude the data from the query
        - explore other comparison operators in mongoose like $ne, $gt, $gte, $lt, $lte
        https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
        - $eq : Matches values that are equal to a specified value.
        - $ne : Matches all values that are not equal to a specified value.
        - $gt : Matches values that are greater than a specified value.
        - $gte : Matches values that are greater than or equal to a specified value.
        - $lt : Matches values that are less than a specified value.
        - $lte : Matches values that are less than or equal to a specified value.   
    - use Set to store the user ids
    - use pagination for feed API
        - use skip and limit in mongoose query
        - send page and limit in query params
        - send totalPages and currentPage in response

Local development setup =>
- to enable cors in the server, add `cors` middleware to the server
        - `npm install cors`
        - `app.use(cors({credentials: true, origin: "http://localhost:5173"}));`


# PACKAGES WE USED
- bcrypt : used to hash the password (https://www.npmjs.com/package/bcrypt)
- cookie-parser : used to parse the cookie (https://www.npmjs.com/package/cookie-parser)
- jsonwebtoken : used to sign the cookie (https://www.npmjs.com/package/jsonwebtoken)
- mongoose : used to interact with the database (https://www.npmjs.com/package/mongoose)
- validator : used to validate the data (https://www.npmjs.com/package/validator)
- express : used to create the server (https://www.npmjs.com/package/express)

"dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.7",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.7.2",
    "validator": "^13.12.0"
  }








        - JWT_SECRET should be stored in environment variables
        - JWT_SECRET should be stored in .env file
        - use dotenv to load environment variables
            - install dotenv : npm install dotenv
            - load environment variables : require('dotenv').config()
    