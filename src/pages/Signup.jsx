import { form } from "motion/react-client";
import React, { useState } from "react";
import NexCampusLogo from "../assets/logo/NexCampus.png"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {setSignupData} from "../slices/authSlice" 
import { sendOtp } from "../services/operations/authAPI";


const Signup = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName : "",
        email: "",
        password: "",
        confirmPassword:""
    })

    const handleOnChange = (e) => {
        setFormData( (prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword) {
            toast.error("Password Do Not Maatch");
            return 
        }

        const signupData = {
            firstName:formData.firstName,
            lastName:formData.lastName,
            email:formData.email,
            password:formData.password,
            confirmPassword:formData.confirmPassword
        }

        // console.log(signupData)
        console.log(formData.email)
        console.log("Im here")
        dispatch(setSignupData(signupData));

        dispatch(sendOtp(formData.email, navigate))
        
        console.log("now, Im here")

        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:""
        })
    }



    return (
        <div className=" w-[93%] md:w-7/12 max-w-maxContent mx-auto flex flex-col items-center justify-center
        mt-8 rounded-xl shadow-color backdrop-blur-md mb-6 shadow-[inset_4px_0px_8px_rgba(255,255,255,0.5)]
        ">
            <div className="w-full bg-[linear-gradient(114deg,rgba(123,173,172,0.77)_0%,rgba(24,42,44,1)_100%)]
            rounded-tl-xl rounded-tr-xl shadow-color p-2 
            "
                style={{

                }}>
                <img src={NexCampusLogo} alt="" width={203} height={54} />
            </div>

            <form className="w-full px-6 flex flex-col gap-5" onSubmit={handleOnSubmit}>

                <h2 className="text-center text-richblack-5 text-[2.5rem] font-semibold mt-9">

                    Create Account</h2>


                <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="Enter Your FirstName"
                    onChange={handleOnChange}
                    className="bg-[#d9d9d96b] w-full  max-w-[400px] mx-auto block p-[12px] rounded-lg shadow-color shadow-bottom"

                />

                <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Enter Your LastName"
                    onChange={handleOnChange}
                    className="bg-[#d9d9d96b] w-full  max-w-[400px] mx-auto block p-[12px] rounded-lg shadow-color shadow-bottom"

                />
                <input
                    required
                    type="text"
                    name="email"
                    value={formData.email}
                    placeholder="Enter Your Email"
                    onChange={handleOnChange}
                    className="bg-[#d9d9d96b] w-full  max-w-[400px] mx-auto block p-[12px] rounded-lg shadow-color shadow-bottom"

                />
                <input
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter Your Password"
                    onChange={handleOnChange}
                    className="bg-[#d9d9d96b] w-full  max-w-[400px] mx-auto block p-[12px] rounded-lg shadow-color shadow-bottom"

                />
                <input
                    required
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Enter Your Confirm Password"
                    className="bg-[#d9d9d96b] w-full  max-w-[400px] mx-auto block p-[12px] rounded-lg shadow-color shadow-bottom"

                />


                <button
                    type="submit"
                    className="mt-6 w-full max-w-[200px] mx-auto rounded-full bg-[linear-gradient(180deg,rgba(13,63,62,1)_0%,rgba(0,255,94,1)_100%)] py-[8px] px-[12px]
                    text-richblack-5 font-semibold shadow-bottom
                    "
                >
                    Sign In
                </button>

            </form>

            <div className="text-richblack-50 flex flex-col items-center gap-5 mt-7 mb-5">
                <Link to={"/forgot/password"}>
                    <p>Forgot Password?</p>
                </Link>

                <p>New User? <Link to={"/signup"}><span className="text-[#13C153]">Create Account</span></Link></p>
            </div>
        </div>
    )

}

export default Signup