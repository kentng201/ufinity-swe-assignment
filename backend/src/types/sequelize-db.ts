import { Sequelize, Model, ModelStatic } from 'sequelize';

export type SequelizeDb = Sequelize & {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
} & Record<string, ModelStatic<Model>>;