const express = require("express");
const app = express();

const dotenv = require("dotenv");
const database = require("./config/database")
const userRoutes = require("./routes/User");
const cookieParser = require("cookie-parser");

dotenv.config();

const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cookieParser())

database.connect();



app.use("/api/v1/auth", userRoutes);


app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})