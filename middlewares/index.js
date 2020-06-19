console.log("------------------------------------");
console.log("middlewares > index.js");
console.log("------------------------------------");
// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// ------------------------------------------------------
// multer config
// ------------------------------------------------------
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.dirname(__dirname) + '/public/uploads')
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix);
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
        limits : { fileSize: 1024 * 1024 },
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if (file.mimetype !== "image/jpeg" || ext !== '.jpg' && ext !== '.JPG') {
                req.fileValidationError = 'Only .jpg images are allowed';
                return callback(new Error('Only .jpg images are allowed'), false);
            }
            callback(null, true);
        }
    }).single('thumbnail')
};

module.exports = middleware;