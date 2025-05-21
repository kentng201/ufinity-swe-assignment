import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import logger from 'koa-logger';
import router from 'src/routes';
import json from 'koa-json';
import { databaseMiddleware } from 'src/middlewares/database';

const app = new Koa();


// Middlewares
app.use(logger());
app.use(json());
app.use(databaseMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

// Main entry point for the application
if (require.main === module) {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}

// Export for tests
export default app;