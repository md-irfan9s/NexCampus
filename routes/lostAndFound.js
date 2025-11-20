const express = require("express");
const router = express.Router();

const {createCategory, getAllCategory, categoryPageDetail

} = require("../controllers/Category");

const {auth} = require("../middlewares/auth");



router.post("/createCategory",auth, createCategory);
router.get("/getAllCategory", getAllCategory)
router.post("/categoryPageDetail", categoryPageDetail)


module.exports = router