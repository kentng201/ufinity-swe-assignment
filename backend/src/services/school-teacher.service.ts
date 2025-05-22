import { Model } from 'sequelize';
import { SequelizeDb } from 'src/types/sequelize-db';
import { ValidationError } from 'src/utils/ValidationError';

type CreateSchoolTeacherData = {
  name: string;
  email: string;
  contactNumber: string;
  subject: 'English Language' | 'Mother Tongue Language' | 'Mathematics' | 'Science' | 'Art' | 'Music' | 'Physical Education' | 'Character and Citizenship Education';
}

type GetSchoolTeacherData = {
  name: string;
  email: string;
  contactNumber: string;
  subject: 'English Language' | 'Mother Tongue Language' | 'Mathematics' | 'Science' | 'Art' | 'Music' | 'Physical Education' | 'Character and Citizenship Education';
}

export class SchoolTeacherService {
  private db: SequelizeDb;

  constructor(db: SequelizeDb) {
    this.db = db;
  }

  async create(data: CreateSchoolTeacherData) {
    const { SchoolTeacher } = this.db;

    // Check if the email already exists
    const existingTeacher = await SchoolTeacher.findOne({
      where: { email: data.email },
    });

    if (existingTeacher) {
      throw new ValidationError([{
        code: 'custom',
        message: 'Email already exists',
        path: ['email'],
      }]);
    }

    const schoolTeacher = await SchoolTeacher.create(data);
    return await schoolTeacher.reload({
      attributes: {
        exclude: ['id'],
        include: ['name', 'email', 'contactNumber', 'subject'],
      },
    });
  }

  async getAll() {
    const { SchoolTeacher } = this.db;

    return await SchoolTeacher.findAll({
      attributes: {
        exclude: ['id'],
        include: ['name', 'email', 'contactNumber', 'subject'],
      },
    }) as (Model<any, any> & GetSchoolTeacherData)[];
  }
}