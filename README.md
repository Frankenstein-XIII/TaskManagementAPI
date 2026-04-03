# Task Management API 
--------------------installation and project setup-------------------
1. initialize project 
- `npm init -y `

2. install express 
 - `npm install express` 


3. install TS and Dev tools 
- `npm install -D typescript ts-node @types/node @types/express nodemon`

4. initialize tsconfig 
- `npx tsc --init`

5. modify the tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",           // Modern JS output
    "module": "nodenext",         // Standard for Node.js
    "rootDir": "./src",           // Where your TS code lives
    "outDir": "./dist",           // Where compiled JS goes
    "strict": true,               // Enables all strict type-checking
    "esModuleInterop": true,      // Fixes import issues with Express
    "skipLibCheck": true,          // Speeds up compilation
     "verbatimModuleSyntax": false,
  }
}

6. Folder structure
taskflow-api/
├── node_modules/
├── src/
│   ├── controllers/      # Logic for handling requests
│   ├── models/           # Interfaces & Abstract Classes
│   ├── routes/           # Express URL paths
│   └── app.ts            # Main entry point
├── package.json
└── tsconfig.json

6.1 on linux and macOS, create src folder 
- `mkdir -p src/controllers src/models src/routes`

7. update package.json 
"scripts": {
  "build": "tsc",
  "start": "node dist/app.js",
  "dev": "tsx watch src/app.ts"
}

--------------adding security layer----------
1. install libraries 
- `npm install bcryptjs jsonwebtocken`
- `npm install @types/bcryptjs @types/jsonwebtoken`

----- adding MongoDB----
1. install mongoose
- `npm install mangoose`
