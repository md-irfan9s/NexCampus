const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    projectTitle:{
        type:String,
    },
    projectLink:{
        type:String,
    },
    projectLogo:{
        type:String
    }

})

module.exports = mongoose.model("Project", projectSchema);