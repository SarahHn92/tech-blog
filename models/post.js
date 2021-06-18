const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        title: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            } 
        },
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'comment',
                key: 'id'
            }
        }
    },  
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
    );
        
        module.exports = Comments;