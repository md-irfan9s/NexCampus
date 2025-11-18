const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Configuring dotenv to load environment variables from .env file

dotenv.config();

exports.auth = async(req, res, next) => {

    try{
        const token = req.cookies.token || 
        req.body.token ||
        req.header("Authorization").replace("Bearer", "");

        // if JWT is missing, return 401 unauthorized response
        if(!token) {
            return res.status(401).json({
                success:false, 
                message: `Token is Missing`
            })
        }

        try{
            // verify the JWT using secret key stroed in enviorment
            const decode = await jwt.verify(token, process.env.JWT_SECRET);

            req.user = decode;
        }
        catch(error) {
            // if JWT verifications is falied 
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();  // if jwt is valid the move on the next middleware
    }
    catch(error) {
        return res.status(401).json({
            success:false,
            message: `Something Went Wrong While Validating the token`
        })
    }

};