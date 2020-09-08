module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mills', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        validate: {
          notNull: true,
        },
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
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
    return queryInterface.dropTable('mills');
  },
};
