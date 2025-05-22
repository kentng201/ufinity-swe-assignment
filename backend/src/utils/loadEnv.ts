import dotenv from 'dotenv';

const envFile = (() => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return '.env.development';
    case 'test':
      return '.env.test';
    case 'production':
      return '.env';
    default:
      return '.env';
  }
})();

console.log(`Loading environment variables from ${envFile}`);
dotenv.config({
  path: envFile,
});
