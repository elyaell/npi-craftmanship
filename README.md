# NPI Calculator Project

This project is a Reverse Polish Notation (NPI) calculator implemented in TypeScript. Reverse Polish Notation is a mathematical notation in which every operator follows all of its operands. It does not need any parentheses as long as the operators have a fixed number of operands. For example, the expression `3 + 4` in standard notation would be written as `3 4 +` in NPI.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/elyaell/npi-craftmanship
   cd npi-craftmanship-project
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Compile TypeScript files:**
   ```sh
   npx tsc
   ```

4. **Build the project using Webpack:**
   ```sh
   npm run build
   ```

5. **Run the application:**
   ```sh
   npm start
   ```

6. **Open the application in a web browser:**
   Open your web browser and navigate to `http://localhost:8080` to see the NPI Calculator interface.

## Running Tests

To run the tests for this project, use the following command:
```
npm test
```

## Configuration

- The TypeScript configuration can be found in `tsconfig.json`. You can modify the compiler options as needed.
- The `package.json` file contains scripts and dependencies required for the project.
- The Jest configuration can be found in `jest.config.js`.
- The Webpack configuration can be found in `webpack.config.js`.