const Profile = require("../models/Profile");
const Project = require("../models/Project");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


require("dotenv").config();

exports.uploadProject = async(req, res) => {

    try{

        // fetch project data from req body

        const {projectTitle, projectLink} = req.body;

        const projectLogo = req.files.logo;

        // find valid user by id
        const userId = req.user.id;

        const user = await User.findById(userId);

        const profileId = user.additionalDetails;
        // validation for all input field 

        if(!projectTitle || !projectLink || !projectLogo) {
            return res.status(400).json({
                success:false,
                message:`All input fields are required`
            })
        }

        // upload in cloudinary 
        
        const logoImage = await uploadImageToCloudinary(projectLogo,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        // creation of data in mongoDB Database
        const projectDetails = await Project.create({
            projectTitle,
            projectLink,
            projectLogo:logoImage.secure_url,
        })

        // update project model in profile

        await Profile.findByIdAndUpdate(
            profileId,
            {$push:{Project:projectDetails._id}}
        )


        // return response

        return res.json({
            success:true,
            message:`Upload project details successfully`,
            projectDetails
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Something went wrong`
        })
    }

}


// Edit Project Details

exports.editProject = async(req, res) => {

    try{
        
        // find project id for edit the actual data 
        const projectId = req.params.id

        const {projectTitle, projectLink} = req.body

        // check project is already present or not 

        const userId = req.user.id;

        const user = await User.findById(userId);

        const profileId = user.additionalDetails;

        const existingProject = await Project.findById(projectId);

        if(!existingProject) {
            return res.status(404).json({
                success:false,
                message:`Project Not Found`
            })
        }

        // Handle the project logo if user upload the logo 

        let newLogo = existingProject.projectLogo;

        if(req.files && req.files.logo){
            const updatedImage = await uploadImageToCloudinary(req.files.logo,
                process.env.FOLDER_NAME,
                1000,
                1000
            )
            newLogo = updatedImage.secure_url;
        }

        // update in project model
        const updatedProject = await Project.findByIdAndUpdate(
            existingProject._id,
            {$set:{
                projectTitle:projectTitle || existingProject.projectTitle,
                projectLink:projectLink || existingProject.projectLink,
                projectLogo:newLogo || existingProject.projectLogo
            }},
            { new: true }
        )

        // update projectid on profile model 

        await Profile.findByIdAndUpdate(
            profileId,
            {$addToSet:{Project:updatedProject._id}}
        )

        return res.status(200).json({
            success:false,
            message:`Project updated successfully`,
            updatedProject
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }

}