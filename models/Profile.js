const mongoose = require("mongoose");

// creation of profile scchema
const profileSchema = new mongoose.Schema({
    // gender: {
    //     type: String
    // },
    // // about: {
    // //     type: String,
    // //     trim: true
    // // },
    // course: {
    //     type: String,
    // },
    // rollNo: {
    //     type: String,
    // },
    // session: {
    //     type: String,
    // },
    // college: {
    //     type: String,
    // },
    // registrationNo: {
    //     type: String,
    // },
    // ExamRollNo: {
    //     type: String,
    // },
    // // BoradName:{
    // //     type:String,
    // // },
    // // obtained:{
    // //     type:String,
    // // },
    // // year:{
    // //     type:String,
    // // },
    // socialMediaLinks: {
    //     linkedin: String,
    //     github: String,
    //     instagram: String,
    //     facebook: String,
    // },
    // qualification:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Qualification",
    //     }
    // ],

    personalDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PersonalDetails"
        }
    ],
    Project: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],
    skillsandRating:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "SkillsAndRating"
        }
    ],
    semester: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semester",
        }
    ],
    documentData: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
        }
    ],
})

// export the profile schema 
module.exports = mongoose.model("Profile", profileSchema);