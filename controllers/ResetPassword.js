const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


// Reset password token controllers

exports.resetPasswordToken = async(req, res) => {

    try{
        // fetch data from request body
        const {email} = req.body;

        const user = await User.findOne({email:email});

        // check user is already exist or not
        if(!user) {
            return res.json({
                success:false,
                message:`This Email ${email} is not registered with us please enter valid email`
            })
        }

        // generate token 
        const token = crypto.randomBytes(20).toString("hex");

        // update the token in database

        const updatedDetails = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires: Date.now() + 360000,

            },
            {new:true}
        )

        console.log("Updated Details...", updatedDetails);

        const url = `http://localhost:3000/update-password/${token}`;

        console.log("Url...", url);
        // TODO MAIL SENDER LOGIC


        return res.json({
            success:true,
            message:`Email Sent Succcessfully`,
            url
        })


    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:`Something Went Wrong While Validating the token`,
        })
    }

}

// Reset Password controllers and logic

exports.resetPassword = async(req, res) => {

    try{
        // fetch data from req.boody

        const {password, confirmPassword, token} = req.body;

        // check all input fields are filled or not

        if(!password || !confirmPassword) {
            return res.status(401).json({
                success:false,
                message:`All input fields are required`
            })
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:`Password do not match`
            })
        }

        // find token and check token is valid or not

        const userDetails = await User.findOne({token:token});

        console.log("user details....", userDetails);
        if(!userDetails) {
            return res.json({
                success:false,
                message:`Token is Invalid`
            })
        }

        // check token is exprires or not

        if(!(userDetails.resetPasswordExpires > Date.now())) {
            return res.status(403).json({
                success:false,
                message:`Token is expired, please Relogin to genrate the token`
            })
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            {token:token},
            {password:encryptedPassword},
            {new:true},
        )

        // return response
        return res.json({
            success:true,
            message:`Password reset successfully`
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:`Something went wrong while reset the password`
        })
    }

}

// exports.resetPassword = async (req, res) => {
// 	try {
// 		const { password, confirmPassword, token } = req.body;

// 		if (confirmPassword !== password) {
// 			return res.json({
// 				success: false,
// 				message: "Password and Confirm Password Does not Match",
// 			});
// 		}
// 		const userDetails = await User.findOne({ token: token });
// 		if (!userDetails) {
// 			return res.json({
// 				success: false,
// 				message: "Token is Invalid",
// 			});
// 		}
// 		if (!(userDetails.resetPasswordExpires > Date.now())) {
// 			return res.status(403).json({
// 				success: false,
// 				message: `Token is Expired, Please Regenerate Your Token`,
// 			});
// 		}
// 		const encryptedPassword = await bcrypt.hash(password, 10);
// 		await User.findOneAndUpdate(
// 			{ token: token },
// 			{ password: encryptedPassword },
// 			{ new: true }
// 		);
// 		res.json({
// 			success: true,
// 			message: `Password Reset Successful`,
// 		});
// 	} catch (error) {
// 		return res.json({
// 			error: error.message,
// 			success: false,
// 			message: `Some Error in Updating the Password`,
// 		});
// 	}
// };