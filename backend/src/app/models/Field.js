import { Model, DataTypes, UUIDV4 } from 'sequelize';

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
        coordinates: {
          type: DataTypes.GEOMETRY('POINT', 4326),
        },
        farm_id: {
          type: DataTypes.UUID,
          defaultValue: UUIDV4,
          references: {
            model: 'farms',
            key: 'id',
          },
        },
      },
      { sequelize }
    );

    this.addHook('beforeSave', (instance) => {
      if (instance.geometry && !instance.geometry.crs) {
        instance.geometry.crs = {
          type: 'name',
          properties: {
            name: 'EPSG:4326',
          },
        };
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Farm, {
      foreignKey: 'farm_id',
      as: 'farm',
      foreignKeyConstraint: 'FK_FARM_FIELD',
    });
  }
}

export default Field;
