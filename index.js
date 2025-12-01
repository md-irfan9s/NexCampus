const express = require("express");
const app = express();

const dotenv = require("dotenv");
const database = require("./config/database")
const userRoutes = require("./routes/User");
const lostAndFoundRoutes = require("./routes/lostAndFound")
const profileRoutes = require("./routes/Profile")
const cookieParser = require("cookie-parser");
const {cloudinaryConnect} = require("./config/cloudinary")
const fileUpload = require("express-fileupload");


dotenv.config();

const PORT = process.env.PORT || 4000;

database.connect();


// middlewares
app.use(express.json());
app.use(cookieParser())

app.use(
    fileUpload({
        useTempFiles: true,
		tempFileDir: "/tmp",
    })
)

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/lostAndFound", lostAndFoundRoutes);
app.use("/api/v1/profile/", profileRoutes)


app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})