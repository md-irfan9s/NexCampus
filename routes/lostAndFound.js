const express = require("express");
const router = express.Router();

const {createCategory, getAllCategory, categoryPageDetail

} = require("../controllers/Category");

const {uploadData, getAllLostData} = require("../controllers/lostAndFound");

const {auth} = require("../middlewares/auth");



router.post("/createCategory",auth, createCategory);
router.get("/getAllCategory", getAllCategory)
router.post("/categoryPageDetail", categoryPageDetail)


// --------------------Creattion of lost data---------------------------

router.post("/uploadData",auth, uploadData);
router.get("/getAllLostData", getAllLostData);


module.exports = router