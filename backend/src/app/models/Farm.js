import { Model, DataTypes, UUIDV4, STRING } from 'sequelize';

class Farm extends Model {
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
        name: STRING,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Harvest, {
      foreignKey: 'id_harvest',
      as: 'harvest',
      foreignKeyConstraint: 'FK_HARVEST_FARM',
    });
  }
}
export default Farm;
