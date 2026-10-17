# Library Book Management API

A REST API built using Node.js, Express.js, MongoDB, and Mongoose to manage library authors and books.

## Features

- Create, retrieve, update, and delete authors.
- Retrieve books written by a specific author.
- Create, retrieve, update, and delete books.
- Search books by title.
- Filter books by genre, author, and availability.
- Validate input and handle errors.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman

## Project Structure

```text
library-api/
├── config/
├── controllers/
├── middleware/
├── models/
├── postman/
├── routes/
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd library-api
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Replace the placeholder with your MongoDB connection string. Never upload your actual `.env` file to GitHub.

### 4. Start the server

```bash
npm run dev
```

The API should run at:

`http://localhost:5000`

## API Endpoints

### Authors

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/authors` | Create an author |
| GET | `/api/authors` | Get all authors |
| GET | `/api/authors/:id` | Get an author by ID |
| GET | `/api/authors/:id/books` | Get books by author |
| PUT | `/api/authors/:id` | Update an author |
| DELETE | `/api/authors/:id` | Delete an author |

### Books

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/books` | Create a book |
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a book by ID |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

### Book Filters

The `GET /api/books` endpoint supports filtering by genre, author, and availability, as well as title search.

Example:

```text
GET /api/books?genre=Fiction
GET /api/books?available=true
GET /api/books?search=umbrella
```

## Testing with Postman

Import the collection and environment JSON files from the `postman/` directory into Postman. Select the appropriate environment and run the requests against your local API.

## API Documentation

Published Postman documentation:

https://documenter.getpostman.com/view/59008331/2sBYHSxLCg
