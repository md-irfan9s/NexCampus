const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    LostAndFound :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "lostAndFound",
        // required:true   
    },
    reviewMessage:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model("Review", reviewSchema)