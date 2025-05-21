import { SequelizeDb } from 'src/types/sequelize-db';
import { ValidationError } from 'src/utils/ValidationError';

type CreateSchoolTeacherData = {
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

    return await SchoolTeacher.create(data);
  }

  async getAll() {
    const { SchoolTeacher } = this.db;

    return await SchoolTeacher.findAll({
      attributes: ['name', 'email', 'contactNumber', 'subject'],
    });
  }
}