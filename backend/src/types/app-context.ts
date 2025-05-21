import { ParameterizedContext } from 'koa';
import { Sequelize, Model, ModelStatic } from 'sequelize';

export type AppContext = ParameterizedContext<
  undefined,
  {
    db: Sequelize & {
      sequelize: Sequelize;
      Sequelize: typeof Sequelize;
    } & Record<string, ModelStatic<Model>>;
  }
>;