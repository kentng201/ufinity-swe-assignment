import Router from 'koa-router';
import { Sequelize } from 'sequelize';

const router = new Router<undefined, {
  db: Sequelize & {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
  };
}>();


// Routes
router.get('/', async (ctx) => {
  ctx.body = { message: 'OK' };
});

export default router;