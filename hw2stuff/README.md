# ece5904hw2



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

Initiate and set up dependencies (already done)
```
npm init
npm install nodemon ts-node --save-dev
npm install typescript --save-dev
npm install @types/express @types/node --save-dev
npm install express --save
npx tsc --init

npm install body-parser
```

change tsonfig.json to set up directory for js translated from ts (already done)

```
{
    "compilerOptions": {
        "target": "es2016", 
        "module": "commonjs",
        "rootDir": "./", 
        "sourceMap": true,
        "outDir": "./dist",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
    }
}
```
Add the following useful scripts to package.json(already done)
```
scripts": {
"build": "npx tsc",
"start": "node dist/server.js",
"dev": "nodemon server.ts"
},
```
Start each time
```
// Compile ts files to js
npm run build
// If you are just starting the server for normal use
npm run start
// Or if you are developing and you want nodemon to turn off and on the server for you each time there is a change made
npm run dev
```
Then open http://localhost:3000 on a browser