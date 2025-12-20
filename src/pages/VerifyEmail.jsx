import React, { useState } from "react";
import OtpInput from "react-otp-input";
import NexCampusLogo from "../assets/logo/NexCampus.png"
import { Link, useNavigate } from "react-router-dom";
import {BiArrowBack} from "react-icons/bi"
import { sendOtp, signUp } from "../services/operations/authAPI";
// import { setSignupData } from "../slices/authSlice";
import {RxCountdownTimer} from "react-icons/rx"
import { useDispatch , useSelector} from "react-redux";

const VerifyEmail = () => {
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch();
    const { signupData, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleVerifyAndSignup = (e) =>{
        e.preventDefault();

        const {
            firstName, lastName, email, password, confirmPassword
        } = signupData

        dispatch(signUp(firstName, lastName, email, password, confirmPassword, otp, navigate))
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

            <div className="w-full px-6 flex flex-col items-center gap-5">

                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className= "text-center text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                        Verify Email
                    </h1>
                    <p className="text-center text-[1.125rem] leading-[1.625rem] my-4 text-caribbeangreen-400">
                        A verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={handleVerifyAndSignup}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-caribbeangreen-200"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />
                        <button
                            type="submit"
                            className="w-full rounded-full bg-[linear-gradient(180deg,rgba(13,63,62,1)_0%,rgba(0,255,94,1)_100%)] py-[12px] px-[12px] mt-6 font-medium text-richblack-5
                            hover:scale-105 transition-all duration-200
                            "
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/signup">
                            <p className="text-richblack-5 flex items-center gap-x-2">
                                <BiArrowBack /> Back To Signup
                            </p>
                        </Link>
                        <button
                            className="flex items-center text-caribbeangreen-300 gap-x-2"
                            onClick={() => dispatch(sendOtp(signupData.email))}
                        >
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>
                </div>

            </div>

            {/* <div className="text-richblack-50 flex flex-col items-center gap-5 mt-7 mb-5">
                <Link to={"/forgot/password"}>
                    <p>Forgot Password?</p>
                </Link>

                <p>New User? <Link to={"/signup"}><span className="text-[#13C153]">Create Account</span></Link></p>
            </div> */}
        </div>
    )

}

export default VerifyEmail;