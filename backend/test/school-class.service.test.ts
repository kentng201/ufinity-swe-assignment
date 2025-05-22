import 'src/utils/loadEnv';
import { faker } from '@faker-js/faker';
import db from '../src/models/index';
import { SchoolClassService } from 'src/services/school-class.service';
import { SchoolTeacherService } from 'src/services/school-teacher.service';

describe('School Class Service', () => {
  it('should create a new class', async () => {
    const teacherService = new SchoolTeacherService(db);
    const teachers = await teacherService.getAll();

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

    // Create a teacher first
    await teacherService.create({
      email: teacherEmail,
      name: teacherName,
      contactNumber: contactNumber,
      subject: subject,
    });

    const service = new SchoolClassService(db);
    const className = faker.lorem.word();
    const level = faker.helpers.arrayElement([
      'Primary 1',
      'Primary 2',
      'Primary 3',
      'Primary 4',
      'Primary 5',
      'Primary 6',
    ]);


    const createdClass = await service.create({
      name: className,
      level: level,
      teacherEmail: teacherEmail,
    });

    expect(createdClass).toHaveProperty('name', className);
    expect(createdClass).toHaveProperty('level', level);
    expect(createdClass).toHaveProperty('formTeacher.email', teacherEmail);
    expect(createdClass).toHaveProperty('formTeacher.name', teacherName);
  });

  it('should get all classes', async () => {
    const service = new SchoolClassService(db);
    const classes = await service.getAll();

    expect(classes).toBeInstanceOf(Array);
    expect(classes.length).toBeGreaterThan(0);
    expect(classes[0]).toHaveProperty('name');
    expect(classes[0]).toHaveProperty('level');
    expect(classes[0]).toHaveProperty('formTeacher.email');
    expect(classes[0]).toHaveProperty('formTeacher.name');
  });
});