
const mongoose = require("mongoose");
const Book = require("../models/Book");
const Author = require("../models/Author");

// Create a new book
const createBook = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body cannot be empty"
            });
        }

        const { title, author, isbn, genre, publishedYear, available } = req.body;

        if (!title || !author || !isbn || !genre || publishedYear === undefined) {
            return res.status(400).json({
                success: false,
                message: "Title, author, ISBN, genre and published year are required"
            });
        }

        if (!mongoose.isValidObjectId(author)) {
            return res.status(400).json({
                success: false,
                message: "Invalid author ID"
            });
        }

        const existingAuthor = await Author.findById(author);

        if (!existingAuthor) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }

        const book = await Book.create({
            title,
            author,
            isbn,
            genre,
            publishedYear,
            available
        });

        const savedBook = await Book.findById(book._id).populate("author");

        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: savedBook
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "A book with this ISBN already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create book"
        });
    }
};

// Get all books and filter them
const getBooks = async (req, res) => {
    try {
        const filter = {};

        if (req.query.genre) {
            filter.genre = req.query.genre;
        }

        if (req.query.author) {
            if (!mongoose.isValidObjectId(req.query.author)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid author ID"
                });
            }

            filter.author = req.query.author;
        }

        if (req.query.available !== undefined) {
            if (!["true", "false"].includes(req.query.available)) {
                return res.status(400).json({
                    success: false,
                    message: "Available must be true or false"
                });
            }

            filter.available = req.query.available === "true";
        }

        if (req.query.search) {
            filter.title = {
                $regex: req.query.search,
                $options: "i"
            };
        }

        const books = await Book.find(filter)
            .populate("author")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            data: books
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch books"
        });
    }
};

// Get one book by ID
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID"
            });
        }

        const book = await Book.findById(id).populate("author");

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book fetched successfully",
            data: book
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch book"
        });
    }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID"
            });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body cannot be empty"
            });
        }

        if (req.body.author !== undefined) {
            if (!mongoose.isValidObjectId(req.body.author)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid author ID"
                });
            }

            const existingAuthor = await Author.findById(req.body.author);

            if (!existingAuthor) {
                return res.status(404).json({
                    success: false,
                    message: "Author not found"
                });
            }
        }

        const book = await Book.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate("author");

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "A book with this ISBN already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to update book"
        });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID"
            });
        }

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete book"
        });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
};
