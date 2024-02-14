'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users','role',{
      type: DataTypes.ENUM,
      values: ['user','admin'],
      defaultValue: 'user'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users','role');
  }
};
