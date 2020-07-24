console.log("------------------------------------");
console.log("routes > index.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require('express');
const app = express();
const users = require('./users');
const travel = require('./travel');

// ------------------------------------------------------
// MF config / end points
// ------------------------------------------------------
app.use('/users', users);
app.use('/travel', travel);

// GET, POST, PUT, DELETE, or any other HTTP request method for any other routes
app.all('*', (req, res) => {
    res.status(404).send("Url not found!");
});

module.exports = app; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount