const mongoose = require("mongoose");

// creation of profile scchema
const profileSchema = new mongoose.Schema({
    gender: {
        type: String
    },
    about: {
        type: String,
        trim: true
    },
    Class: {
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
    documentData: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
        }
    ],
    Project:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
})

// export the profile schema 
module.exports = mongoose.model("Profile", profileSchema);