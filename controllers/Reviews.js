const Reviews = require("../models/Reviews");
const User = require("../models/User")
const lostAndFound = require("../models/lostAndFound");

// Add review controller  for Add Reviews button

exports.addReviews = async (req, res) => {

    try {

        // fetch data from req body
        const userId = req.user.id;

        const { reviewMessage, lostDataId } = req.body

        const userDetails = await User.findOne({ _id: userId });

        // check user is already login or not
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: `User Not Found Please Signup to Continue`
            })
        }


        const alreadyReview = await Reviews.findOne({ user: userId, LostAndFound: lostDataId })

        // check already reviewed or not
        if (alreadyReview) {
            return res.status(403).json({
                success: false,
                message: "Data is already reviewed by the user"
            })
        }

        // Save Review in Database
        const Review = await Reviews.create({
            reviewMessage,
            user: userId,
            los
        })

        return res.status(200).json({
            success: true,
            message: `Review Created Successfully`,
            data: Review
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Something Went Wrong in addReviwes controllers`
        })
    }
}

// for post deletion button 

exports.createReview = async ({ userId, reviewMessage }) => {

    // const userDetails = await User.findOne({_id:userId});

    const saveReview = Reviews.create({
        reviewMessage,
        user: userId,
    })


}


// get all user reviews

exports.showAllReviews = async (req, res) => {

    try {

        const allReviews = await Reviews.find({})
                                            .populate({
                                                path: "user",
                                                select: "firstName lastName image"
                                            }).exec();


        return res.status(200).json({
            success:true,
            message:`All Reviews Fetched Successfully`,
            data:allReviews
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Something Went Wrong in showAllreviews controllers`
        })
    }

}