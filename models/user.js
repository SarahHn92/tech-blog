const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // log in/check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: [6],
            }
        }
    },
    {
        // Before create
    hooks: {
        beforeCreate: async (newUserInfo) => {
            newUserInfo.password = await bcrypt.hash(newUserInfo.password, 10);
            return newUserInfo;
        },
        // Before update
        beforeUpdate: async (updatedUserInfo) => {
            updatedUserInfo.password = await bcrypt.hash(updatedUserInfo.password, 10);
            return updatedUserInfo;
        },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
}
);

module.exports = User;