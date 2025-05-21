import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths || {},
    { prefix: '<rootDir>/' }
  ),
  transform: {
    "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js"
  },
  setupFiles: ['<rootDir>/src/utils/loadEnv.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['<rootDir>/src', '<rootDir>/test'],
};