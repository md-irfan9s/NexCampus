const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({

    semesterName:{
        type:String,
        required:true
    },
    admitCard:{
        type:String,
        required:true
    },
    marksheet:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("Semester", semesterSchema);