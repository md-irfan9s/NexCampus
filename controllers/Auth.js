const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const Profile = require("../models/Profile");
const lostAndFound = require("../models/lostAndFound");

require("dotenv").config();


// SEND OTP FOR EMAIL VERIFICATIONS
exports.sendotp = async (req, res) => {
    try {

        // fetch data from request of body
        const { email } = req.body;

        //check validations 
        const checkUserPresent = await User.findOne({ email });

        // check if user is already is present or not which user input the email

        // if user is found with provided email

        if (checkUserPresent) {
            // return response 
            return res.status(401).json({
                success: false,
                message: `User is Already Registered`
            })
        }

        // GENERATE OTP USING GENERATE IN BUILD FUNCTIONS
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        // FIND OTP IN DATABASE
        const finalresult = await OTP.findOne({ otp: otp })

        while (finalresult) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false
            })
        }

        // MAKED THE OTP PAYLOAD
        const otpPayload = { email, otp }

        const otpBody = await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: `OTP send Successfully`,
            otp,
            otpBody
        })

    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// Signup Controller for Registering Users
exports.signup = async (req, res) => {

    try {
        // Destructure field from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp
        } = req.body;

        // VALIDATIONS
        // check all fields are present or not

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All Fields are required",
            })
        }

        // check the password and confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again",

            })
        }
        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists. Please sign in to contiune"
            })
        }
        
        // Find the most otp for the email

        // const response = await OTP.find({email}).sort({createdAt: - 1}).limit(1);
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        console.log("Response....", response);

        if (response.length === 0) {
            return res.status(400).json({
                success: false,
                message: "The OTP is Invalid",
            })
        }
        else if (otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: "The OTP is Invalid",
            })
        }
        // Hash the Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Todo: for writing profile section logic
        const profileDetails = await Profile.create({
            gender: null,
            about: null,
            Class: null,
            rollNo: null,
            session: null,
            college: null,
            documentData: null,
            Project: null
        })

        // craete lost and found data as a null 

        // const lostandFoundDetails = await lostAndFound.create({
        //     title:null,
        //     description:null,
        //     Image:null,
        //     date:null,
        //     locationDetails:null,
        //     time:null,
        // })

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: "",
            // add additional details data
            additionalDetails: profileDetails._id,
            lostAndFound: []
        })
        console.log("successfully reached this line")

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully"
        })

    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        })
    }
}

// login Controllers logic

exports.login = async (req, res) => {

    try {
        // fetch email and password from request body
        const { email, password } = req.body;

        // check all validations in below

        // check email and password is missing in the field

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: `Please fill all the required fields`
            })
        }

        // find user with provided email

        const user = await User.findOne({ email })
            .populate("additionalDetails")
            .populate("lostAndFound")

        // if user is not found with provided email
        if (!user) {
            return res.status(401).json({
                success: false,
                message: `User is not Registered with us please Sign up`
            })
        }

        // Generate JWT token and compare password

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            )

            // save token to user database
            user.token = token
            user.password = undefined

            // set cookie for token and return response

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User login successfully`
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`
        })
    }

}

// Change Password Controller