const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username) => {
  let usersWithusername = users.filter((user) => {
    return user.username === username;
  });
  if (usersWithusername.length > 0) {
    return true;
  } else {
    return false;
  }
};


const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password)
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};



public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
  return res.status(300).json({ message: "List of books" + JSON.stringify(books) });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn]);
  return res.status(300).json({ message: "Get book by isbn" });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  let author = req.params.author;
  const keys = Object.keys(books);
  const getBookByAuthor = keys.filter((value) => value(author));
  res.send(getBookByAuthor);
  return res.status(300).json({ message: "Get book by author" });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  let title = req.params.title;
  const keys = Object.keys(books);
  const getBookByTitle = keys.filter((value) => value.title === title);
  res.send(getBookByTitle);
  return res.status(300).json({ message: "Get book by title" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  const bookDetails = books(isbn);
  const keys = Object.keys(isbn);
  const getReviewsByISBN = keys[0].reviews;
  res.send(getReviewsByISBN);
  return res.status(300).json({ message: "Get review ny ISBN" });
});

module.exports.general = public_users;
