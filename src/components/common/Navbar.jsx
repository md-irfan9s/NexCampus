import React from "react";
import { NavbarLinks } from "../../data/navbar-link";
import { Link } from "react-router-dom";
import NexCampusLogo from "../../assets/logo/NexCampus.png"
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/ProfileDropDown";

const Navbar = () => {

    const { token } = useSelector((state) => state.auth)

    // console.log(token)
    return (
        
        <div className="mt-5 w-10/12 max-w-maxContent flex items-center mx-auto justify-between">

            <div>
                {/* Logo */}
                <Link to="/" className="">
                    <img src={NexCampusLogo} alt="Logo" width={203} height={54} loading="lazy" />

                </Link>
            </div>
            <nav className="bg-[#020A0F] mx-auto xl:flex mt-4
             items-center justify-between p-[.2rem] rounded-full
             shadow-color border-black hidden
             ">
                {
                    NavbarLinks.map((navbar, index) => (

                        <div key={index} className=" 
                    rounded-full button-shadow cursor-pointer
                        ">
                            <Link to={navbar?.path}>
                                <div className="pl-5 pr-5 pt-[.8rem] pb-[.8rem]">
                                    <p className="text-white text-[10px] lg:text-[16px] font-medium tracking-wide">{navbar.title}</p>
                                </div>
                            </Link>

                        </div>
                    ))
                }


                {/* login  */}


            </nav>

            <div>

                {token === null && (
                    <Link to={"/login"}>
                        <div className="mt-4 transition-all duration-200 cursor-pointer
                shadow-color text-richblack-5 hover:bg-gradient-to-b from-[#0D3F3E] to-[#13C153]  pl-10 pr-10 pt-[.8rem] pb-[.8rem] rounded-full
                
                ">

                            <button className="">
                                Login
                            </button>
                        </div>
                    </Link>
                )}

                {token !== null && (<ProfileDropDown/>)}
                
            </div>


        </div>

    )

}

export default Navbar