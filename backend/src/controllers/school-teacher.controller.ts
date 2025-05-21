import { SchoolTeacherService } from 'src/services/school-teacher.service';
import { AppContext } from 'src/types/app-context';
import { z } from 'zod/v4';

export const createSchoolTeacher = async (ctx: AppContext) => {
  const schoolTeacherSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    contactNumber: z.string().regex(
      /^\d{8}$/,
      'Invalid contact number format'
    ),
    subject: z.enum([
      'English Language',
      'Mother Tongue Language',
      'Mathematics',
      'Science',
      'Art',
      'Music',
      'Physical Education',
      'Character and Citizenship Education',
    ]),
  });

  try {
    const validatedData = schoolTeacherSchema.parse((ctx.request as any).body);

    const schoolTeacher = await new SchoolTeacherService(ctx.db)
      .create(validatedData);

    ctx.status = 201;
    ctx.body = {
      message: 'Teacher created successfully',
      data: schoolTeacher,
    };
  } catch (err) {
    if (err instanceof Error && 'issues' in err) {
      ctx.status = 400;
      ctx.body = {
        error: 'Validation failed',
        details: (err as z.ZodError).issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        error: 'Internal Server Error',
        message: err.message,
      };
    }
  }
}

export const getAllSchoolTeachers = async (ctx: AppContext) => {
  try {
    const schoolTeachers = await new SchoolTeacherService(ctx.db)
      .getAll();

    ctx.status = 200;
    ctx.body = {
      message: 'Teachers retrieved successfully',
      data: schoolTeachers,
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      error: 'Internal Server Error',
      message: err.message,
    };
  }
}