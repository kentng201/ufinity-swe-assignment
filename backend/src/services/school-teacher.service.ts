import { Model, Op } from 'sequelize';
import { SequelizeDb } from 'src/types/sequelize-db';
import { ValidationError } from 'src/utils/ValidationError';
import { ZodIssue } from 'zod';

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

    const existingTeacher = await SchoolTeacher.findOne({
      where: {
        [Op.or]: [
          { email: data.email },
          { contactNumber: data.contactNumber },
          { name: data.name },
        ],
      },
    }) as Model<any, any> & GetSchoolTeacherData;

    if (existingTeacher) {
      const errors: ZodIssue[] = [];

      if (existingTeacher.email === data.email) {
        errors.push({
          code: 'custom',
          message: 'Email already exists',
          path: ['email'],
        });
      }

      if (existingTeacher.contactNumber === data.contactNumber) {
        errors.push({
          code: 'custom',
          message: 'Contact number already exists',
          path: ['contactNumber'],
        });
      }

      if (existingTeacher.name === data.name) {
        errors.push({
          code: 'custom',
          message: 'Name already exists',
          path: ['name'],
        });
      }

      if (errors.length > 0) {
        throw new ValidationError(errors);
      }
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