const express = require("express");
const app = express();

const dotenv = require("dotenv");
const database = require("./config/database")
const userRoutes = require("./routes/User");
const lostAndFoundRoutes = require("./routes/lostAndFound")
const cookieParser = require("cookie-parser");

dotenv.config();

const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cookieParser())

database.connect();



app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/lostAndFound", lostAndFoundRoutes);


app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})