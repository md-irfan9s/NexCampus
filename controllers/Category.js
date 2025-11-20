const Category = require("../models/Category");


// create category controllers logic
exports.createCategory = async(req, res) => {

    try{
        // fetch data from req body

        const {name, description} = req.body;

        // check input field 
        if(!name) {
            return res.status(400).json({
                success:false,
                message:`All fields are required`,
            })
        }

        // update into the database
        const updatedCategory = await Category.create({
            name:name,
            description:description 
        })
        
        console.log("Category Details....", updatedCategory);

        // return response
        return res.status(200).json({
            success:false,
            message:`Category Created Successfully`,
            updatedCategory
        })

    }
    // if any error facing in try block then execute catch block
    catch(error) {
        return res.status(500).json({
            success:false,
            message:`Error in create category apis`
        })
    }

}

// show all category controller

exports.getAllCategory = async(req, res) => {

    try{

        // find all category from database

        const allCategory = await Category.find({});

        return res.status(200).json({
            success:true,
            message:`Here your all category`,
            allCategory,
        })

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:`Error in getAllCategory controller`
        })
    }

}

// category page details with each category

exports.categoryPageDetail = async(req, res) => {

    try{
        const {categoryId} = req.body;

        // find selected category
        const selectedCategory = await Category.findById(categoryId)
        .populate("lostAndFound").exec()

        console.log("Selected Category....", selectedCategory);

        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:`Category Not Found`
            })
        }

        // return response

        return res.status(200).json({
            success:true,
            message:`Category Page Details Created Successfully`,
            category:selectedCategory,
        })

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:`Something went wrong in category page details`,
            error:error.message
        })
    }
}