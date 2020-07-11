console.log("------------------------------------");
console.log("routes > users.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require('express');
const app = express();
const user_controller = require('../controllers/userController');
const middleware = require('../middlewares');

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Retrieve all of the users in the database. GET Request
app.get('/', user_controller.user_list);

// Used to add a new user to the database. POST Request
app.post('/', user_controller.user_add);

// Retrieve a single user by their id. GET Request
app.get('/:id', middleware.idSanitation, user_controller.user_get);

// Update a single user. ID and created timestamp should not be updatable. PUT Request
app.put('/:id', middleware.verifyToken, middleware.idSanitation, middleware.userAuthorization, user_controller.user_update);

// Login a single user. POST REQUEST
app.post('/login', user_controller.user_login);

module.exports = app; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount