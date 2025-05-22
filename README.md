# GatherSG SWE Task

This is a take home assignment for the Full Stack Engineer position at Ufinity. The code repository contains two folders:

- `backend`: This folder contains the backend code for the application.
- `frontend`: This folder contains the frontend code for the application.

Assumptions:

- Based on the figma provided, I have assumed the below field have fixed options in backend and frontend.:
  - `Class Level` - `Primary 1`, `Primary 2`, `Primary 3`, `Primary 4`, `Primary 5`, `Primary 6`
  - `Main Subject` - `English Language`, `Mother Tongue Language`, `Mathematics`, `Science`, `Art`, `Music`, `Physical Education`, `Character and Citizenship Education`
- The backend only allows these options to be selected. If the user tries to select any other option, an error message will be displayed.
- The database will store the field as string, this allow flexibility in the future if we want to add more options yet keep the backend secure with validation.

- I assumed the teacher email is unique and will not be duplicated. If the user tries to register with an email that already exists, an error message will be displayed.

- Based on my past experience, different environments (such as development, test, and production) typically have separate `.env` files and distinct Sequelize configurations. However, in this project, I assumed that both the production and test environments use the same configuration and database connection, without separate environment-specific .env files.

Take Note that:

- MySQL is used as the database for this project.
- The backend is built using Node.js, Koa.js, Sequelize, and Zod for validation.
- Some part of the backend code is written in Javascript due to the legacy of Sequelize that cannot fully accept Typescript. I have used Typescript for the rest of the code.
- The frontend is built using React.js, Redux, and Tailwind CSS.
- Frontend is fully written in Typescript.
