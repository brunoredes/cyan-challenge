module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('harvests', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        validate: {
          notNull: true,
        },
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
      },
      mills_id: {
        type: Sequelize.DataTypes.UUID,
        references: { model: 'mills', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,
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
    return queryInterface.dropTable('harvests');
  },
};
