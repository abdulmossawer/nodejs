// function add(a,b){
//     return a+b
// }

// var add = function(a,b){
//     return a + b;
// }

// var add = (a,b) => { return a+b }

// var add = (a, b) => a+b;

// var result = add(3, 5)
// console.log(result);

// (function(){
//     console.log('Sadiq is a coder');
// })();

// function callBack(){
//     console.log('Adding is completed');
// }

// const add = function(a, b, callBack){
//     var result = a + b;
//     console.log('result:', result);
//     callBack()
// }

// add(3,15454, callBack)

// const add = function(a, b, sadiq){
//     var result = a + b;
//     console.log('result:', result);
//     sadiq()
// }

// // add(2,4, function(){
// //     console.log('Adding is completed');
// // })

// add(5,7789645, ()=> console.log('Adding complete'));

// const notes = require('./notes.js')
// var _ = require('lodash')

// console.log('Server is available');

// let age = 24

// var result = notes.addNumber(age,1)
// console.log(result);
// console.log(age);

// var data = ['Sadiq', 'Sadiq', 2, 5, 2, 7, 6, 7, 'Danish', 'Danish']
// var filter = _.uniq(data)
// console.log(filter);

const express = require("express");
const app = express();
const db = require("./db.js");
require("dotenv").config();
const passport = require('./auth.js')



const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

// Middleware function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); //Move on the next phase
};
app.use(logRequest);



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get("/" ,function (req, res) {
  res.send("Welcome to my hotel");
});

// Import the router files
const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");

//Use the routes
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("Abe main toh chll gya 3000 pr");
});
