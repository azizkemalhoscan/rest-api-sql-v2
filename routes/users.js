var express = require('express');
var router = express.Router();
const User = require('../models').User;
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

let users;
/* GET users listing. */
router.get('/users', asyncHandler(async(req, res) => {
  users = await User.findAll();
  res.json(users);
}));

/* POST /api/users 201 - Creates a user, sets the Location header
to "/", and returns no content  res.redirect may be the wrong soluttion*/

router.post('/users', asyncHandler(async(req, res) => {
  const user = await User.create(req.body);
  users.push(user);
  res.redirect('/');
}));


// router.post('/books/new/', asyncHandler(async(req, res) => {
//   let book;
//   try{
//     book = await Book.create(req.body);
//     res.redirect(book.id);
//   } catch (error) {
//     if(error.name === "SequelizeValidationError"){
//       book = await Book.build(req.body);
//       res.render('books/new-book', { book: book, errors: error.errors, title: "New Book"})
//     } else {
//       throw error;
//     }
//   }
// }));


module.exports = router;
