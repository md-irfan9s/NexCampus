const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    lostAndFound:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lostAndFound"
        }
    ]


})

// export category scchema 

module.exports = mongoose.model("Category", categorySchema)