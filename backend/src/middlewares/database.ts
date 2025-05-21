import sequelize from '../models';

export const databaseMiddleware = async (ctx, next) => {
  try {
    ctx.db = sequelize;
    await next();
  } catch (err) {
    console.error('Database connection error:', err);
    ctx.status = 500;
    ctx.body = { error: 'Database connection failed' };
  }
};