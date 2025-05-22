export type CreateTeacherData = {
  name: string;
  email: string;
  contactNumber: string;
  subject: 'English Language' | 'Mother Tongue Language' | 'Mathematics' | 'Science' | 'Art' | 'Music' | 'Physical Education' | 'Character and Citizenship Education';
}

export type GetTeacherData = {
  name: string;
  email: string;
  contactNumber: string;
  subject: 'English Language' | 'Mother Tongue Language' | 'Mathematics' | 'Science' | 'Art' | 'Music' | 'Physical Education' | 'Character and Citizenship Education';
}