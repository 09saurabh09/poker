/**
 * Created by saurabhk on 30/12/16.
 */
"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
//if (process.env.DATABASE_URL) {
//    var sequelize = new Sequelize(process.env.DATABASE_URL);
//} else {
//    var sequelize = new Sequelize(config.database, config.username, config.password, config);
//}

var sequelize = new Sequelize(DB_CREDENTIALS.DB_NAME, DB_CREDENTIALS.DB_USERNAME, DB_CREDENTIALS.DB_PASSWORD, {
    host: DB_CREDENTIALS.DB_HOST,
    dialect: 'postgres',
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.sync({ logging: console.log });

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connected to database');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

var db        = {};

//fs
//    .readdirSync(__dirname)
//    .filter(function(file) {
//        return (file.indexOf(".") !== 0) && (file !== "index.js");
//    })
//    .forEach(function(file) {
//        var model = sequelize.import(path.join(__dirname, file));
//        db[model.name] = model;
//    });
//
//Object.keys(db).forEach(function(modelName) {
//    if ("associate" in db[modelName]) {
//        db[modelName].associate(db);
//    }
//});

console.log(__dirname);
db.user = sequelize.import("../user/userModel");

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;