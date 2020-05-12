var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
// ES6 SYNTAX
const Course  = require('../models').Course;
const User = require('../models').User;
const auth = require('basic-auth');
let courses = [];
let users;

const validateTitle = check("title")
.exists({
  checkNull: true,
  checkFalsy: true
})
.withMessage('Please provide a vaue for "Title"');

const validateDescription = check("description")
.exists({
  checkNull: true,
  checkFalsy: true
})
.withMessage('Please provide a vaue for "Description"');

// Handler function to wrap each route

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(error){
      next(error);
    }
  }
}

// Authentication middleware
// YOU NEDD TO MAKE SOME CHANGES HERE.

const authenticateUser = (req, res, next) => {
  const credentials = auth(req);
  if(credentials){
    const user = users.find(u => u.username === credentials.name);
    if(user){
      const authenticated = bcryptjs
      .compareSync( credentials.pass, user.password);
      if(authenticated){
        req.currentUser = user;
      } else {
        message = 'Authentication failed';
      }
    } else {
      message = 'User not found';
    }
   } else {
    message = 'Auth header not found';
  }
  if(message) {
    console.warn(message);
    res.status(401).json({ message: 'Access denied' });
  } else {
    next();
  }
}

// Get all copurses data in the format of json // WORKS!
router.get('/courses', asyncHandler(async(req, res) => {
  const courses = await Course.findAll({
    include: [{
      model: User
    }]
  });
  res.json(courses);
}));

// Get a unique course get it from its ID // WORKS!

router.get('/courses/:id', asyncHandler( async(req, res) => {
  const courses = await Course.findAll({
    include: [{
      model: User
    }]
  });
  const course = courses.find(course => course.id == req.params.id);
  res.json(course);
}));

// Create Courses // PROBLEMSSS
// AUTHENTICATEUSER Will be added later.


router.post('/courses',[validateTitle, validateDescription], asyncHandler(async(req, res) => {

  const course = await Course.create(req.body);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const errormessages = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errormessages })
  } else {
    courses.push(course);
    res.status(201).json(courses).end();
  }
  console.log(course.id);
  res.redirect(`/courses/:${course.id}`);
}));

// Update Courses  // WORKS!

router.put('/courses/:id', asyncHandler( async(req, res) => {
  const course = await Course.findByPk(req.params.id);
  if(course){
    await course.update(req.body);
  } else {
    res.sendStatus(404);
  }
}));

// Delete Courses // WORKS!

router.delete('/courses/:id', asyncHandler( async(req, res) => {
  const course = await Course.findByPk(req.params.id);
  if(course){
    await course.destroy();
    res.sendStatus(200);
  } else {
    throw error;
  }
}));



module.exports = router;
