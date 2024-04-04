// from 14.1.22 Student MVC Review in UTA-VIRT-FSF-PT-12-2020-U-LOL

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Heroku deployment
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;
