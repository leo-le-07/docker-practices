'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.removeColumn('Photos', 'description'),
      queryInterface.removeColumn('Photos', 'fileName'),
      queryInterface.removeColumn('Photos', 'mimetype'),
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.addColumn('Photos', 'description', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.removeColumn('Photos', 'fileName', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.removeColumn('Photos', 'mimetype', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ])
  }
};
