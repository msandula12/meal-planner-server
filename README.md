# MealPlanner API

Backend API for the [MealPlanner frontend](https://github.com/msandula12/meal-planner-client).

## Getting started

To run this project locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run start` to start the local server (add `:watch` to serve it with nodemon)

## Code Overview

Express application that points to a MongoDB database.

### Dependencies
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - For encrypting/decrypting user passwords 
- [dayjs](https://github.com/iamkun/dayjs) - For parsing/formatting dates
- [expressjs](https://github.com/expressjs/express) - For handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
