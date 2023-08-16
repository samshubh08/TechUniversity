'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      department.belongsTo(models.course, {
        foreignKey: 'courseId',
        as: 'course'
      })
    }
  }
  department.init({
    name: DataTypes.STRING,
    head_of_department: DataTypes.STRING,
    number_of_students: DataTypes.INTEGER,
    department_description: DataTypes.STRING,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'department',
  });
  return department;
};