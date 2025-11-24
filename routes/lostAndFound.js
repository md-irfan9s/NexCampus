const express = require("express");
const router = express.Router();

const {createCategory, getAllCategory, categoryPageDetail

} = require("../controllers/Category");

const {uploadData, getAllLostData, editLostData,
 showCategoryWiseData, deleteLostData, showtagWiseData} = require("../controllers/lostAndFound");

const {sendMessage} = require("../controllers/ConnectUser")

const {auth} = require("../middlewares/auth");



router.post("/createCategory",auth, createCategory);
router.get("/getAllCategory", getAllCategory)
router.post("/categoryPageDetail", categoryPageDetail)


// --------------------Creattion of lost data---------------------------

router.post("/uploadData",auth, uploadData);
router.put("/editLostData", auth, editLostData)
router.post("/showCategoryWiseData",auth, showCategoryWiseData)
router.delete("/deleteLostData", auth, deleteLostData)
router.get("/getAllLostData", getAllLostData);
router.post("/showtagWiseData", showtagWiseData)



// ----------------------Connect With User----------------------------------

router.post("/sendMessage", auth, sendMessage);


module.exports = router