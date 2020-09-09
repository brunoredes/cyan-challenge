import { Model, GEOMETRY, DataTypes, UUIDV4 } from 'sequelize';

class Field extends Model {
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
        coords: {
          type: GEOMETRY('POINT'),
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Farm, {
      foreignKey: 'id_farm',
      as: 'farm',
      foreignKeyConstraint: 'FK_FARM_FIELD',
    });
  }
}

export default Field;
