// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require('express');
const app = express();

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Retrieves all travel listings 
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send("Content: Array of all the travel listings:");
});

// Used to add a new travel listing listing to the database.
app.post('/', (req, res) => {
    res.statusCode = 201;
    res.send("Content: ID of the newly created listing:");
});

// Deletes a travel listing given its id. The associated itinerary and reviews related to the travel listing would also be deleted. Idempotent. 
app.delete('/:id', (req, res) => {
    res.statusCode = 204;
    res.send("Content: N/A");
});

// Updates a travel listing.
app.put('/:id', (req, res) => {
    res.statusCode = 204;
    res.send("Content: N/A");
});

// Retrieves all the itineraries of a particular travel listing.
app.get('/:id/itinerary', (req, res) => {
    res.statusCode = 200;
    res.send(`[
        {
            "itineraryid": “1”,
            "day": “1”,
            "activity": “Visit Perth Frementle market”,
            "created_at": "2020-06-20 18:54:57"
        },
        ...
    ]
    `);
});

// Adds a one day itinerary for that travel listing. A travel listing can have a multiple day itinerary and thus we can many itinerary records for one travel listing.
app.post('/:id/itinerary', (req, res) => {
    res.statusCode = 201;
    res.send("Content: ID of the newly created listing:");
});

// Retrieves reviews of a particular travel listing, including info like the username. (A table join is required). Note the created_at field retrieved is the creation datetime of the travel review.
app.get('/:id/review', (req, res) => {
    res.statusCode = 200;
    res.send(`[
        {
            "travelid": “1”,
            "content": "Enjoyed the vacation! It was great!",
            “rating”: “5”,
            "username": "Terry Tan",
            "created_at": "2020-06-22 18:54:57"
        },
        ...
    ]
    `);
});

module.exports = app; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount