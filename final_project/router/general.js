const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = { username, password };
  if (users.filter((user) => user.username === username && user.password === password).length === 0) {
    users.push(newUser);
    res.json({ message: "User registered successfully", user: users });
  } else {
    res.send("User already exists!");
  }
});


// Get the book list available in the shop
public_users.get("/", function (req, res) {
  res.json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books.hasOwnProperty(isbn)) {
    res.json(books[isbn]);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const book = Object.values(books).filter((book) => book.author === author);
  if (book) {
    res.send(book);
  } else {
    res.status(404).json({ error: "Book not found!" });
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const book = Object.values(books).filter((book) => book.title === title);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "No books found with the provided title" });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books.hasOwnProperty(isbn)) {
    res.json(books[isbn].reviews);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

module.exports.general = public_users;
