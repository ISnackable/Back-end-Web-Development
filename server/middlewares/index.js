console.log("------------------------------------");
console.log("middlewares > index.js");
console.log("------------------------------------");
// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const { type } = require('os');

// ------------------------------------------------------
// multer config
// ------------------------------------------------------
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.dirname(__dirname) + '/public/uploads')
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + ".jpg");
    }
})

// ------------------------------------------------------
//  middleware functions
// ------------------------------------------------------
const middleware = {
    urlencodedParser: bodyParser.urlencoded({ extended: false }),
    jsonParser: bodyParser.json(),
    upload: multer({
        storage: storage,
        limits: { fileSize: 1024 * 1024 },
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if (file.mimetype !== "image/jpeg" || ext !== '.jpg' && ext !== '.JPG') {
                req.fileValidationError = 'Only .jpg images are allowed';
                return callback(new Error('Only .jpg images are allowed'), false);
            }
            callback(null, true);
        }
    }).single('thumbnail'),
    idSanitation: (req, res, next) => {
        // Check whether req.params.id is a number
        console.log("=================================");
        console.log("idSanitation()");
        console.log("=================================");
        var id = req.params.id;

        if (!utils.isNumeric(id)) return res.status(400).send("Bad Request");
        else next();
    },
    bodySanitation: (req, res, next) => {
        // Check whether req.body is empty.
        console.log("=================================");
        console.log("bodySanitation()");
        console.log("=================================");
        if ((req.method == "POST" || req.method == "PUT") && Object.keys(req.body).length !== 0) {
            for (const key in req.body) {
                const value = req.body[key];
                console.log(`${key} -> ${value}`);
                if (!value) return res.status(400).send("Bad Request");
            }
        }
        else if (req.method == "POST" || req.method == "PUT") {
            return res.status(400).send("Bad Request");
        }
        return next();
    },
    verifyToken: (req, res, next) => {
        console.log("=================================");
        console.log("verifyToken()");
        console.log("=================================");
        console.log(req.headers);

        var authorization_string = req.headers['authorization'];
        console.log("Authorization String: " + authorization_string);

        if (!authorization_string || !authorization_string.includes('Bearer')) {
            // process the token
            res.status(403);
            return res.send({
                auth: 'false',
                message: 'Not authorized!'
            });
        }
        else {
            const token = authorization_string.split('Bearer ')[1];
            console.log("Token: " + token);

            jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
                // verify token
                if (err) {
                    res.status(403);

                    return res.send({
                        auth: false,
                        message: 'Not authorized!'
                    });
                } else {
                    console.log("token is successfully verified");

                    // sanity check
                    console.log("decoded values: " + JSON.stringify(decoded));

                    req.decodedToken = decoded;
                    // // decode the userid and store in req for use
                    // req.userid = decoded.userid;

                    // // decode the role and store in req for use
                    // req.role = decoded.role;

                    next();
                }
            });
        }
    },
    userAuthorization: (req, res, next) => {
        try {
            var id = parseInt(req.params.id);
            var userid = parseInt(req.decodedToken.userid);
            var role = req.decodedToken.role;
        
            if (userid !== id) {
                if (role !== 'admin') {
                    return res.status(403).send("Forbidden");
                }
            }
            return next();
        }
        catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    },
    authAdmin: (req, res, next) => {
        try {
            var role = req.decodedToken.role;
        
            if (role !== 'admin') {
                console.log("Not Admin!")
                return res.status(403).send("Forbidden");
            }
            return next();
        }
        catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
};

module.exports = middleware;