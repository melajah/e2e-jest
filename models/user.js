'use strict';
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Name is required' },
        notNull : { msg: 'Name is required' },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Email is required' },
        notNull : { msg: 'Email is required' },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Password is required' },
        notNull : { msg: 'Password is required' },
      }
    }
  }, {
    hooks: {
      beforeCreate(instance) {
        const hashedPassword = hashPassword(instance.password)
        instance.password = hashedPassword
      },
    }
  });


  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};