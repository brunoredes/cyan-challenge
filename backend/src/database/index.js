import Sequelize from 'sequelize';

import Mill from '../app/models/Mill';
import Harvest from '../app/models/Harvest';
// import Farm from '../app/models/Farm';
import { dev, test, produdction } from '../config/database';

let dbConfig = {};
const models = [Mill, Harvest];

class Database {
  constructor() {
    this.init();
  }

  init() {
    switch (process.env.NODE_ENV) {
      case 'test':
        dbConfig = test;
        break;
      case 'development':
        dbConfig = dev;
        break;
      case 'production':
      default:
        dbConfig = produdction;
        break;
    }
    this.connection = new Sequelize(dbConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
