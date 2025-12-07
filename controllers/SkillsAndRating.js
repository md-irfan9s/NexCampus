// import important model for creating skills and rating

const User = require("../models/User");
const SkillsAndRating = require("../models/SkillsAndRating");
const Profile = require("../models/Profile");
// Creation of rating and skills

exports.createSkillsRating = async (req, res) => {

    try {
        // find user id

        const { skill, rating } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);

        const profileId = user.additionalDetails;

        // check  user
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `user not found`
            })
        }

        if (!skill || !rating) {
            return res.status(400).json({
                success: false,
                message: `All input fields are required`
            })
        }

        // creation in  SkillsAndRating database model
        const updatedSkillsAndRating = await SkillsAndRating.create({
            skill,
            rating
        })

        // update in profile model

        await Profile.findByIdAndUpdate(
            profileId,
            { $push: { skillsandRating: updatedSkillsAndRating._id } },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: `SkillsAndRating Created Successfully`,
            updatedSkillsAndRating
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Something went wrong in SkillsAndRating`
        })
    }

}

// edit SkillsAndRating 

exports.editSkillsAndRating = async (req, res) => {

    try {

        // fetch data from req body
        const userId = req.user.id;
        const id = req.params.id;

        const {skill, rating} = req.body;

        const user = await User.findById(userId)

        const profileId = user.additionalDetails

        const existSkillsAndRating = await SkillsAndRating.findById(id);

        // update the data 
        const EditSkillsAndRating = await SkillsAndRating.findByIdAndUpdate(
            existSkillsAndRating._id,
            {$set:{
                skill:skill || existSkillsAndRating.skill,
                rating:rating || existSkillsAndRating.rating,
            }},
            { new : true }
        )

        // find profile id
        await Profile.findByIdAndUpdate(
            profileId,
            {$addToSet:{skillsandRating:EditSkillsAndRating._id}},
            { new : true }
        )

        return res.status(200).json({
            success:true,
            message:`SkillsAndRating edit successfully`,
            EditSkillsAndRating
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Something went wrong in edit SkillsAndRating`
        })

    }

}

// show user related SkillsAndRating

exports.showSkillsAndRating = async(req, res) => {

    try{

        const userId = req.user.id;

        const user = await User.findById(userId);

        const profileId = user.additionalDetails;

        const getSkillsAndRating = await Profile.findById(profileId)
                                    .populate({
                                        path: "skillsandRating",
                                        select:"skill rating"
                                    })

        
        return res.json({
            success:true,
            skills: getSkillsAndRating.skillsandRating
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Something went wrong in show SkillsAndRating`
        })
    }

}