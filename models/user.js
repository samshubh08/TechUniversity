'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    d_o_b: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    department: DataTypes.STRING,
    contact: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    full_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    role: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};