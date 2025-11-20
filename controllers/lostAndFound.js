const lostAndFound = require("../models/lostAndFound");
const Category = require("../models/Category")
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// load the enviorment

require("dotenv").config();

// create lost and found data to post items

exports.createLostAndFound = async(req, res) => {

    try{

        const userId = req.user.id
        // fetch data from request body

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

        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:`User detail not found`
            })
        }

        const categoryDetails = await Category.findById(category);

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
            user:userDetails._id,
        })

        await Category.findByIdAndUpdate(
            {_id:category},
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
        return res.status(500).json({
            success:false,
            message:`Internet Sever Error in Create Lost and Found`
        })
    }

}