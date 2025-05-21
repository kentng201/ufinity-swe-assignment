'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class SchoolClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SchoolClass.init({
    level: DataTypes.STRING,
    name: DataTypes.STRING,
    schoolTeacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SchoolClass',
  });
  return SchoolClass;
};