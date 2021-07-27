'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2,50]
        },
        trim: true,
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2,50]
        },
        trim: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2,50]
        },
        trim: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2,50],
          isEmail: true
        },
        trim: true,
      },
      randomValue: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      condensedValue: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};