
const express = require("express");

const {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const router = express.Router();

// Create a book
router.post("/", createBook);

// Get all books, with optional filters
router.get("/", getBooks);

// Get one book by ID
router.get("/:id", getBookById);

// Update a book
router.put("/:id", updateBook);

// Delete a book
router.delete("/:id", deleteBook);

module.exports = router;
