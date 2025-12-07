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
    matriculation: {
        type: String,
    },
    matricPercent: {
        type: String
    },
    matricYear: {
        type: String,
    },
    // intermidiate 
    intermediate: {
        type: String,
    },
    intermediatePercent: {
        type: String
    },
    intermediateYear: {
        type: String,
    },
    // Graduation
    Graduation:{
        type:String
    },
    cgpa:{
        type:String
    },
    GraduationYear:{
        type:String
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