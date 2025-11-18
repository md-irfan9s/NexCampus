// import mongoose for creating OTP model
const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({

    email : {
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true 
    },
    createdAt : {
        type:Date,
        default:Date.now,
        expires: 60 * 5, // the otp will be expries in 5 mins
    }


})

// export the otp model

module.exports = mongoose.model("OTP", OTPSchema)