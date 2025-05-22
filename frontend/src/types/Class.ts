export type CreateClassData = {
  level: 'Primary 1' | 'Primary 2' | 'Primary 3' | 'Primary 4' | 'Primary 5' | 'Primary 6';
  name: string;
  teacherEmail: string;
};

export type GetClassData = {
  level: 'Primary 1' | 'Primary 2' | 'Primary 3' | 'Primary 4' | 'Primary 5' | 'Primary 6';
  name: string;
  formTeacher: {
    name: string;
    email: string;
  };
}