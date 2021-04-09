'use strict';
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('documents', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        documentId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        scanId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,  
        },nationality:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        modified: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    },
        {
            tableName: 'documents'
        });

    Model.associate = function (models) {
        this.userId = this.belongsTo(models.user);
    };
    return Model;
};