const mongoose = require("mongoose");


// creation of lostAndFound 

const lostAndFoundSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    Image:{
        type:String,
    },
    date:{
        type:Date,
    },
    Area:{
        type:String,
    },
    spot:{
        type:String,
    },
    time:{
        type:String,
    },
    tag:{
        type:String,
        enum:["Lost", "Found"]
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Reviews"
        }
    ],
    connectUser: {
        type:mongoose.Schema.Types.ObjectId,
        ref : "ConnectUser"
    }

}, { timestamps: true })

module.exports = mongoose.model("lostAndFound", lostAndFoundSchema);