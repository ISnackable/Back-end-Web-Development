/**
 * This file is responsible for read/write database transactions
 * for the user table in sptravel schema.
 * 
 * Remember that Model files are the only ones who knows how to interface with the Database layer.
 * 
 * Thus you will be typing your SQL commands in Model files.
 */

// ------------------------------------
// load modules
// ------------------------------------
var db = require('./index.js');

var travelDB = {
    getAll: function (callback) {
        console.log("travelDB.getAll() ...");

        var sql = 'SELECT * FROM travel';

        db.query(sql, [], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                if (result.length == 0) {
                    return callback(null, null);
                }
                else {
                    return callback(null, result);
                }
            }
        });
    },
    createTravel: function (travel, callback) {
        console.log("travelDB.createTravel() ...");

        var sql = 'INSERT INTO travel (title, description, price, country, travelPeriod) VALUES (?, ?, ?, ?, ?)';

        db.query(sql, [travel.title, travel.description, travel.price, travel.country, travel.travelPeriod], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result.insertId);
            }
        });
    },
    deleteTravel: function (id, callback) {
        console.log("travelDB.deleteTravel() ...");

        var sql = 'DELETE FROM travel WHERE travelid = ?';

        db.query(sql, [id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },
    updateTravel: function (travel, callback) {
        console.log("travelDB.updateTravel() ...");

        var sql = 'UPDATE travel SET title = ?, description = ?, price = ?, country = ?,  travelPeriod = ? WHERE travelid = ?';

        db.query(sql, [travel.title, travel.description, travel.price, travel.country, travel.travelPeriod, travel.id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },
}

// ------------------------------------
// export
// ------------------------------------
module.exports = travelDB