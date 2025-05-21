'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class SchoolTeacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SchoolTeacher.init({
    name: DataTypes.STRING,
    subject: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    contactNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SchoolTeacher',
  });
  return SchoolTeacher;
};