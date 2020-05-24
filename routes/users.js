// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require('express');
const app = express();
module.exports = app;

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Retrieve all of the users in the database.
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send("Content: Array of all the users in the database. The user schema below may be different from yours:");
});

// Used to add a new user to the database.
app.post('/', (req, res) => {
    res.statusCode = 200;
    res.send("Content: ID of the newly created user:");
});

// Retrieve a single user by their id.
app.get('/:id', (req, res) => {
    res.statusCode = 200;
    res.send("Content: A single user:");
});

// Update a single user. ID and created timestamp should not be updatable.
app.put('/:id', (req, res) => {
    res.statusCode = 204;
    res.send("Content: N/A");
});

// Used to add a new review to the database for a given user and travel listing.
app.post('/:uid/travel/:tid/review/', (req, res) => {
    res.statusCode = 201;
    res.send("Content: ID of the newly created user:");
})