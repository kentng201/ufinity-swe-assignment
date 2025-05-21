import Router from 'koa-router';
import { createSchoolClass } from 'src/controllers/school-class.controller';
import { createSchoolTeacher } from 'src/controllers/school-teacher.controller';
import { SequelizeDb } from 'src/types/sequelize-db';

const router = new Router<undefined, {
  db: SequelizeDb;
}>();


// Routes
router.get('/api', async (ctx) => {
  ctx.body = { message: 'OK' };
});

// School Teacher Routes
router.post('/api/teachers', createSchoolTeacher);

// School Class Routes
router.post('/api/classes', createSchoolClass);

export default router;