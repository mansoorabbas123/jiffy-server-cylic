'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users','role',{
      type: DataTypes.ENUM,
      values: ['user','admin'],
      defaultValue: 'user'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users','role');
  }
};
