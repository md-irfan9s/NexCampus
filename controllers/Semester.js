const User = require("../models/User");
const Semester = require("../models/Semester");
const Profile = require("../models/Profile");


exports.uploadAdmitCard = async(req, res) => {

    try{

        const userId = req.user.id;

        // fetch data from req body
        const {semesterName, admitCard} = req.body;

        const user = await User.findById(userId);

        
        const profileId = user.additionalDetails;

        if(!semesterName || !admitCard) {
            return res.status(400).json({
                success:false,
                message:`All fields are required`
            })
        }

        const uploadedAdmitCard = await Semester.create({
            semesterName,
            admitCard,
        })

        await Profile.findByIdAndUpdate(
            profileId,
            {$push:{semester:uploadedAdmitCard._id}},
            { new : true} 
        )

        // return response 

        return res.status(200).json({
            success:true,
            message:`Admit Card Created Successfully`
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}