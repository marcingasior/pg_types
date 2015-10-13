"use strict";

module.exports = function(sequelize, DataTypes) {

    var EnumTest = sequelize.define("custom_enum", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {type: DataTypes.ENUM('test1', 'test2', 'test3')}
    });

    return EnumTest;
};