import { Model, DataTypes, UUIDV4, DATE } from 'sequelize';
import { isBefore } from 'date-fns';

class Harvest extends Model {
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
        start_date: {
          type: DATE,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        end_date: DATE,
        mills_id: {
          type: DataTypes.UUID,
          defaultValue: UUIDV4,
          references: {
            model: 'mills',
            key: 'id',
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Mill, {
      foreignKey: 'mills_id',
      as: 'mill',
      foreignKeyConstraint: 'FK_MILL_HARVEST',
    });
  }
}

export default Harvest;
