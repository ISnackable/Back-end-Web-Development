const travelDB = require('../models/travel');

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Retrieves all travel listings GET REQUEST
exports.travel_list = (req, res) => {
    travelDB.getAll(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Used to add a new travel listing listing to the database. POST REQUEST
exports.travel_add = (req, res) => {
    var travel = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        country: req.body.country,
        travelPeriod: req.body.travelPeriod
    };

    travelDB.createTravel(travel, function (err, result) {
        if (!err) {
            var output = {
                "travelid" : result
            }
            res.status(201).send(output);
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Deletes a travel listing given its id. The associated itinerary and reviews related to the travel listing would also be deleted. Idempotent. DELETE REQUEST 
exports.travel_delete = (req, res) => {
    var id = req.params.id

    travelDB.deleteTravel(id, function (err, result) {
        if (!err) {
            res.status(204).send("No Content");
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Updates a travel listing. PUT REQUEST
exports.travel_update = (req, res) => {
    var travel = {
        id : req.params.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        country: req.body.country,
        travelPeriod: req.body.travelPeriod
    };

    travelDB.updateTravel(travel, function (err, result) {
        if (!err) {
            res.status(204).send("No Content");
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Retrieves all the itineraries of a particular travel listing. GET REQUEST
exports.travel_itineraries_list = (req, res) => {
    var id = req.params.id;

    travelDB.getItineraryById(id, function (err, result) {
        if (!err) {
            if (result) {
                res.status(200).send(result);
            }
            else {
                res.status(404).send("Not Found!");
            }
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Adds a one day itinerary for that travel listing. A travel listing can have a multiple day itinerary and thus we can many itinerary records for one travel listing. POST REQUEST
exports.travel_itineraries_add = (req, res) => {
    var itinerary = {
        travelid : req.params.id,
        day: req.body.day,
        activity: req.body.activity,
    };

    travelDB.createItineraryById(itinerary, function (err, result) {
        if (!err) {
            var output = {
                "itineraryid" : result
            };

            res.status(201).send(output);
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Retrieves reviews of a particular travel listing, including info like the username. (A table join is required). Note the created_at field retrieved is the creation datetime of the travel review. GET REQUEST
exports.travel_review_get = (req, res) => {

    var travelid = req.params.id

    travelDB.getReviewId(travelid, function (err, result) {
        if (!err) {
            if (result) {
                res.status(200).send(result);
            }
            else {
                res.status(402).send("No Content")
            }
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};