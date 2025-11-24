const lostAndFound = require("../models/lostAndFound");
const Category = require("../models/Category")
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// load the enviorment

require("dotenv").config();

// create lost and found data to post items

exports.uploadData = async(req, res) => {
    try{

        const userId = req.user.id;
        // fetch data from request body

        console.log("user", req.user)

        const {
            title, description, date, time, Area, spot,
            category, tag
        } = req.body;

        // get image form request files

        const Image = req.files.itemImage;

        if(!title || !description || !date || !time || !Area || !spot || !category || !Image
            || !tag

        ) {
            return res.status(400).json({
                success:false,
                message:`All fields are required`
            })
        }

        console.log("Tag is ... ", tag)
        const userDetails = await User.findById(userId);

        console.log("User ID....", userDetails);
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:`User detail not found`
            })
        }

        const categoryDetails = await Category.findOne({name:category});

        console.log("Category Details...", categoryDetails)
        // check category related data

        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:`Category Not Found`
            })
        }

        // creation of cloudinary
        const itemImage = await uploadImageToCloudinary(
            Image,
            process.env.FOLDER_NAME
        )

        console.log(itemImage);

        // create all the data in the lost and found database

        const createdData = await lostAndFound.create({
            title,
            description,
            date,
            time,
            Area,
            spot,
            tag,
            Image:itemImage.secure_url,
            category:categoryDetails._id,
            user:userId,
        })

        console.log("creation of data...", createdData);

        await User.findByIdAndUpdate(
            userId,
            {
                $push:{lostAndFound:createdData._id}
            },
            { new:true }
        )

        // console.log("USer Data......", userData)
        // console.log("USer ID", userId)

        await Category.findByIdAndUpdate(
            categoryDetails.id,
            {
                $push:{lostAndFound:createdData._id}
            },
            { new:true }
        )

        
        // return response 

        res.status(200).json({
            success:true,
            message:`Lost Data Created Successfully`,
            data:createdData
        })

    }

    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Internet Sever Error in Create Lost and Found`
        })
    }

}

// Edit Lost and Found Data

exports.editLostData = async(req, res) => {

    try{
        const {lostDataId} = req.body;
        const {
            title, description, date, time, Area, spot, category, tag
        } = req.body;

        const existLostData = await lostAndFound.findById(lostDataId);

        console.log("existing data...", existLostData)
        if(!existLostData) {
            return res.status(404).json({
                success:false,
                message:"Lost Data Not Found"
            })
        }
        const categoryDetails = await Category.findOne({name:category});

        console.log("Category Details...", categoryDetails)
        // check category related data

        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:`Category Not Found`
            })
        }

        let updateImage = existLostData.Image
        // check file is upload or not

        if(req.files && req.files.itemImage) {
            const updatedImage = req.files.itemImage;
            const itemImage = await uploadImageToCloudinary(
                updatedImage,
                process.env.FOLDER_NAME
            )
            updateImage = itemImage.secure_url;
        }
        // Updation logic

        const updatedLostData = await lostAndFound.findByIdAndUpdate(
            lostDataId,
            {
                title:title || existLostData.title,
                description:description || existLostData.description,
                date:date || existLostData.date,
                time:time || existLostData.time,
                Area:Area || existLostData.Area,
                spot:spot || existLostData.spot,
                tag:tag || existLostData.tag,
                Image:updateImage || existLostData.Image,
                category : existLostData.category
            },

            {new:true}
        )

        if(category && category !== existLostData.category.toString()) {

            await Category.findByIdAndUpdate(
                existLostData.category,
                {$pull:{lostAndFound:lostDataId}}
            )
        }

        // add new Category

        await Category.findByIdAndUpdate(
            categoryDetails._id,
            {$push:{lostAndFound:lostDataId}}
        )


        // send updated response 

        return res.status(200).json({
            success:true,
            message:`Lost Item Updated Sucessfully`,
            data:updatedLostData
        })


    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Internet server error in editLostData`
        })
    }

}

// Show Category Wise Data

exports.showCategoryWiseData = async(req, res) => {

    try{
        

        // const categoryWiseData = await Category.find({})
        // .populate("Category").populate("lostAndFound")

        // const showCategoryWiseData = lostAndFound.find({})
        // .populate("category")

        // desctruct the category data

        const {category} = req.body;

        const categoryWiseData = await Category.findOne({name:category})
        .populate("lostAndFound")

        if(!categoryWiseData) {
            return res.status(404).json({
                success:false,
                message:`Category data not found`
            })
        }


        // return response 

        return res.status(200).json({
            success:true,
            categoryWiseData
        })
    }

    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Internet Server Error in Show Category Wise Details`
        })
    }

}

// Show all Category Data

exports.getAllLostData = async(req, res) => {

    try{

        const allData = await lostAndFound.find({})
        // .populate({
        //     path:"user",
        //     populate:{
        //         path:"lostAndFound"
        //     }
        // }).populate("category").exec();

        // return resposne

        return res.status(200).json({
            success:true,
            data:allData
        })


    }

    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Inernet Server Error",
            error:error.message
        })
    }
}


// Delete Lost Data

exports.deleteLostData = async(req, res) => {

    try{

        const {lostDataId} = req.body;

        const lostAndFoundData = await lostAndFound.findById(lostDataId);

        if(!lostAndFoundData) {
            return res.status(404).json({
                success:false,
                message:`Lost Data Not Found`
            })
        }
        const userId = lostAndFoundData.user
        const categoryId = lostAndFoundData.category

        await User.findByIdAndUpdate(
            userId,
            {$pull:{lostAndFound:lostDataId}}
        )

        await Category.findByIdAndUpdate(
            categoryId,
            {$pull:{lostAndFound:lostDataId}}
        )

        // delete lost data
        await lostAndFound.findByIdAndDelete(lostDataId)


        return res.status(200).json({
            success:true,
            message:`Data Delete Successfully`
        })
        

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Internet Server Error`
        })
    }


}

// show tag wise data

exports.showtagWiseData = async(req, res) => {

    try{
        const {tag} = req.body

        if(tag === "Lost") {
            var TagData = await lostAndFound.find({tag})
            
        }
        else{
            TagData = await lostAndFound.find({tag})
            
        }

        console.log("Tag Data..", TagData)
        return res.status(200).json({
            success:true,
            data:TagData

        })
    }

    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:`Internet server error`
        })
    }

}