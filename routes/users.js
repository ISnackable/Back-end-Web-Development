// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require('express');
const app = express();
const user_controller = require('../controllers/userController')

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Retrieve all of the users in the database. GET Request
app.get('/', user_controller.user_list);

// Used to add a new user to the database. POST Request
app.post('/', user_controller.user_add);

// Retrieve a single user by their id. GET Request
app.get('/:id', user_controller.user_get);

// Update a single user. ID and created timestamp should not be updatable. PUT Request
app.put('/:id', user_controller.user_update);

// Used to add a new review to the database for a given user and travel listing. POST Request
app.post('/:uid/travel/:tid/review/', user_controller.user_add_review)

module.exports = app; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount