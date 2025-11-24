const mongoose = require("mongoose");

const connectUserSchema = new mongoose.Schema({
  
    lostAndFound : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "lostAndFound",
        // required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required:true   
    },
    messageData:{
        type:String,
        required:true
    }


})

module.exports = mongoose.model("ConnectUser", connectUserSchema);