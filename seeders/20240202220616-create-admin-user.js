'use strict';
const bcrypt = require('bcrypt');
const env = require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     // Check if User table exists
     const userTableExists = await queryInterface.sequelize.query(
      'SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = \'users\');'
    );
    const userTokenTableExist = await queryInterface.sequelize.query(
      'SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = \'user_tokens\');'
    );

    if (!userTableExists[0][0].exists) {
      // Create User table if it doesn't exist
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        role: {
          type: Sequelize.ENUM,
          values: ['user','admin'],
          defaultValue: 'user'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
    }

    if (!userTokenTableExist[0][0].exists) {
      // Create User table if it doesn't exist
      await queryInterface.createTable('user_tokens', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          }
        }
      });
}
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    // Dump admin user
    await queryInterface.bulkInsert('users', [{
      name: 'admin',
      email: 'admin@gmail.com',
      password: hashPassword,
      role: "admin",
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('users', null, {});
  }
};
