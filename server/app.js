/*
    App entry point
    Acts as the main file of the project where you initialize the app and other elements of the project.
*/
console.log("------------------------------------");
console.log("Back-end-Web-Development > app.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const config = require('./config');
const middleware = require('./middlewares');
const routes = require('./routes');
const db = require('./models');
const express = require('express');
const cors = require('cors');
const app = express();

// ------------------------------------------------------
// MF configuration
// ------------------------------------------------------
app.use(middleware.urlencodedParser);
app.use(middleware.jsonParser);
app.options("*", cors());
app.use(cors());
app.use(routes);

// ------------------------------------------------------
// main
// ------------------------------------------------------
function startServer() {
    try {
        app.listen(config.port, config.hostname, () => {
            console.log(`Server started and accessible via http://${config.hostname}:${config.port}/`);
        });
    }
    catch(err) {
        console.log(err);
    }
}
startServer();