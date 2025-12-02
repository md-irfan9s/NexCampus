const mongoose = require("mongoose");

// creation of profile scchema
const profileSchema = new mongoose.Schema({
    gender: {
        type: String
    },
    // about: {
    //     type: String,
    //     trim: true
    // },
    course: {
        type: String,
    },
    rollNo: {
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
    // BoradName:{
    //     type:String,
    // },
    // obtained:{
    //     type:String,
    // },
    // year:{
    //     type:String,
    // },
    qualification:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Qualification",
        }
    ],
    semester: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semester",
        }
    ],
    socialMediaLinks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            redf:"SocialLinks"
        }
    ],
    documentData: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
        }
    ],
    Project: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }]
})

// export the profile schema 
module.exports = mongoose.model("Profile", profileSchema);