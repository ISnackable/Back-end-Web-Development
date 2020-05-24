/*
    middleware functions
*/
const bodyParser = require('body-parser');

const middleware = {
    urlencodedParser : bodyParser.urlencoded({extended : false}),
    jsonParser : bodyParser.json()
};

module.exports = middleware;