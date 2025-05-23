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

    // Check if the class already exists with the same level and name, and teacher email
    const existingClass = await SchoolClass.findOne({
      where: {
        level: data.level,
        name: data.name,
        schoolTeacherId: (schoolTeacher as any).id,
      },
    });
    if (existingClass) {
      throw new ValidationError([
        {
          code: 'custom',
          message: 'Class already exists with the same level, name, and teacher email',
          path: ['level'],
        },
        {
          code: 'custom',
          message: 'Class already exists with the same level, name, and teacher email',
          path: ['name'],
        },
        {
          code: 'custom',
          message: 'Class already exists with the same level, name, and teacher email',
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
