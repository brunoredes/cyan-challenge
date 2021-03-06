const { join } = require('path');
require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: join(__dirname, '..', '..', '__tests__', 'db_test.sqlite'),
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
