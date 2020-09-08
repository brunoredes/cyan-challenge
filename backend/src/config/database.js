const { join } = require('path');
require('dotenv/config');

module.exports = {
  dev: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  produdction: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    dialect: 'sqlite',
    host: 'localhost',
    username: 'root',
    password: 'root',
    storage: join(__dirname, '..', '..', '__tests__', 'db_test.sqlite'),
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: false,
  },
};
