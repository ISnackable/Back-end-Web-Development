/*
    The purpose of this file is to provide ocnnections to the
    backend database layer.

    It does not contain the read/write codes to tables in the DB.
    That's the job for the other Models' files.

    This file here merely opens the door to the DB, and closes the door.
*/

// ------------------------------------
// load modules
// ------------------------------------
const mysql = require('mysql');
const config = require('./config');

// ------------------------------------
// functions
// ------------------------------------
var dbconnect = {
    /*
    return a connection to the database

    @return
        succesful -> database object
        failure -> NULL
    */
    getConnection: function () {
        // attempt to get a connection to the DB
        var conn = mysql.createConnection({
            host: config.hostname,
            user: config.username,
            password: config.password,
            database: config.database
        });

        // and return the connection
        // at this point in time, the door to the DB has not opened up
        // We merely just arrived at its doorstep, ready to supply
        // credentials to gain access in
        return conn;
    }
};

// ------------------------------------
// export
// ------------------------------------
module.exports = dbconnect