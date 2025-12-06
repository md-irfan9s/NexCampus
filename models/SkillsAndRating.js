// import mongoose 
const mongoose = require("mongoose");

const skillsandRatingSchema = new mongoose.Schema({

    rating:{
        type:Number,
        required:true
    },
    skill:{
        type:String,
        required:true
    }

})

// export the SkillsAndRating models
module.exports = mongoose.model("SkillsAndRating", skillsandRatingSchema);