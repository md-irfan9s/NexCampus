const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User")


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