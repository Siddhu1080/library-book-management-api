# Library Book Management API

A REST API built using Node.js, Express.js, MongoDB, and Mongoose to manage authors and books.

## Features

- Create, view, update, and delete authors.
- Create, view, update, and delete books.
- Search books by title.
- Filter books by genre, author, and availability.
- Validate inputs and handle errors.
- Prevent deleting authors who still have books.

## Technologies Used

- Node.js and Express.js
- MongoDB Atlas and Mongoose
- Postman
- Git and GitHub

## Project Structure

```text
library-book-management-api/
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── postman/
├── server.js
├── package.json
├── .env.example
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Siddhu1080/library-book-management-api.git
cd library-book-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Replace the placeholder with your MongoDB connection string. Never upload `.env` or database credentials to GitHub.

### 4. Start the server

```bash
npm run dev
```

API URL: `http://localhost:5000`

## API Endpoints

### Authors

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/authors` | Create an author |
| GET | `/api/authors` | Get all authors |
| GET | `/api/authors/:id` | Get an author |
| GET | `/api/authors/:id/books` | Get an author's books |
| PUT | `/api/authors/:id` | Update an author |
| DELETE | `/api/authors/:id` | Delete an author |

### Books

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/books` | Create a book |
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

The books endpoint supports searching by title and filtering by genre, author, and availability.

## Author–Book Relationship

One author can have multiple books. Each book stores a reference to its author using a MongoDB ObjectId.

## Postman Documentation

[View API Documentation](https://documenter.getpostman.com/view/59008331/2sBYHSxLCg)

The exported Postman collection and environment are available in the `postman/` folder.

## GitHub Repository

https://github.com/Siddhu1080/library-book-management-api
