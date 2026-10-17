
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Author name is required"],
            minlength: [2, "Author name must contain at least 2 characters"],
            trim: true
        },

        email: {
            type: String,
            unique: true,
            sparse: true,
            lowercase: true,
            trim: true
        },

        country: {
            type: String,
            trim: true
        },

        bio: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
