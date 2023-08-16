'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle. 
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
    }
  }
  library.init({
    title: DataTypes.STRING,
    subject: DataTypes.STRING,
    author: DataTypes.STRING,
    department: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'library',
  });
  return library;
};