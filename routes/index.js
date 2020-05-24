// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require('express');
const app = express();
module.exports = app;
const users = require('./users');
const path = require('path');

// ------------------------------------------------------
// MF config / end points
// ------------------------------------------------------
app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use('/users', users);

// Any other routes
app.all('*', (req, res) => {
    res.contentType('html');
    res.sendFile('public/error.html', {root: path.dirname(__dirname)});
    res.status(500);
});