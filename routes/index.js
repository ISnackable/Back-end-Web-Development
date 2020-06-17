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
const path = require('path');
const user_controller = require('../controllers/userController')

// ------------------------------------------------------
// MF config / end points
// ------------------------------------------------------
app.use('/users', users);
// Used to add a new review to the database for a given user and travel listing. POST Request
app.post('/user/:uid/travel/:tid/review/', user_controller.user_add_review)
app.use('/travel', travel);

// GET, POST, PUT, DELETE, or any other HTTP request method for any other routes
app.all('*', (req, res) => {
    res.contentType('html');
    res.sendFile('public/error.html', {root: path.dirname(__dirname)});
    res.status(404);
});

module.exports = app; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount