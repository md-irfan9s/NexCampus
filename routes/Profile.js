const express = require("express");
const router = express.Router();

const {showUserPost, showResponse} = require("../controllers/L&FProfile");

const {auth} = require("../middlewares/auth")

router.get("/showUserPost", auth, showUserPost)
router.get("/showResponse", auth, showResponse);


module.exports = router