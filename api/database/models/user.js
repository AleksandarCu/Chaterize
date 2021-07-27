var crypto = require('crypto');
var jwt = require('jsonwebtoken');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    makePassword (password) {
      this.randomValue = crypto.randomBytes(16).toString('hex');
      this.condensedValue = crypto.pbkdf2Sync(password, this.randomValue, 10000, 64, 'sha512').toString('hex');
    }

    checkPassword (password) {
      var condensedValue = crypto.pbkdf2Sync(password, this.randomValue, 10000, 64, 'sha512').toString('hex');
      return this.condensedValue == condensedValue;
    }

    generirajJwt = function() {
      var dataCreated = new Date();
      dataCreated.setDate(dataCreated.getDate() + 2);
      
      return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        dataCreated: parseInt(dataCreated.getTime() / 1000, 10)
      }, process.env.JWT_KEY);
    };
    
  };

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,50]
      },
      trim: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,50]
      },
      trim: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2,50]
      },
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2,50],
        isEmail: true
      },
      trim: true,
    },
    randomValue: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    condensedValue: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};