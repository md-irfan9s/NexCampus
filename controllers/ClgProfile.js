const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User")
const Qualification = require("../models/Qualification")

require("dotenv").config()

exports.updateProfilePic = async (req, res) => {

    try {
        const updatePic = req.files.updatePic;

        const userId = req.user.id;

        const userImage = await uploadImageToCloudinary(
            updatePic,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: userImage.secure_url },
            { new: true }
        )

        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Error in updateprofilepic`
        })
    }

}


// update professional details

exports.updateProfessionalDetails = async (req, res) => {

    try {
        // fetch data from req body
        const {
            firstName = "",
            lastName = "",
            registrationNo = "",
            ExamRollNo = "",
            session = "",
            course = "",
        } = req.body

        const id = req.user.id;

        const userDetails = await User.findById(id);

        const profile = await Profile.findById(userDetails.additionalDetails);

        const user = await User.findByIdAndUpdate(id, 
            {firstName, lastName}
        )

        await user.save();
        console.log(user)

        profile.registrationNo = registrationNo,
        profile.ExamRollNo = ExamRollNo,
        profile.course = course,
        profile.session = session

        await profile.save();

        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.json({
            success:true,
            message:`Profile updated successfully`,
            updatedUserDetails
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

// Qualification details

exports.qualificationDetails = async(req, res) => {

    try{
        // Fetch data from req.body
        const {BoardName = "",
            obtained = "",
            year = ""} = req.body;


        const id = req.user.id;

        
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails)

        console.log(profile);

        console.log(userDetails);
        
        const details = await Qualification.create({
            BoardName,
            obtained,
            year,
            additionalDetails:profile._id
        })

        console.log(details);

        const updatedQualification = await Profile.findByIdAndUpdate(profile._id,
            {$push:{qualification:details._id}},
            { new: true }            
        )
        
        
        // return response

        return res.json({
            success:true,
            message:"Qualification updated successfully",
            updatedQualification
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wront in qualification Details"
        })
    }

}

// exports.updateProfessionalDetails = async (req, res) => {
//     try {
//         const {
//             firstName = "",
//             lastName = "",
//             registrationNo = "",
//             ExamRollNo = "",
//             session = "",
//             course = "",
//         } = req.body;

//         const userId = req.user.id;

//         // Fetch user
//         const userDetails = await User.findById(userId);
//         if (!userDetails) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Fetch profile
//         const profile = await Profile.findById(userDetails.additionalDetails);
//         if (!profile) {
//             return res.status(404).json({ success: false, message: "Profile not found" });
//         }

//         // Update User (no need to call save())
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { firstName, lastName },
//             { new: true, runValidators: true }
//         );

//         // Update Profile
//         profile.registrationNo = registrationNo;
//         profile.ExamRollNo = ExamRollNo;
//         profile.course = course;
//         profile.session = session;

//         await profile.save();

//         const updatedUserDetails = await User.findById(userId)
//             .populate("additionalDetails")
//             .exec();

//         return res.json({
//             success: true,
//             message: "Profile updated successfully",
//             updatedUserDetails,
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };
