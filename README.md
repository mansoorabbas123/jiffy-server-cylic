# starter-express-api

This is the simplest possible nodejs api using express that responds to any request with: 
```
Yo!
```
project setup:

install node version 18+
npm install 
npm run db-seed:run
npm run db-migrate:run

npm start

### Deploy it in 7 seconds: 

[![Deploy to Cyclic](https://deploy.cyclic.app/button.svg)](https://deploy.cyclic.app/)

https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp

so far:
created node repo with express and sequelize, setup migrations and seeders along db test
created seeder file for creating admin user (incomplete)
created migration for adding role in user table ( later i will combine it with seeder and first migration )

todo: 
https://dev.to/cyberwolves/jwt-authentication-with-access-tokens-refresh-tokens-in-node-js-5aa9
JWT authentication with refresh token strategy
steps: 
1) create UserToken table and associate it with user (userId,token,createdAt)
2) create generateToken function(/utls/generateTokens.js) to create tokens ( will return both tokens) and verifyRefreshToken function as service (/utils/verfiyRefreshToken.js)
3) validation schema functions (/utils/validationSchema.js)
4) create routes (/routes/auth.js) (/routes/refreshToken.js)
5) add salt,private key for jwt in env file
