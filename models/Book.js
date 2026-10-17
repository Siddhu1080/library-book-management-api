
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Book title is required"],
            trim: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author",
            required: [true, "Author is required"]
        },

        isbn: {
            type: String,
            required: [true, "ISBN is required"],
            unique: true,
            trim: true
        },

        genre: {
            type: String,
            enum: [
                "Fiction",
                "Non-Fiction",
                "Science",
                "History",
                "Technology"
            ],
            required: [true, "Genre is required"]
        },

        publishedYear: {
            type: Number,
            required: [true, "Published year is required"],
            min: [1000, "Published year must be at least 1000"],
            max: [new Date().getFullYear(), "Published year cannot be in the future"]
        },

        available: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
