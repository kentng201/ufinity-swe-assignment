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
      SchoolClass.belongsTo(models.SchoolTeacher, {
        foreignKey: 'schoolTeacherId',
        as: 'formTeacher',
      });
    }

    public toJSON() {
      const values = { ...this.get() };
      // hide sensitive system fields
      delete values.id;
      delete values.createdAt;
      delete values.updatedAt;
      return values;
    }
  }
  SchoolClass.init({
    level: DataTypes.STRING,
    name: DataTypes.STRING,
    schoolTeacherId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SchoolTeacher',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'SchoolClass',
  });
  return SchoolClass;
};