const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema({

    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },

    BoardName:{
        type:String,
    },
    obtained:{
        type:String
    },
    year:{
        type:String,
    }

})

module.exports = mongoose.model("Qualification", qualificationSchema)