var express = require('express');
var router = express.Router();
const User = require('../models').User;
// Hash Passwords
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
// Handler function to wrap each route

const validateFirstName = check("firstName")
.exists({
  checkNull: true,
  checkFalsy: true
})
.withMessage('Please provide a vaue for "First Name"');

const validateLastName = check("lastName")
.exists({
  checkNull: true,
  checkFalsy: true
})
.withMessage('Please provide a vaue for "Last Name"');

const validateEmailAddress = check("emailAddress")
.exists({
  checkNull: true,
  checkFalsy: true
})
.withMessage('Please provide a vaue for "Email address"');

const validatePassword =  check('password')
.exists({
  checkNull: true,
  checkFalsy: true
})
.withMessage('Please provide a value for "Password"');

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(error){
      next(error);
    }
  }
}

let users;
/* GET users listing. */
router.get('/users', asyncHandler(async(req, res) => {
  users = await User.findAll();
  res.json(users);
}));

/* POST /api/users 201 - Creates a user, sets the Location header
to "/", and returns no content  res.redirect may be the wrong soluttion*/

router.post('/users/', [validateFirstName, validateLastName, validateEmailAddress, validatePassword], asyncHandler(async(req, res) => {
  const user = await User.create(req.body);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const errormessages = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errormessages });
  } else {
    user.password = bcryptjs.hashSync(user.password);
    users.push(user);
    res.status(201).json(users).end();
  }
  // res.redirect('/');
}));



module.exports = router;


// const nameValidationChain = check('name')
  // .exists({ checkNull: true, checkFalsy: true })
  // .withMessage('Please provide a value for "name"');
