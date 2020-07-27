console.log("------------------------------------");
console.log("controllers > userController.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const userDB = require('../models/user');
const utils = require('../utils');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Retrieve all of the users in the database. GET Request
exports.user_list = (req, res) => {
    userDB.getAll(function (err, result) {
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

// Used to add a new user to the database. POST Request
exports.user_add = (req, res) => {
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    if (password1 !== password2 || (!password1 || !password2)) return res.status(400).send("Bad Request");

    const hash = bcrypt.hashSync(password1, 10);
    var myUser = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
    };

    userDB.createUser(myUser, function (err, result) {
        if (!err) {
            var output = {
                "userid": result
            };
            res.status(201).send(output);
        } else {
            if (err.code == 'ER_DUP_ENTRY') {
                res.status(409).send("Conflict. Duplicated entry found!");
            }
            else if (err.code == 'ER_BAD_NULL_ERROR') {
                res.status(400).send("Bad Request");
            }
            else {
                res.status(500).send("Internal Server Error");
            }
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
        id: req.params.id,
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
                // The new username provided already exists.
                res.status(422).send("Unprocessable Entity");
            }
        } else {
            if (err.code == 'ER_BAD_NULL_ERROR') {
                res.status(400).send("Bad Request");
            }
            else {
                res.status(500).send("Internal Server Error");
            }
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
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    var cleanHtml = DOMPurify.sanitize(review.content, { SAFE_FOR_TEMPLATES: true, SAFE_FOR_JQUERY: true, USE_PROFILES: {html: false}});
    
    if (!utils.isNumeric(userid) || !utils.isNumeric(travelid) || !utils.isNumeric(review.rating)) return res.status(400).send("Bad Request");
    if (parseInt(review.rating) < 0 || parseInt(review.rating) > 5) return res.status(400).send("Bad Request");
    if (cleanHtml === "") return res.status(400).send("Bad Request"); else review.content = cleanHtml;
    
    userDB.createReview(userid, travelid, review, function (err, result) {
        if (!err) {
            var output = {
                "reviewid": result
            }
            res.status(201).send(output);
        } else {
            if (err.code == 'ER_DUP_ENTRY') {
                res.status(409).send("Conflict. Duplicated entry found!");
            }
            else if (err.code == 'ER_NO_REFERENCED_ROW_2') {
                res.status(404).send("Travel not found!");
            }
            else if (err.code == 'ER_BAD_NULL_ERROR') {
                res.status(400).send("Bad Request");
            }
            else {
                res.status(500).send("Internal Server Error");
            }
        }
    });
};

// Login a single user. POST REQUEST
exports.user_login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    userDB.loginUser(username, function (err, result) {
        if (!err) {
            if (result) {
                if (!bcrypt.compareSync(password, result.password)) return res.status(401).send("Login has failed.");

                console.log("Private Key: " + config.JWT_SECRET);

                // since there is a matching record, this is the
                // place to generate the JWT token
                var token = jwt.sign(
                    {
                        // payload
                        userid: result.userid,
                        role: result.role
                    },
                    config.JWT_SECRET,
                    {
                        // expires in 24 hrs = 24 * 60 * 60
                        expiresIn: 86400//expires in 24 hrs
                    }
                );

                var output = {
                    "token": token,
                    "userid": result.userid,
                    "username": result.username
                };

                res.status(200).send(JSON.stringify(output));
            }
            else {
                res.status(401).send("Login has failed.");
            }
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    });
};