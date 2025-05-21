import Router from 'koa-router';
import { createSchoolClass, getAllSchoolClasses } from 'src/controllers/school-class.controller';
import { createSchoolTeacher, getAllSchoolTeachers } from 'src/controllers/school-teacher.controller';
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
router.get('/api/teachers', getAllSchoolTeachers);

// School Class Routes
router.post('/api/classes', createSchoolClass);
router.get('/api/classes', getAllSchoolClasses);

export default router;