const ConnectUser = require("../models/ConnectUser");
const User = require("../models/User");
const lostAndFound = require("../models/lostAndFound");


// send message logic


exports.sendMessage = async(req, res) => {

    try{

        //fetch user for request from user ID 
        const userId = req.user.id;

        // console.log(userId)

        // fetch data message form request body

        const {messageData, lostId} = req.body;

        // check user already exists or not
        const existingUser = await User.findById(userId);


        if(!existingUser) {
            return res.status(404).json({
                success:false,
                message:"User Not Found, Please Signup to Continue",
            })
        }
        
        // Simple Validation

        if(!messageData) {
            return res.status(400).json({
                success:false,
                message:`Message Field is Required`
            })
        }

        // Have to do :- Mail send Logic

        const saveMessage = await ConnectUser.create({
            messageData,
            user:userId,
            lostId:lostId
        })


        // update in user

        await User.findByIdAndUpdate(
            userId,
            {$push:{connectUser:messageData._id}}
        )

        // return response

        return res.status(200).json({
            success:true,
            message:`Message Sent Successfully`,
            data:saveMessage
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Something Went Wrong in sendMessage`
        })
    }

};