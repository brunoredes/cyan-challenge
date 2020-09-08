module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('farms', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        validate: {
          notNull: true,
        },
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
      },
      harvest_id: {
        type: Sequelize.DataTypes.UUID,
        references: { model: 'harvests', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('farms');
  },
};
