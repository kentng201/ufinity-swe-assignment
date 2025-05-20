
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';
import * as json from 'koa-json';

const app = new Koa();
const router = new Router();

// Middlewares
app.use(logger());
app.use(json());

// Routes
router.get('/', async (ctx) => {
  ctx.body = { message: 'OK' };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});