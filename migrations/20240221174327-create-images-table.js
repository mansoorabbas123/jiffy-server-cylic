'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable("images",{
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    public_id: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    public_url: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    category_id: {
       allowNull: false,
       unique: true,
       type: Sequelize.INTEGER,
       references: {
        model: 'categories',
        key: 'id',
       }
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    }
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("images");
  }
};
