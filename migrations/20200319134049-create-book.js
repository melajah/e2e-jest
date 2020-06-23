'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      resolved: {
        type: Sequelize.STRING
      },
      link_resolved: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.ENUM("easy", "medium", "hard")
      },
      start_resolve: {
        type: Sequelize.DATE
      },
      done_resolved: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM("doing", "done")
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Books');
  }
};