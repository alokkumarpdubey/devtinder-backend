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
