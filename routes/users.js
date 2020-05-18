var express = require('express');
var router = express.Router();
const User = require('../models').User;
const auth = require('basic-auth');
// Hash Passwords
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
// Handler function to wrap each route
let users = [];
/* ------------------------------------------------------------
 VALIDATIONS */
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

const allValidations = [validateFirstName, validateLastName, validateEmailAddress, validatePassword];

// ----------------------------------------------------------------
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
// --------------------------------------------------------------

const authenticateUser = async(req, res, next) => {
  let message = null;
  const credentials = auth(req);
  console.log(credentials);
  if(credentials){
    const users = await User.findAll();
    const user = await users.find(u => u.emailAddress === credentials.name);
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
};

// -------------------------------------------------------------


/* GET users listing. */
router.get('/users', authenticateUser, asyncHandler((req, res) => {
  const user = req.currentUser;
  console.log(user);
  res.status(200).json(user).end();
  // users = await User.findAll();
  // // users.push(allUsers);
  // const user = users.find(user => user.id == req.params.id)
  // res.json(user);
}));



router.post('/users', allValidations, asyncHandler(async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const errormessages = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errormessages })
  } else {
    req.body.password = await bcryptjs.hashSync(req.body.password);
    const user = await User.create(req.body);
    users.push(user);
    res.status(201).location('/').end();
  }
  // res.redirect('/');
}));



module.exports = router;

