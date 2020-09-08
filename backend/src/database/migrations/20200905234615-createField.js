module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fields', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        validate: {
          notNull: true,
        },
        allowNull: false,
      },
      farm_id: {
        type: Sequelize.DataTypes.UUID,
        references: { model: 'farms', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      coords: {
        type: Sequelize.DataTypes.GEOMETRY('POINT'),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('fields');
  },
};
