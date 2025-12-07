const express = require("express");
const router = express.Router();

const {showUserPost, showResponse} = require("../controllers/L&FProfile");
const {updateProfilePic, updatePersonalDetails, showPersonalDetails
} = require("../controllers/ClgProfile")
const {uploadProject, editProject} = require("../controllers/Project")
const {createSkillsRating, editSkillsAndRating, showSkillsAndRating} = require("../controllers/SkillsAndRating");
// const {uploadAdmitCard} = require("../controllers/Semester")

const {auth} = require("../middlewares/auth")

//---------------------------Lost And Found------------------------------------------------

router.get("/showUserPost", auth, showUserPost)
router.get("/showResponse", auth, showResponse);

//--------------------------College Management Profile-------------------------------------

router.post("/updateProfilePic", auth, updateProfilePic)
// router.post("/updateProfessionalDetails", auth, updateProfessionalDetails);
// router.post("/qualificationDetails", auth, qualificationDetails);

router.post("/updatePersonalDetails", auth, updatePersonalDetails)
router.get("/showPersonalDetails", auth, showPersonalDetails)

// Upload Project Details

router.post("/uploadProject", auth, uploadProject);
router.post("/editProject/:id", auth, editProject);

// upload skills and rating
router.post("/createSkillsRating", auth, createSkillsRating);
router.post("/editSkillsAndRating/:id", auth, editSkillsAndRating)
router.get("/showSkillsAndRating", auth, showSkillsAndRating)


module.exports = router