import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreateClassData, GetClassData } from '../../types/Class';
import type { CreateTeacherData, GetTeacherData } from '../../types/Teacher';
import ENV from '../../utils/env';

export const schoolApi = createApi({
  reducerPath: 'schoolApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_BASE_URL }),
  tagTypes: ['Teachers', 'Classes'],
  endpoints: (builder) => ({
    // Teachers
    getAllTeachers: builder.query<GetTeacherData[], void>({
      query: () => '/teachers',
      providesTags: ['Teachers'],
      transformResponse: (response: { data: GetTeacherData[] }) => response.data,
    }),
    createTeacher: builder.mutation<void, CreateTeacherData>({
      query: (body) => ({
        url: '/teachers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Teachers'],
    }),

    // Classes
    getAllClasses: builder.query<GetClassData[], void>({
      query: () => '/classes',
      providesTags: ['Classes'],
      transformResponse: (response: { data: GetClassData[] }) => response.data,
    }),
    createClass: builder.mutation<void, CreateClassData>({
      query: (body) => ({
        url: '/classes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Classes'],
    }),
  }),
});

export const {
  useGetAllTeachersQuery,
  useCreateTeacherMutation,
  useGetAllClassesQuery,
  useCreateClassMutation,
} = schoolApi;
