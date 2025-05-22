import 'src/utils/loadEnv';
import { faker } from '@faker-js/faker';
import db from '../src/models/index';
import { SchoolTeacherService } from 'src/services/school-teacher.service';

describe('School Teacher Service', () => {
  it('should create a new teacher with unique email', async () => {
    const service = new SchoolTeacherService(db);
    const teachers = await service.getAll();

    // Ensure the email is unique
    let teacherEmail: string;
    do {
      teacherEmail = faker.internet.email();
    }
    while (teachers.some((teacher) => teacher.email === teacherEmail));
    const teacherName = faker.person.fullName();
    const contactNumber = faker.string.numeric(8);
    const subject = faker.helpers.arrayElement([
      'English Language',
      'Mother Tongue Language',
      'Mathematics',
      'Science',
      'Art',
      'Music',
      'Physical Education',
      'Character and Citizenship Education'
    ]);

    const createdTeacher = await service.create({
      email: teacherEmail,
      name: teacherName,
      contactNumber: contactNumber,
      subject: subject,
    });

    expect(createdTeacher).toHaveProperty('email', teacherEmail);
    expect(createdTeacher).toHaveProperty('name', teacherName);
    expect(createdTeacher).toHaveProperty('contactNumber', contactNumber);
    expect(createdTeacher).toHaveProperty('subject', subject);
  });

  it('should get all teachers', async () => {
    const service = new SchoolTeacherService(db);
    const teachers = await service.getAll();

    expect(teachers).toBeInstanceOf(Array);
    expect(teachers.length).toBeGreaterThan(0);
    expect(teachers[0]).toHaveProperty('email');
    expect(teachers[0]).toHaveProperty('name');
    expect(teachers[0]).toHaveProperty('contactNumber');
    expect(teachers[0]).toHaveProperty('subject');
  });

  it('should not create a teacher with an existing email', async () => {
    const service = new SchoolTeacherService(db);
    const teachers = await service.getAll();

    const existingTeacherEmail = teachers[0].email;
    const teacherName = faker.person.fullName();
    const contactNumber = faker.string.numeric(8);
    const subject = faker.helpers.arrayElement([
      'English Language',
      'Mother Tongue Language',
      'Mathematics',
      'Science',
      'Art',
      'Music',
      'Physical Education',
      'Character and Citizenship Education'
    ]);
    const createTeacherPromise = service.create({
      email: existingTeacherEmail,
      name: teacherName,
      contactNumber: contactNumber,
      subject: subject,
    });

    await expect(createTeacherPromise).rejects.toThrowError(
      expect.objectContaining({
        message: 'Validation failed',
        issues: [{
          code: 'custom',
          message: 'Email already exists',
          path: ['email'],
        }],
      })
    );
  });
});
