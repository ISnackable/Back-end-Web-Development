/**
 * This file is responsible for read/write database transactions
 * for the user table in furniture schema.
 * 
 * Remember that Model files are the only ones who knows how to interface with the Database layer.
 * 
 * Thus you will be typing your SQL commands in Model files.
 */

// ------------------------------------
// load modules
// ------------------------------------
var db = require('./index.js');

var userDB = {
    getAll: function (callback) {
        console.log("userDB.getAll() ...");

        var sql = 'SELECT userid, username, profile_pic_url, created_at FROM user';

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
    createUser: function (user, callback) {
        console.log("userDB.createUser() ...");

        var sql = 'INSERT INTO user (username, email, profile_pic_url) VALUES (?, ?, ?)';

        db.query(sql, [user.username, user.email, user.profile_pic_url], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result.insertId);
            }
        });
    },
    getById: function (id, callback) {
        console.log("userDB.getById() ...");

        var sql = 'SELECT * FROM user WHERE userid = ?';

        db.query(sql, [id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                if (result.length == 0) {
                    return callback(null, null);
                }
                else {
                    return callback(null, result[0]);
                }
            }
        });
    },
}

// ------------------------------------
// export
// ------------------------------------
module.exports = userDB