// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require('express');
const app = express();
const users = require('./users');
const travel = require('./travel');
const path = require('path');

// ------------------------------------------------------
// MF config / end points
// ------------------------------------------------------
app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use('/users', users);
app.use('/travel', travel);

// GET, POST, PUT, DELETE, or any other HTTP request method for any other routes
app.all('*', (req, res) => {
    res.contentType('html');
    res.sendFile('public/error.html', {root: path.dirname(__dirname)});
    res.status(500);
});

module.exports = app; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount