console.log("------------------------------------");
console.log("routes > travel.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require('express');
const app = express();
const travel_controller = require('../controllers/travelController');
const middleware = require('../middlewares');

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Retrieves all travel listings 
app.get('/', travel_controller.travel_list);

// Used to add a new travel listing listing to the database.
app.post('/', travel_controller.travel_add);

// Deletes a travel listing given its id. The associated itinerary and reviews related to the travel listing would also be deleted. Idempotent. 
app.delete('/:id', middleware.idSanitation, travel_controller.travel_delete);

// Updates a travel listing.
app.put('/:id', travel_controller.travel_update);

// Retrieves all the itineraries of a particular travel listing.
app.get('/:id/itinerary', middleware.idSanitation, travel_controller.travel_itineraries_list);

// Add a one day itinerary for that travel listing. A travel listing can have a multiple day itinerary and thus we can many itinerary records for one travel listing.
app.post('/:id/itinerary', middleware.idSanitation, travel_controller.travel_itineraries_add);

// Retrieves reviews of a particular travel listing, including info like the username. (A table join is required). Note the created_at field retrieved is the creation datetime of the travel review.
app.get('/:id/review', middleware.idSanitation, travel_controller.travel_review_get);

// Retrieve a single travel by their id. GET Request
app.get('/:id', middleware.idSanitation, travel_controller.travel_get);

// Adds thumbnail image to a travel listing. PUT Request
app.put('/:id/thumbnail', middleware.idSanitation, travel_controller.travel_image_upload);

// Retrieves the travel listing's promotion period, discount amount. GET Request
app.get('/:id/promotion', middleware.idSanitation, travel_controller.travel_promotion_get)

// Add the travel listing's promotion period, discount amount. POST Request
app.post('/:id/promotion', travel_controller.travel_promotion_add)

// Delete the travel listing's promotion period, discount amount. DELETE Request
app.delete('/:tid/promotion/:pid', travel_controller.travel_promotion_delete)

// Search the travel listing's by country and travel period with either maximum price or no price. GET Request
app.post('/search', travel_controller.travel_search) // CHANGE TO GET REQUEST !!!

module.exports = app; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount