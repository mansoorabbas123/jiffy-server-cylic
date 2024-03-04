# starter-express-api

This is the simplest possible nodejs api using express that responds to any request with: 
```
Yo!
```
project setup:

install node version 18+
npm install 
add env file
npm run db-migrate:run
npm run db-seed:run
npm run generate-models
npm start

### Deploy it in 7 seconds: 

[![Deploy to Cyclic](https://deploy.cyclic.app/button.svg)](https://deploy.cyclic.app/)

https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp

 
JWT authentication with refresh token strategy
https://dev.to/cyberwolves/jwt-authentication-with-access-tokens-refresh-tokens-in-node-js-5aa9
steps: 
1) create UserToken table and associate it with user (userId,token,createdAt)
2) create generateToken function(/utls/generateTokens.js) to create tokens ( will return both tokens) and verifyRefreshToken function as service (/utils/verfiyRefreshToken.js)
3) validation schema functions (/utils/validationSchema.js)
4) create routes (/routes/auth.js) (/routes/refreshToken.js)
5) add salt,private key for jwt in env file

so far:
created node repo with express and sequelize, setup migrations and seeders along db test
created seeder file for creating admin user
created migration for adding role in user table
created seeders for creating admin user in database
JWT authentication with refresh token strategy
added cloudinary for file upload and multer for image handling
added scripts for model generations

CREATE APIS FOR CATEGORY:
Steps:
1) Create migrations for categories table (done)
2) Create middleware for authentication and athorization (done)
3) Create endpoints for create(done)/get(done)/update/delete category (pending)


CREATE APIS FOR PRODUCT:
Steps:
1) Create migrations for products table (done)
2) Create endpoints for create/get/update/delete category (pending)
