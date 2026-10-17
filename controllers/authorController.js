
const mongoose = require("mongoose");
const Author = require("../models/Author");
const Book = require("../models/Book");

// Create a new author
const createAuthor = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body cannot be empty"
            });
        }

        const { name, email, country, bio } = req.body;

        if (!name || name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: "Author name must contain at least 2 characters"
            });
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        const author = await Author.create({
            name,
            email,
            country,
            bio
        });

        return res.status(201).json({
            success: true,
            message: "Author created successfully",
            data: author
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "An author with this email already exists"
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
            message: "Failed to create author"
        });
    }
};

// Get all authors
const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Authors fetched successfully",
            data: authors
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch authors"
        });
    }
};

// Get one author
const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid author ID"
            });
        }

        const author = await Author.findById(id);

        if (!author) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Author fetched successfully",
            data: author
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch author"
        });
    }
};

// Get all books written by an author
const getAuthorBooks = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid author ID"
            });
        }

        const author = await Author.findById(id);

        if (!author) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }

        const books = await Book.find({ author: id });

        return res.status(200).json({
            success: true,
            message: "Author's books fetched successfully",
            data: books
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch author's books"
        });
    }
};

// Update an author
const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid author ID"
            });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body cannot be empty"
            });
        }

        if (req.body.name !== undefined &&
            (typeof req.body.name !== "string" || req.body.name.trim().length < 2)) {
            return res.status(400).json({
                success: false,
                message: "Author name must contain at least 2 characters"
            });
        }

        if (req.body.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        const author = await Author.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!author) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Author updated successfully",
            data: author
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "An author with this email already exists"
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
            message: "Failed to update author"
        });
    }
};

// Delete an author if they have no books
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid author ID"
            });
        }

        const author = await Author.findById(id);

        if (!author) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }

        const books = await Book.exists({ author: id });

        if (books) {
            return res.status(409).json({
                success: false,
                message: "Cannot delete this author because they still have books"
            });
        }

        await Author.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Author deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete author"
        });
    }
};

module.exports = {
    createAuthor,
    getAuthors,
    getAuthorById,
    getAuthorBooks,
    updateAuthor,
    deleteAuthor
};
