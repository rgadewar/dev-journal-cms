const { Sequelize } = require('sequelize');
require('dotenv').config();

// If running on Heroku, use JawsDB URL; otherwise, use local MySQL configuration
let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql'
  });
} else {
  sequelize = new Sequelize(
    
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
  // logging: console.log
}

// Export the Sequelize instance
module.exports = sequelize;
