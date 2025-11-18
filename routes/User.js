const express = require("express");
const router = express.Router();

// import the controllers and middlewares functions

const {
    sendotp,
    signup,
    login
} = require("../controllers/Auth");

const { auth } = require("../middlewares/auth")



router.post("/sendotp", sendotp);
router.post("/signup", signup);
router.post("/login", login);
// router.post("/changepassword", auth, changePassword)



// export all the routes
module.exports = router