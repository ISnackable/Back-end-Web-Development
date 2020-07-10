console.log("------------------------------------");
console.log("models > index.js");
console.log("------------------------------------");

/*
    The purpose of this file is to provide connections to the
    backend database layer.

    It does not contain the read/write codes to tables in the DB.
    That's the job for the other Models' files.
*/

// ------------------------------------
// load modules
// ------------------------------------
const mysql = require('mysql');
const config = require('../config');

var conn = mysql.createConnection({
    host: config.hostname,
    user: config.username,
    password: config.password,
    database: config.database,
    dateStrings: true
});

conn.connect(function (err) {
    if (err) {
        console.log("Error connecting database: " + err.stack);
    }
    else {
        console.log("Database connected");
    }
});

// ------------------------------------
// export
// ------------------------------------
module.exports = conn