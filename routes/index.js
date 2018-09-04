const express = require('express');

const Book = require("../models/book-model.js");

const router = express.Router();


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/books", (req, res, next) => {
  Book.find()
    .then(bookResults => {
      // send the database results to the template as "bookArray"
      res.locals.bookArray = bookResults;
      res.render("book-list.hbs");
    })
    // "next()" means show the error page
    .catch(err => next(err));
});

// This route must be ABOVE "/book/:bookId" (order matters with similar URLs)
router.get("/book/add", (req, res, next) => {
  res.render("book-form.hbs");
});

// Link to this page: /book/999
router.get("/book/:bookId", (req, res, next) => {
  // get the ID from the URL (it's inside of "req.params")
  const { bookId } = req.params;

  Book.findById(bookId)
    .then(bookDoc => {
      // send the database result (1) to the template as "bookItem"
      res.locals.bookItem = bookDoc;
      res.render("book-details.hbs");
    })
    // "next()" means show the error page
    .catch(err => next(err));
});

router.post("/process-book", (req, res, next) => {
  // make variables from the inputs inside "req.body"
  // (we use "req.body" because it's a POST form submission)
  const { title, author, description, rating } = req.body;

  // save input variables in our new book
  Book.create({ title, author, description, rating })
    .then(bookDoc => {
      // redirect if it's successful to avoid duplicating the submission
      // (redirect ONLY to URLs - "/books" instead of "book-list.hbs")
      res.redirect("/books");
    })
    .catch(err => next(err));
});


module.exports = router;
