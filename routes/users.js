var express = require('express');
var router = express.Router();
const User = require('../models').User;
const auth = require('basic-auth');
// Hash Passwords
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
// Handler function to wrap each route

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


const authenticateUser = (req, res, next) => {
  let message = null;
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
};

// -------------------------------------------------------------

let users = [];
/* GET users listing. */
router.get('/users/:id', authenticateUser, asyncHandler(async(req, res) => {
  users = await User.findAll();
  // users.push(allUsers);
  const user = users.find(user => user.id == req.params.id)
  res.json(user);
}));

/* POST /api/users 201 - Creates a user, sets the Location header
to "/", and returns no content  res.redirect may be the wrong soluttion*/

//

router.post('/users', allValidations, asyncHandler(async(req, res) => {
  const user = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const errormessages = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errormessages });
  } else {
    user.password = bcryptjs.hashSync(user.password);
    users.push(user);
    res.status(201).end();
  }
  res.redirect('/');
}));



module.exports = router;

