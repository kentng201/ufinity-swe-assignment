import { SchoolClassService } from 'src/services/school-class.service';
import { AppContext } from 'src/types/app-context';
import { z } from 'zod/v4';

export const createSchoolClass = async (ctx: AppContext) => {
  const schoolClassSchema = z.object({
    level: z.enum([
      'Primary 1',
      'Primary 2',
      'Primary 3',
      'Primary 4',
      'Primary 5',
      'Primary 6',
    ]),
    name: z.string().min(1, 'Name is required'),
    teacherEmail: z.string().email('Invalid email address'),
  });

  try {
    const validatedData = schoolClassSchema.parse((ctx.request as any).body);

    const schoolClass = await new SchoolClassService(ctx.db)
      .create(validatedData);

    ctx.status = 201;
    ctx.body = {
      message: 'Class created successfully',
      data: schoolClass,
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

export const getAllSchoolClasses = async (ctx: AppContext) => {
  try {
    const schoolClasses = await new SchoolClassService(ctx.db)
      .getAll();

    ctx.status = 200;
    ctx.body = {
      message: 'Classes retrieved successfully',
      data: schoolClasses,
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      error: 'Internal Server Error',
      message: err.message,
    };
  }
}