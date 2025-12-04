const express = require("express");
const router = express.Router();

const {showUserPost, showResponse} = require("../controllers/L&FProfile");
const {updateProfilePic, updateProfessionalDetails,
    qualificationDetails, updatePersonalDetails
} = require("../controllers/ClgProfile")

const {auth} = require("../middlewares/auth")

//---------------------------Lost And Found------------------------------------------------

router.get("/showUserPost", auth, showUserPost)
router.get("/showResponse", auth, showResponse);

//--------------------------College Management Profile-------------------------------------

router.post("/updateProfilePic", auth, updateProfilePic)
router.post("/updateProfessionalDetails", auth, updateProfessionalDetails);
router.post("/qualificationDetails", auth, qualificationDetails);

router.post("/updatePersonalDetails", auth, updatePersonalDetails)

module.exports = router