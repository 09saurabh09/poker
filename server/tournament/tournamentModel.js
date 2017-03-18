/**
 * Created by saurabhk on 03/01/17.
 */
"use strict";
let tournamentConfig = require("./tournamentConfig");

module.exports = function (sequelize, DataTypes) {
    var Tournament = sequelize.define("Tournament", {
        tournamentName: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.JSONB
        },
        ruleType: {
            type: DataTypes.JSONB
        },
        prizeType: {
            type: DataTypes.JSONB
        },
        rake: {
            type: DataTypes.INTEGER
        }
    }, {
            classMethods: {
                associate: function (models) {
                    Tournament.hasMany(models.PokerTable, {foreignKey: 'tournamentId'});
                }
            }
        });

    return Tournament;
};