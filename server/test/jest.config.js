module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./setup.ts'],
  testTimeout: 30000,
  maxWorkers: 1,
  runInBand: true,
  workerIdleMemoryLimit: '512MB',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  testMatch: ['**/*.test.ts'],
  verbose: true
}; 