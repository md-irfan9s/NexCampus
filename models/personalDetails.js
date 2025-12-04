const mongoose = require("mongoose");

const personalDetailsSchema = new mongoose.Schema({
    // professional details
    course: {
        type: String,
    },
    session: {
        type: String,
    },
    college: {
        type: String,
    },
    registrationNo: {
        type: String,
    },
    ExamRollNo: {
        type: String,
    },
    // qualification Details 
    BoardName: {
        type: String,
    },
    obtained: {
        type: String
    },
    year: {
        type: String,
    },
    //social links
    LinkedIn:{
        type:String,
    },
    Github:{
        type:String,
    },
    leetcode:{
        type:String,
    },
    twitter:{
        type:String,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },

})


module.exports = mongoose.model("PersonalDetails", personalDetailsSchema)