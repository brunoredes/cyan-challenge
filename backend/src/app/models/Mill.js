import Sequelize, { Model, DataTypes, UUIDV4 } from 'sequelize';

class Mill extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: UUIDV4,
          validate: {
            notNull: true,
          },
          allowNull: false,
        },
        name: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default Mill;
