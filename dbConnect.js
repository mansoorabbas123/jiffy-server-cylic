const { Sequelize } = require("sequelize");
const initModels = require("./models/init-models");
const { sequelize } = require("./config/db_config");

let db;
db = initModels(sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { db, dbConnect };