'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Title is required' },
        notNull : { msg: 'Title is required' },
      }
    },
    tag: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Tag is required' },
        notNull : { msg: 'Tag is required' },
      }
    },
    resolved: DataTypes.STRING,
    link_resolved: DataTypes.STRING,
    level: DataTypes.ENUM("easy", "medium", "hard"),
    start_resolve: {
      type: DataTypes.DATE,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Start resolve is required' },
        notNull : { msg: 'Start resolve is required' },
      }
    },
    done_resolved: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM("doing", "done"),
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Status is required' },
        notNull : { msg: 'Status is required' },
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'User is required' },
        notNull : { msg: 'User is required' },
      }
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};