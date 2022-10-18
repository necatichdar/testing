const dbConfig = require("../config/db.config.js");
const path = require('path');

const Sequelize = require("sequelize");

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,
//   logging: false,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// }); 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../..', 'database.sqlite'),
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.advert = require("./advert.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);



module.exports = db;
