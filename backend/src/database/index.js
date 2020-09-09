import Sequelize from 'sequelize';

import Mill from '../app/models/Mill';
import Harvest from '../app/models/Harvest';
import Farm from '../app/models/Farm';
import Field from '../app/models/Field';
import dbConfig from '../config/database';

const models = [Mill, Harvest, Farm, Field];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate);
  }
}

export default new Database();
