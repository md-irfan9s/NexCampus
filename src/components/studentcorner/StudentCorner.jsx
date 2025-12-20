import React, { useEffect, useState } from "react";
import { getPersonalDetails } from "../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6"
import { SiLeetcode } from "react-icons/si"
import { FaGithub } from "react-icons/fa"

const StudentCorner = () => {
    const [personalDetails, setPersonalDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            const details = await getPersonalDetails(token);
            if (details && details.length > 0) {
                setPersonalDetails(details[0]); // ✅ first element of array
            }
            setLoading(false);
        };

        fetchDetails();
    }, []);

    console.log(personalDetails)

    if (loading) return <p className="text-white text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-[#212121] text-white p-4 mx-auto">
            {/* main container */}
            <div className="flex items-center mx-auto max-w-maxContent">

                {/* left  */}
                <div className="flex flex-col items-center gap-2 ">
                    <h2 className="text-3xl font-medium">Profile Summary</h2>
                    <div className="full-inner-shadow flex flex-col items-start justify-center gap-5
                    px-[2.8rem] py-[3.5rem] rounded-[2.5rem] bg-[#ffffff0d]
                    ">

                        <div className="flex items-center justify-center
                        w-full
                        ">
                            <img src={user?.image} alt="" width={180} height={160}
                                className="aspect-square  rounded-full border-4"
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center
                        w-full">
                            <h1 className="text-[2rem]">{user.firstName} {user.lastName}</h1>
                            <p className="text-pure-greys-300">{personalDetails.course}</p>
                        </div>


                        <details className="group w-80 mx-auto rounded-lg border-b shadow-inner text-white">
                            <summary className="cursor-pointer list-none flex items-center justify-between p-4">
                                Personal Details

                                {/* Arrow */}
                                <span className="transition-transform duration-300 group-open:rotate-180">
                                    ▼
                                </span>
                            </summary>

                            {/* Smooth animated container */}
                            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-open:grid-rows-[1fr]
                            
                            ">
                                <div className="overflow-hidden px-4 pb-4 space-y-1">
                                    <p className="text-[0.9rem]">Name : {user.firstName} {user.lastName}</p>
                                    <p className="text-[0.9rem]">Course : {personalDetails.course}</p>
                                    <p className="text-[0.9rem]">Semester : 6</p>
                                    <p className="text-[0.9rem]">Registration No : {personalDetails.registrationNo}</p>
                                    <p className="text-[0.9rem]">Exam Roll No : {personalDetails.ExamRollNo}</p>
                                    <p className="text-[0.9rem]">Session : {personalDetails.session}</p>
                                    {/* <p className="text-[0.8rem]">{user.email}</p>
                                    <p className="text-[0.8rem]">{user.phone}</p> */}
                                </div>
                            </div>
                        </details>


                        <details className="group w-80 mx-auto rounded-lg border-b shadow-inner text-white">
                            <summary className="cursor-pointer list-none flex items-center justify-between p-4">
                                Qualification

                                {/* Arrow */}
                                <span className="transition-transform duration-300 group-open:rotate-180">
                                    ▼
                                </span>
                            </summary>

                            {/* Smooth animated container */}
                            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-open:grid-rows-[1fr]
                            
                            ">
                                <div className="overflow-hidden px-4 pb-4 space-y-1">
                                    <div className="border-b py-2">
                                        <p className="text-[0.9rem]">10th Board : {personalDetails.matriculation}</p>
                                        <p className="text-[0.9rem]">Passing Year  : {personalDetails.matricYear}</p>
                                        <p className="text-[0.9rem]">Obtained% :{personalDetails.matricPercent} </p>
                                    </div>

                                    <div className="border-b py-2">
                                        <p className="text-[0.9rem]">12th Board : {personalDetails.intermediate}</p>
                                        <p className="text-[0.9rem]">Passing Year  : {personalDetails.intermediateYear}</p>
                                        <p className="text-[0.9rem]">Obtained% :{personalDetails.intermediatePercent} </p>
                                    </div>

                                    <div className="border-b py-2">
                                        <p className="text-[0.9rem]">Graduation : {personalDetails.Graduation}</p>
                                        <p className="text-[0.9rem]">Passing Year  : {personalDetails.GraduationYear}</p>
                                        <p className="text-[0.9rem]">Obtained% :{personalDetails.cgpa} </p>
                                    </div>
                                </div>

                            </div>
                        </details>

                        {/* social link  */}
                        <div className="flex gap-5 items-start justify-start px-3 py-2
                        rounded-2xl  icon-inner-shadow mt-9
                        ">
                            <Link className="flex items-start justify-start
                            icon-inner-shadow rounded-full p-2 
                            " to={personalDetails.twitter} target="_blank">
                                <FaXTwitter />
                            </Link>

                            <Link className="flex items-start justify-start
                            icon-inner-shadow rounded-full p-2"
                            to={personalDetails.LinkedIn} target="_blank"
                            >
                                <FaLinkedinIn />
                            </Link>

                            <Link className="flex items-start justify-start
                            icon-inner-shadow rounded-full p-2"
                            to={personalDetails.leetcode} target="_blank"
                            >
                                <SiLeetcode />
                            </Link>

                            <Link className="flex items-start justify-start
                            icon-inner-shadow rounded-full p-2"
                            to={personalDetails.Github} target="_blank"
                            >
                                <FaGithub />
                            </Link>
                        </div>



                    </div>
                </div>
                    
                {/* right  */}
                <div>
                    
                </div>


            </div>
        </div>
    );
};

export default StudentCorner;
