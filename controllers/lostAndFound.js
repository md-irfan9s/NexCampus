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
            category
        } = req.body;

        // get image form request files

        const Image = req.files.itemImage;

        if(!title || !description || !date || !time || !Area || !spot || !category || !Image) {
            return res.status(400).json({
                success:false,
                message:`All fields are required`
            })
        }

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