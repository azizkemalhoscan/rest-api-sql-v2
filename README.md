
# Full Stack JavaScript Techdegree v2 - REST API Project

## Overview of the Provided Project Files

We've supplied the following files for you to use:

* The `seed` folder contains a starting set of data for your database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create your app's database and populate it with data (we'll explain how to do that below).
* We've included a `.gitignore` file to ensure that the `node_modules` folder doesn't get pushed to your GitHub repo.
* The `app.js` file configures Express to serve a simple REST API. We've also configured the `morgan` npm package to log HTTP requests/responses to the console. You'll update this file with the routes for the API. You'll update this file with the routes for the API.
* The `nodemon.js` file configures the nodemon Node.js module, which we are using to run your REST API.
* The `package.json` file (and the associated `package-lock.json` file) contain the project's npm configuration, which includes the project's dependencies.
* The `RESTAPI.postman_collection.json` file is a collection of Postman requests that you can use to test and explore your REST API.

## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install

```

Second, seed the SQLite database.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).

DONT FORGET TO COMPLETE

1 If Sequelize throws an error related to a mismatch between the model and the associated table, the error message should tell you the cause of the problem.
2 Users get and post routes impelementedet WITH OME PROBLEMs
3 I think my foreign key is not working properly.
4 Unintentionally importeed seed file to routes rather than importing models.
5 Express middleware --- where are you going to implement it

--------------------------------------------------

STEPS THAT ARE FOLLOWED WHEN SOLVING THIS PROJECT

1- Downloaded project files and started an express app with command  -> npx express-generator.

2- Then Changed app.js file which generated by prior command with app.js file which is provided in project files.

3- I changed some configuration on package.json file -> Scripts, keywords etc..

4- Installed sequelize npm install sequelize than also installed its CLI

5- npx sequelize init to initialize relevant folders and files in our app.

6- bin/www file we imported models and sequelize firts then chained them as a promise to
sync the app everytime the app refreshes.

7- In config.json file commented out generated configs and added only storage and dialect

8- Testing the connection with DB

  a) First required sequelize on app.js file.

  b) Then set sequelize to a new initiazted Sequelize object as on line 20..

  c) Then used an async function which is an IIFE to authenticate DB connection line 25..

9- Define Users and Courses Models

  a) User.js created than defined model with id, name, surname, email, password models/user.js

  b) Course.js created defined model as you can see in file allowedNull for last 2 properties and userId property not imported yet.

10- Relationships between models are defined on lines 27 of each model definition files.
Using  [Model].Associate = (models) => {}

11- Created routes/course.js file but will use already built users.js file.

12- Line 15/16/17   15 is implemented app to understand incoming object is expected json
16 is to add '/api' prefix to courses routes and 17 is the same for users

13- Users get and post routes impelementedet WITH OME PROBLEMs

14- Courses routes ....

