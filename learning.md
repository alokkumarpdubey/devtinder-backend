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