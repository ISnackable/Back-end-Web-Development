/*
    Config stuff 
*/
console.log("------------------------------------");
console.log("config > index.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const dotenv = require('dotenv').config();

if (dotenv.error) {
    throw `
    -------------------------------------------------------------------------------------
    -- .env not found!                                                                 --
    -- Setup a .env file in the root directory with the following enviroment variable. -- 
    -- Back-end-Web-Development/.env                                                   --
    -- Replace <tag> with the appropriate configuration                                --
    --                                                                                 --
    -- EXPRESS_HOSTNAME=<express ip / hostname>                                        --
    -- EXPRESS_PORT=<express port>                                                     --
    -- DB_USERNAME=<database username>                                                 --
    -- DB_PASSWORD=<database passsword>                                                --
    -- DB_DATABASE=<database name>                                                     --
    -- SECRET=<jwt secret>                                                             --
    -------------------------------------------------------------------------------------`
}

const config = {
    hostname : process.env.EXPRESS_HOSTNAME,
    port : process.env.EXPRESS_PORT,
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    JWT_SECRET : process.env.SECRET
};

module.exports = config;