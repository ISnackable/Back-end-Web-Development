console.log("------------------------------------");
console.log("controllers > userController.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const userDB = require('../models/user');

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Retrieve all of the users in the database. GET Request
exports.user_list = (req, res) => {
    userDB.getAll(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Used to add a new user to the database. POST Request
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

// Retrieve a single user by their id. GET Request
exports.user_get = (req, res) => {
    var id = req.params.id;

    userDB.getById(id, function (err, result) {
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

// Update a single user. ID and created timestamp should not be updatable. PUT Request
exports.user_update = (req, res) => {
    
    var myUser = {
        id : req.params.id,
        username: req.body.username,
        email: req.body.email,
        profile_pic_url: req.body.profile_pic_url
    };

    userDB.updateUser(myUser, function (err, result) {
        if (!err) {
            if (result) {
                res.status(204).send("No Content");
            }
            else {
                res.status(422).send("Unprocessable Entity")
            }
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};

// Used to add a new review to the database for a given user and travel listing. POST Request
exports.user_add_review = (req, res) => {
    var userid = req.params.uid;
    var travelid = req.params.tid;

    var review = {
        content: req.body.content,
        rating: req.body.rating,
    };

    userDB.createReview(userid, travelid, review, function (err, result) {
        if (!err) {
            var output = {
                "reviewid" : result
            }
            res.status(201).send(output);
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
};