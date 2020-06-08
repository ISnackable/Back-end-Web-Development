const userDB = require('../models/user');

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Retrieve all of the users in the database.
exports.user_list = (req, res) => {
    userDB.getAll(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Used to add a new user to the database.
exports.user_add = (req, res) => {
    var myUser = {
        username: req.body.username,
        email: req.body.email,
        profile_pic_url: req.body.profile_pic_url
    };

    userDB.createUser(myUser, function (err, result) {
        if (!err) {
            var output = {
                "userid" : result
            }
            res.status(201).send(output);
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Retrieve a single user by their id.
exports.user_get = (req, res) => {
    var id = req.params.id;

    userDB.getById(id, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Update a single user. ID and created timestamp should not be updatable.
exports.user_update = (req, res) => {
    res.statusCode = 204;
};

// Used to add a new review to the database for a given user and travel listing.
exports.user_add_review = (req, res) => {
    res.statusCode = 201;
    res.send("Content: ID of the newly created user:");
};