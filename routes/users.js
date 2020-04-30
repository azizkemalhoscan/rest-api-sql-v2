var express = require('express');
var router = express.Router();
var User = require('../models/user').User;


/* GET users listing. */
router.get('/users', (req, res) => {
  const users = User.findAll({})
  res.json(users);
});

/* POST /api/users 201 - Creates a user, sets the Location header
to "/", and returns no content  res.redirect may be the wrong soluttion*/

// router.post('/users', (req, res) => {
//   const user = req.body;
//   users.push(user)
//   res.status(201).end();
//   // res.redirect('/');
// })




module.exports = router;
