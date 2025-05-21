import { SequelizeDb } from 'src/types/sequelize-db';
import { ValidationError } from 'src/utils/ValidationError';

type CreateSchoolClassData = {
  level: 'Primary 1' | 'Primary 2' | 'Primary 3' | 'Primary 4' | 'Primary 5' | 'Primary 6';
  name: string;
  teacherEmail: string;
};

export class SchoolClassService {
  private db: SequelizeDb;

  constructor(db: SequelizeDb) {
    this.db = db;
  }

  async create(data: CreateSchoolClassData) {
    const { SchoolClass, SchoolTeacher } = this.db;

    const schoolTeacher = await SchoolTeacher.findOne({
      where: { email: data.teacherEmail },
      attributes: ['id'],
    });
    if (!schoolTeacher) {
      throw new ValidationError([
        {
          code: 'custom',
          message: 'School teacher not found',
          path: ['teacherEmail'],
        },
      ]);
    }

    return await SchoolClass.create({
      ...data,
      schoolTeacherId: (schoolTeacher as any).id,
    });
  }

  async getAll() {
    const { SchoolClass } = this.db;

    return await SchoolClass.findAll({
      attributes: ['level', 'name'],
      include: [
        {
          model: this.db.SchoolTeacher,
          as: 'formTeacher',
          attributes: ['name', 'email'],
        },
      ],
    });
  }
}
