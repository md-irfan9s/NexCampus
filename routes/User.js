const express = require("express");
const router = express.Router();

// import the controllers and middlewares functions

const {
    sendotp,
    signup,
    login
} = require("../controllers/Auth");


const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")

// -------------------- AUTHENTICATIONS ------------------------------

router.post("/sendotp", sendotp);
router.post("/signup", signup);
router.post("/login", login);
// router.post("/changepassword", auth, changePassword)

// --------------------- RESET PASSWORD ------------------------------
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);



// export all the routes
module.exports = router