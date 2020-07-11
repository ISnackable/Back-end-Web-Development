console.log("------------------------------------");
console.log("models > travel.js");
console.log("------------------------------------");

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

        var sql = 'SELECT travelid, title, description, price, country, DATE_FORMAT(travelPeriod, "%b %Y") AS "travelPeriod" FROM travel';

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
                if (result.length == 0) {
                    return callback(null, null);
                }
                else {
                    return callback(null, result);
                }
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
    getItineraryById: function (id, callback) {
        console.log("travelDB.getItineraryById() ...");

        var sql = 'SELECT itineraryid, day, activity, created_at FROM itinerary WHERE fk_travelid = ?';

        db.query(sql, [id], function (err, result) {
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
    createItineraryById: function (itinerary, callback) {
        console.log("travelDB.CreateItineraryById() ...");

        var sql = 'INSERT INTO itinerary (fk_travelid, day, activity) VALUES (?, ?, ?)';

        db.query(sql, [itinerary.travelid, itinerary.day, itinerary.activity], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result.insertId);
            }
        });
    },
    getReviewId: function (id, callback) {
        console.log("travelDB.getReviewId() ...");

        var sql = `SELECT 
            t.travelid, r.content, r.rating, u.username, r.created_at 
        FROM 
            review AS r, 
            travel AS t, 
            user AS u 
        WHERE 
            r.fk_travelid = t.travelid 
            AND r.fk_userid = u.userid 
            AND r.fk_travelid = ?;`;

        db.query(sql, [id], function (err, result) {
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
    getById: function (id, callback) {
        console.log("travelDB.getById() ...");
    
        var sql = `
            SELECT 
                t.title, 
                t.description, 
                t.price, 
                t.country, 
                DATE_FORMAT(travelPeriod, "%b %Y") AS "travelPeriod", 
                t.thumbnail
            FROM
                travel AS t
            WHERE
                t.travelid = ?;`;
    
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
    imageUpload: function (filename, travelid, callback) {
        console.log("travelDB.imageUpload() ...");
        
        var sql = 'UPDATE travel SET thumbnail = ? WHERE travelid = ?';
        
        db.query(sql, [filename, travelid], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result.affectedRows);
            }
        });
    },
    getPromotionById: function (id, callback) {
        console.log("travelDB.getPromotionById() ...");
    
        var sql = `
            SELECT 
                t.travelid,
                t.title, 
                t.description, 
                t.price, 
                t.country, 
                DATE_FORMAT(travelPeriod, "%b %Y") AS "travelPeriod", 
                t.thumbnail,
                p.promotionid,
                p.start_date, 
                p.end_date, 
                p.discount_amount
            FROM
                promotion AS p,
                travel AS t
            WHERE
                p.fk_travelid = t.travelid AND 
                p.fk_travelid = ?;`;
    
        db.query(sql, [id], function (err, result) {
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
    createPromotionById: function (promotion, callback) {
        console.log("travelDB.createPromotionById() ...");

        var sql = 'INSERT INTO promotion (fk_travelid, start_date, end_date, discount_amount) VALUES (?, ?, ?, ?)';

        db.query(sql, [promotion.travelid, promotion.start_date, promotion.end_date, promotion.discount_amount], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result.insertId);
            }
        });
    },
    deletePromotion: function (travelid, promotionid, callback) {
        console.log("travelDB.deletePromotion() ...");

        var sql = 'DELETE FROM promotion WHERE fk_travelid = ? AND promotionid = ?';

        db.query(sql, [travelid, promotionid], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    }
}

// ------------------------------------
// export
// ------------------------------------
module.exports = travelDB