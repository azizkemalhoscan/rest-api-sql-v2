var express = require('express');
var router = express.Router();
// ES6 SYNTAX
const { Course } = require('../models');
let courses;

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

// Get all copurses data in the format of json // WORKS!
router.get('/courses', asyncHandler(async(req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
}));

// Get a unique course get it from its ID // WORKS!

router.get('/courses/:id', asyncHandler( async(req, res) => {
  const courses = await Course.findAll();
  const course = courses.find(course => course.id == req.params.id);
  res.json(course);
}));

// Create Courses

router.post('/courses', asyncHandler(async(req, res) => {
  const course = await Course.create(req.body
    // title: req.body.title,
    // description: req.body.description,
    // estimatedTime: req.body.estimatedTime,
    // materialsNeeded: req.body.materialsNeeded
  );
  courses.push(course);
}));

// Update Courses  // WORKS!

router.put('/courses/:id', asyncHandler( async(req, res) => {
  const course = await Course.findByPk(req.params.id);
  res.json(course);
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
