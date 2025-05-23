import { Model } from 'sequelize';
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

    // Check if the email already exists
    const existingTeacherEmail = await SchoolTeacher.findOne({
      where: { email: data.email },
    });

    // Check if the contact number already exists
    const existingContactNumber = await SchoolTeacher.findOne({
      where: { contactNumber: data.contactNumber },
    });

    // Check if the name already exists
    const existingName = await SchoolTeacher.findOne({
      where: { name: data.name },
    });

    if (existingTeacherEmail || existingContactNumber || existingName) {
      const errors: ZodIssue[] = [];
      if (existingTeacherEmail) {
        errors.push({
          code: 'custom',
          message: 'Email already exists',
          path: ['email'],
        });
      }
      if (existingContactNumber) {
        errors.push({
          code: 'custom',
          message: 'Contact number already exists',
          path: ['contactNumber'],
        });
      }
      if (existingName) {
        errors.push({
          code: 'custom',
          message: 'Name already exists',
          path: ['name'],
        });
      }
      throw new ValidationError(errors);
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