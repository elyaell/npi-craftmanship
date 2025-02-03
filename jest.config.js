/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest', // Utilise ts-jest pour transformer le code TypeScript
  testEnvironment: 'node', // Utilise un environnement Node.js pour les tests
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transforme les fichiers .ts avec ts-jest
  },
  moduleFileExtensions: ['ts', 'js'], // Indique les extensions de fichiers à gérer
  roots: ['<rootDir>/tests'], // Définit où Jest recherche les tests
  testMatch: ['**/__tests__/**/*.test.ts'], // Recherche les fichiers de test dans le dossier __tests__ avec le suffixe .test.ts
  verbose: true, // Affiche les détails des tests
};
