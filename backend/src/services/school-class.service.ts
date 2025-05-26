import { Model } from 'sequelize';
import { SequelizeDb } from 'src/types/sequelize-db';
import { ValidationError } from 'src/utils/ValidationError';

type CreateSchoolClassData = {
  level: 'Primary 1' | 'Primary 2' | 'Primary 3' | 'Primary 4' | 'Primary 5' | 'Primary 6';
  name: string;
  teacherEmail: string;
};

type GetSchoolClassData = {
  level: 'Primary 1' | 'Primary 2' | 'Primary 3' | 'Primary 4' | 'Primary 5' | 'Primary 6';
  name: string;
  formTeacher: {
    name: string;
    email: string;
  };
}

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

    // Check if the teacher is already assigned to a class
    const teacherIsExisted = await SchoolClass.findOne({
      where: {
        schoolTeacherId: (schoolTeacher as any).id,
      },
      attributes: ['id'],
    });
    if (teacherIsExisted) {
      throw new ValidationError([
        {
          code: 'custom',
          message: 'Teacher already exists in a class',
          path: ['teacherEmail'],
        },
      ]);
    }

    const schoolClass = await SchoolClass.create({
      ...data,
      schoolTeacherId: (schoolTeacher as any).id,
    });

    return await schoolClass.reload({
      attributes: {
        exclude: ['id'],
        include: ['level', 'name'],
      },
      include: [
        {
          model: this.db.SchoolTeacher,
          as: 'formTeacher',
          attributes: ['name', 'email'],
        },
      ],
    });
  }

  async getAll() {
    const { SchoolClass } = this.db;

    return await SchoolClass.findAll({
      attributes: {
        exclude: ['id'],
        include: ['level', 'name'],
      },
      include: [
        {
          model: this.db.SchoolTeacher,
          as: 'formTeacher',
          attributes: ['name', 'email'],
        },
      ],
    }) as (Model<any, any> & GetSchoolClassData)[];
  }
}
