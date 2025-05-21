import { ParameterizedContext } from 'koa';
import { SequelizeDb } from './sequelize-db';

export type AppContext = ParameterizedContext<
  undefined,
  {
    db: SequelizeDb;
  }
>;