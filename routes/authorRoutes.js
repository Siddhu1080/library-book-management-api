
const express = require("express");

const {
    createAuthor,
    getAuthors,
    getAuthorById,
    getAuthorBooks,
    updateAuthor,
    deleteAuthor
} = require("../controllers/authorController");

const router = express.Router();

// Create an author
router.post("/", createAuthor);

// Get all authors
router.get("/", getAuthors);

// Get all books written by an author
router.get("/:id/books", getAuthorBooks);

// Get one author
router.get("/:id", getAuthorById);

// Update an author
router.put("/:id", updateAuthor);

// Delete an author
router.delete("/:id", deleteAuthor);

module.exports = router;
