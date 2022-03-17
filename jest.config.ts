/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    clearMocks: true,
    maxWorkers: '50%',
    moduleNameMapper: {
        '~/(.*)': '<rootDir>/src/$1',
    },
    preset: 'ts-jest',
    roots: ['<rootDir>/__test__'],
    testEnvironment: 'node',
};
