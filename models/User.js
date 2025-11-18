// import the mongoose library

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

    {
        // Define naming with required true
        firstName: {
            type:String,
            required:true,
            trim:true
        },
        lastName:{
            type:String,
            required:true,
            trim:true,
        },

        email:{
            type:String,
            required:true,
            trim:true,
        },
        password: {
            type:String,
            required:true,
        },
        accountType: {
            type:String,
            enum:["Admin"],
            // required:true   // no need to mark as required
        },
        additionalDetails: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref : "Profile"
        },
        image:{
            type:String,
        },
        token:{
            type:String,
        },
        resetPasswordExpires: {
            type:Date,
        },
        lostAndFound :[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref : "lostAndFound"
            }
        ]
    },
    {timestamps:true}

);

// export the userschema model 
module.exports = mongoose.model("User", userSchema);