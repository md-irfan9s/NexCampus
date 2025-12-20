import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    VscDashboard, VscSignOut,
    VscHome, VscSettingsGear
} from "react-icons/vsc"
import { MdOutlineRoundaboutLeft } from "react-icons/md"
import { IoIosContacts } from "react-icons/io"
import { logout } from "../../services/operations/authAPI";

const ProfileDropDown = () => {

    const { user } = useSelector((state) => state.profile)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log(user)
    // console.log(user)
    return (
        <div className="relative">
            <div className="flex items-center gap-x-1 cursor-pointer mt-4" onClick={() => setOpen(!open)}>
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[40px] rounded-full object-cover"
                />
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </div>

            {open && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                //   ref={ref}
                >
                    <Link to="/studentcorner/my-profile" onClick={() => setOpen(false)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                            <VscDashboard className="text-lg" />
                            Dashboard
                        </div>
                    </Link>
                    <div
                        onClick={() => {
                              dispatch(logout(navigate))
                            setOpen(false)
                        }}
                        className="hidden md:flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                    >
                        <VscSignOut className="text-lg" />
                        Logout


                    </div>

                    {/* Responsive in different devices  */}
                    <div className="md:hidden divide-y-[1px] divide-richblack-700
          text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-2
          "
                        onClick={() => setOpen(false)}
                    >

                        <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px] 5"
                            onClick={() => navigate("/")}
                        >
                            <VscHome className="text-lg" />
                            Home

                        </div>




                        <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px]"
                            onClick={() => navigate("/about")}
                        >
                            <MdOutlineRoundaboutLeft className="text-lg" />
                            About us</div>

                        <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px]"
                            onClick={() => navigate("/contact")}
                        >
                            <IoIosContacts className="text-lg" />
                            Contact</div>

                        <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px]"
                            onClick={() => navigate("/dashboard/settings")}
                        >
                            <VscSettingsGear />
                            Settings
                        </div>

                        <div
                            onClick={() => {
                                //   dispatch(logout(navigate))
                                setOpen(false)
                            }}
                            className="md:hidden flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                        >
                            <VscSignOut className="text-lg" />
                            Logout


                        </div>
                    </div>
                </div>
            )}

        </div>
    )

}

export default ProfileDropDown