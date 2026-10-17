
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
    res.send("Library Book Management API is running");
});

const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();