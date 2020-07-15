console.log("------------------------------------");
console.log("controllers > travelController.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const travelDB = require('../models/travel');
const utils = require('../utils');
const middleware = require('../middlewares');
const FileType = require('file-type');
const path = require('path');
const fs = require('fs')

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Retrieves all travel listings GET REQUEST
exports.travel_search = (req, res) => {
    var travelPeriod = new Date(req.body.travelPeriod);

    // Check if travelPeriod request is valid 
    if (travelPeriod instanceof Date && !isNaN(travelPeriod)) {

        var travel = {
            country: req.body.country,
            travelPeriod: travelPeriod,
            price: req.body.price
        };

        travelDB.searchTravel(travel, function (err, result) {
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
    }
    else {
        res.status(400).send("Bad Request");
    }
};

// Retrieves all travel listings GET REQUEST
exports.travel_list = (req, res) => {
    travelDB.getAll(function (err, result) {
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

// Used to add a new travel listing listing to the database. POST REQUEST
exports.travel_add = (req, res) => {
    var travelPeriod = new Date(req.body.travelPeriod);

    // Check if travelPeriod request is valid 
    if (travelPeriod instanceof Date && !isNaN(travelPeriod)) {
        var travel = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            country: req.body.country,
            travelPeriod: travelPeriod
        };

        travelDB.createTravel(travel, function (err, result) {
            if (!err) {
                var output = {
                    "travelid": result
                }
                res.status(201).send(output);
            } else {
                if (err.code == 'ER_DUP_ENTRY') {
                    res.status(409).send("Conflict. Duplicated entry found!");
                }
                else {
                    res.status(500).send("Internal Server Error");
                }
            }
        });
    }
    else {
        res.status(400).send("Bad Request");
    }
};

// Deletes a travel listing given its id. The associated itinerary and reviews related to the travel listing would also be deleted. Idempotent. DELETE REQUEST 
exports.travel_delete = (req, res) => {
    var id = req.params.id;

    travelDB.deleteTravel(id, function (err, result) {
        if (!err) {
            if (result) {
                res.status(200).send("No Content");
            }
            else {
                res.status(404).send("Not Found!");
            }
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Updates a travel listing. PUT REQUEST
exports.travel_update = (req, res) => {
    var travelPeriod = new Date(req.body.travelPeriod);
    var id = req.params.id;

    if ((travelPeriod instanceof Date && !isNaN(travelPeriod)) && utils.isNumeric(id)) {
        var travel = {
            id: id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            country: req.body.country,
            travelPeriod: travelPeriod
        };

        travelDB.updateTravel(travel, function (err, result) {
            if (!err) {
                if (result.affectedRows) {
                    res.status(204).send("No Content");
                }
                else {
                    res.status(202).send("Accepted");
                }
            } else {
                if (err.code == 'ER_DUP_ENTRY') {
                    res.status(409).send("Conflict. Duplicated entry found!");
                }
                else {
                    res.status(500).send("Internal Server Error");
                }
            }
        });
    }
    else {
        res.status(400).send("Bad Request");
    }
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
        travelid: req.params.id,
        day: req.body.day,
        activity: req.body.activity,
    };

    travelDB.createItineraryById(itinerary, function (err, result) {
        if (!err) {
            var output = {
                "itineraryid": result
            };

            res.status(201).send(output);
        } else {
            if (err.code == 'ER_DUP_ENTRY') {
                res.status(409).send("Conflict. Duplicated entry found!");
            }
            else {
                res.status(500).send("Internal Server Error");
            }
        }
    });
};

// Retrieves reviews of a particular travel listing, including info like the username. (A table join is required). Note the created_at field retrieved is the creation datetime of the travel review. GET REQUEST
exports.travel_review_get = (req, res) => {
    var travelid = req.params.id;

    travelDB.getReviewId(travelid, function (err, result) {
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

// Retrieve a single travel by their id. GET Request
exports.travel_get = (req, res) => {
    var id = req.params.id;

    travelDB.getById(id, function (err, result) {
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
}

// Upload image of a particular travel listing
exports.travel_image_upload = (req, res) => {
    var travelid = req.params.id;

    middleware.upload(req, res, function (err) {
        if (!req.file) {
            if (req.fileValidationError) return res.status(415).send(req.fileValidationError);
            return res.status(400).send('No files selected');
        }
        else {
            if (err) return res.status(500).send("Internal Server Error");
            // Final check (By checking magic bytes of local file)
            (async () => {
                var {ext, mime} = await FileType.fromFile(path.dirname(__dirname) + "/public/uploads/" + req.file.filename);
                //=> {ext: 'jpg', mime: 'image/jpeg'}
                if (ext !== 'jpg' || mime !== 'image/jpeg') {
                    fs.unlink(path.dirname(__dirname) + "/public/uploads/" + req.file.filename, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send("Internal Server Error");
                        }
                        //file removed
                        return res.status(415).send("Only .jpg images are allowed");
                    })
                }
                else {
                    // Everything went fine.
                    travelDB.imageUpload(req.file.filename, travelid, function (err, result) {
                        if (err) return res.status(500).send("Internal Server Error");
                        return res.status(204).send("No Content");
                    });
                }
            })();
        }
    });
}

//  Retrieves the travel listing's promotion period, discount amount. GET Request
exports.travel_promotion_get = (req, res) => {
    var id = req.params.id;

    travelDB.getPromotionById(id, function (err, result) {
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

// Add the travel listing's promotion period, discount amount. POST Request
exports.travel_promotion_add = (req, res) => {
    var start_date = new Date(req.body.start_date);
    var end_date = new Date(req.body.end_date);
    var travelid = req.params.id;

    if (((start_date instanceof Date && !isNaN(start_date)) && (end_date instanceof Date && !isNaN(end_date))) && (utils.isNumeric(travelid))) {
        var promotion = {
            travelid: travelid,
            start_date: start_date,
            end_date: end_date,
            discount_amount: req.body.discount_amount
        };

        travelDB.createPromotionById(promotion, function (err, result) {
            if (!err) {
                var output = {
                    "promotionid": result
                };

                res.status(201).send(output);
            } else {
                if (err.code == 'ER_DUP_ENTRY') {
                    res.status(409).send("Conflict. Duplicated entry found!");
                }
                else {
                    res.status(500).send("Internal Server Error");
                }
            }
        });
    }
    else {
        res.status(400).send("Bad Request");
    }
};

// Delete the travel listing's promotion period, discount amount. DELETE Request
exports.travel_promotion_delete = (req, res) => {
    var travelid = req.params.tid;
    var promotionid = req.params.pid;

    if (!utils.isNumeric(travelid) || !utils.isNumeric(promotionid)) return res.status(400).send("Bad Request");

    travelDB.deletePromotion(travelid, promotionid, function (err, result) {
        if (!err) {
            if (result) {
                res.status(204).send("No Content");
            }
            else {
                res.status(404).send("Not Found!");
            }
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};