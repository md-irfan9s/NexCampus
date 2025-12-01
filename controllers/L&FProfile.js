const Profile = require("../models/Profile");
const User = require("../models/User");
const ConnectUser = require("../models/ConnectUser");
const Category = require("../models/Category")


// for Lost and Found profile
exports.showUserPrfile = async (req, res) => {

    try {
        // user id

        const id = req.user.id;

        const userDetails = await User.findById(id)
            .populate({
                path: "additionalDetails",
                select: "firstName lastName rollNo session college"
            }).exec();

        return res.status(200).json({
            success: true,
            message: "user data fetch successfully",
            data: userDetails
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Something went wrong in showUserProfile Controller`
        })
    }
}

// user post controller 

exports.showUserPost = async (req, res) => {

    try {
        const id = req.user.id;

        const userPost = await User.findById(id).populate("lostAndFound").exec();

        console.log(userPost)

        return res.status(200).json({
            success: true,
            message: `Post data fetch successfully`,
            data: userPost
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Something went wrong in showUserPost Controller `
        })
    }

}

// show response 

exports.showResponse = async (req, res) => {
    try {
        const userId = req.user.id;

        // Check user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: `User not Found`
            });
        }

        // Find all messages + populate sender + post
        const messages = await ConnectUser.find({})
            .populate([
                { path: "user", select: "firstName lastName image" }, 
                { path: "lostId", select: "title date time user" }
            ]);

        // Filter messages => only those where lost-post belongs to current user
        const inbox = messages.filter(m => {
            return m.lostId && String(m.lostId.user) === String(userId);
        });

        return res.status(200).json({
            success: true,
            message: "Inbox Fetched Successfully",
            data: inbox
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Something Went Wrong in showResponse controller`
        });
    }
};


 // // first find category 
        // const userId = req.user.id
        // const id = req.body;
        // const singleCategory = await Category.findById(id)
        //                             .populate({
        //                                 path:"Category",
        //                                 select:"name"
        //                             }).exec()
        
        // // fetch user who connect with the user

        // const userDetails = await ConnectUser.findById(userId)
        //                                     .populate({
        //                                         path: "User lostAndFound",
        //                                         select:"firstName, lastName date time"
        //                                     })
                                    
        
        

        // console.log(singleCategory);

        // // return res

        // return res.status(500).json({
        //     success:false,
        //     message:`Response Data fetch Successfully`,
        //     singleCategory,
        //     userDetails
        // })


// contact to admin 