const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User")
const PersonalDetails = require("../models/personalDetails");


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



exports.updatePersonalDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const profileId = user.additionalDetails;


        // ensure document exists
        let details = await PersonalDetails.findOne({ additionalDetails: profileId });
        if (!details) {
            details = await PersonalDetails.create({ additionalDetails: profileId });
        }

        // update
        const updated = await PersonalDetails.findOneAndUpdate(
            { additionalDetails: profileId },
            { $set: req.body },
            { new: true }
        );

        // update in profile 

        await Profile.findByIdAndUpdate(
            profileId,
            {$addToSet:{personalDetails:updated._id}}
        )

        res.json({ success: true, updated });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Show all Personal Details for single user

exports.showPersonalDetails = async(req, res) => {

    try{

        // find user related data 
        
        const userId = req.user.id;

        const user = await User.findById(userId);

        const profileId = user.additionalDetails;

        // get only single user details
        const personalDetails = 
                    await Profile.findById(profileId).populate("personalDetails").exec();

        console.log(personalDetails);
        return res.status(200).json({
            success:true,
            personalDetails,
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Server Error`
        })
    }

}



// // update professional details

// exports.updateProfessionalDetails = async (req, res) => {

//     try {
//         // fetch data from req body
//         const {
//             firstName = "",
//             lastName = "",
//             registrationNo = "",
//             ExamRollNo = "",
//             session = "",
//             course = "",
//         } = req.body

//         const id = req.user.id;

//         const userDetails = await User.findById(id);

//         const profile = await Profile.findById(userDetails.additionalDetails);

//         const user = await User.findByIdAndUpdate(id, 
//             {firstName, lastName}
//         )

//         await user.save();
//         console.log(user)

//         profile.registrationNo = registrationNo,
//         profile.ExamRollNo = ExamRollNo,
//         profile.course = course,
//         profile.session = session

//         await profile.save();

//         const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

//         return res.json({
//             success:true,
//             message:`Profile updated successfully`,
//             updatedUserDetails
//         })
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }

// }

// // Qualification details

// // exports.qualificationDetails = async(req, res) => {

// //     try{
// //         // Fetch data from req.body
// //         const {BoardName = "",
// //             obtained = "",
// //             year = ""} = req.body;


// //         const id = req.user.id;

        
// //         const userDetails = await User.findById(id);
// //         const profile = await Profile.findById(userDetails.additionalDetails)

// //         console.log(profile);

// //         console.log(userDetails);
        
// //         const details = await Qualification.create({
// //             BoardName,
// //             obtained,
// //             year,
// //             additionalDetails:profile._id
// //         })

// //         console.log(details);

// //         const updatedQualification = await Profile.findByIdAndUpdate(profile._id,
// //             {$push:{qualification:details._id}},
// //             { new: true }            
// //         )
        
        
// //         // return response

// //         return res.json({
// //             success:true,
// //             message:"Qualification updated successfully",
// //             updatedQualification
// //         })
// //     }
// //     catch(error){
// //         console.log(error)
// //         return res.status(500).json({
// //             success:false,
// //             message:"Something went wront in qualification Details"
// //         })
// //     }

// // }


// exports.qualificationDetails = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const {
//             id,              // <-- If present → Update mode
//             BoardName = "",
//             obtained = "",
//             year = ""
//         } = req.body;

//         // Get User + Profile
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ success: false, message: "User not found" });

//         const profile = await Profile.findById(user.additionalDetails);
//         if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });


//         // --------------------------------------------
//         // UPDATE QUALIFICATION (EDIT MODE)
//         // --------------------------------------------
//         if (id) {
//             const updatedQualification = await Qualification.findByIdAndUpdate(
//                 id,
//                 { BoardName, obtained, year },
//                 { new: true }
//             );

//             return res.json({
//                 success: true,
//                 message: "Qualification updated successfully",
//                 qualification: updatedQualification
//             });
//         }


//         // --------------------------------------------
//         // CREATE QUALIFICATION (CREATE MODE)
//         // --------------------------------------------
//         const newQualification = await Qualification.create({
//             BoardName,
//             obtained,
//             year,
//             additionalDetails:profile._id
//         });

//         await Profile.findByIdAndUpdate(
//             profile._id,
//             { $push: { qualification: newQualification._id } },
//             { new: true }
//         );

//         return res.json({
//             success: true,
//             message: "Qualification created successfully",
//             qualification: newQualification
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: error.message
//         });
//     }
// };

