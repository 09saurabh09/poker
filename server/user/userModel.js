"use strict";

let bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        mobileNumber: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currentBalance: {
            type: DataTypes.BIGINT,
            defaultValue: 10000000 // For testing only
        },
        preferences: {
            type: DataTypes.JSONB
        },
        city: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        cardBackTheme: {
            type: DataTypes.STRING,
            defaultValue: "royal"
        },
        cardFrontTheme: {
            type: DataTypes.STRING,
            defaultValue: "twoColor"
        },
        buyInPreference: {
            type: DataTypes.BIGINT
        },
        maintainStack: {
            type: DataTypes.BOOLEAN
        },
        autoPost: {
            type: DataTypes.BOOLEAN
        },
        straddle: {
            type: DataTypes.BOOLEAN
        },
        music: {
            type: DataTypes.BOOLEAN
        },
        soundEffects: {
            type: DataTypes.BOOLEAN
        },
        preFlop: {
            type: DataTypes.JSONB
        },
        postFlop: {
            type: DataTypes.JSONB
        }
    }, {
            classMethods: {
                associate: function (models) {
                    User.belongsToMany(models.Game, {
                        through: "UserGames"
                    });
                    User.belongsToMany(models.PokerTable, {
                        through: "UserPokerTables"
                    });
                }
            }
        });

    return User;
};