# Ufinity SWE Assignment

This is a take home assignment for the Full Stack Engineer position at Ufinity. The code repository contains two folders:

- `backend`: This folder contains the backend code for the application.
- `frontend`: This folder contains the frontend code for the application.

## Demo

- `NodeJS API Server`: [Backend Demo](https://ufinity-assignment-backend.kentng201.com/api)
- `React Front Page`: [Frontend Demo](https://ufinity-assignment.kentng201.com)

## Setup Instructions

### Prerequisites

- Node.js (v18.16.0 or higher)
- MySQL (v8.0.34 or higher)
- npm (v9.5.0 or higher)

### Environment Zip Files

The `.env` files are not included in the repository for security reasons. You can download the zip files from the links below and extract them to the respective directories.

- `env.backend.zip`: [Download here](https://drive.google.com/file/d/1nRQXynhGbeAQF2wTDM2MY2iCFiQeZiIO/view?usp=sharing)
- `env.frontend.zip`: [Download here](https://drive.google.com/file/d/1vbQYQ2VKMmWOJOBheiAWF9A5NvsKZ5Vu/view?usp=sharing)

### Backend

1. Navigate to the `backend` directory.
2. Install the dependencies by running:

   ```bash
   npm install
   ```

3. Extract the `env.backend` zip file, it contains three files:
   - `.env` - This file contains env file used for production environment.
   - `.env.test` - This file contains env file used for test environment.
   - `.env.development` - This file contains env file used for development environment.
4. Copy these files to the `backend` directory.
5. Create a new database in MySQL and update the `.env` file with the database connection details.
6. Run the following command to create the database tables:

   ```bash
   npm run db:migrate:prod
   ```

7. Lastly, run the following command to start a live server:

   ```bash
   npm run build && npm run serve
   ```

The server will be running on `http://localhost:3000`.

### (Optional) Backend Test

1. After running the above command, create a new database in MySQL and update the `.env.test` file with the database connection details.
2. Run the following command to create the database tables:

   ```bash
   npm run db:migrate:test
   ```

3. Run the following command to run the test cases:

   ```bash
    npm run test
    ```
  
### Frontend

1. Navigate to the `frontend` directory.
2. Install the dependencies by running:

   ```bash
   npm install
   ```

3. Extract the `env.frontend` zip file, it contains one files:
   - `.env` - This file contains env file used for production environment.
4. Copy these files to the `frontend` directory.
5. Run the following command to start a dev server:

   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:5173`.

## Assumptions

- Based on the figma provided, I have assumed the below field have fixed options in backend and frontend.:
  - `Class Level` - `Primary 1`, `Primary 2`, `Primary 3`, `Primary 4`, `Primary 5`, `Primary 6`
  - `Main Subject` - `English Language`, `Mother Tongue Language`, `Mathematics`, `Science`, `Art`, `Music`, `Physical Education`, `Character and Citizenship Education`
- The backend only allows these options to be selected. If the user tries to select any other option, an error message will be displayed.
- The database will store the field as string, this allow flexibility in the future if we want to add more options yet keep the backend secure with validation.

- Based on my past experience, different environments (such as development, test, and production) typically have separate `.env` files and distinct Sequelize configurations. However, in this project, I assumed that both the production and test environments use the same configuration and database connection, without separate environment-specific .env files.

- When user attempt to register a teacher, the backend will check if the email/contact number/name already exists in the database. If it does, an error message will be displayed. This is to prevent duplicate entries in the database.
- The system did not allow teachers contain duplicate name is because when user attempt to add a new class, the system will display a list of teachers with the same name. This is to prevent confusion for the user when selecting a teacher. If the user tries to add a new class and level with a teacher that already exists, an error message will be displayed.

- When user attempt to add a new class, the backend will check if a same teacher with same class name and class level already exists in the database. If it does, an error message will be displayed. This is to prevent duplicate entries in the database.

## Take Note that

- MySQL is used as the database for this project.
- The backend is built using Node.js, Koa.js, Sequelize, and Zod for validation.
- Some part of the backend code is written in Javascript due to the legacy of Sequelize that cannot fully accept Typescript. I have used Typescript for the rest of the code.
- The frontend is built using React.js, Redux, and Tailwind CSS.
- Frontend is fully written in Typescript.

## Additional Information

### Postman Collection

[Download Postman Collection](/backend.postman_collection.json)
