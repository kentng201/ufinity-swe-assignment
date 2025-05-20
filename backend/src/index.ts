
import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';

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

// Main entry point for the application
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

// Export for tests
export default app;