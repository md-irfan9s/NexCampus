import React from "react";
import BubbleImg from "../assets/images/bubbleImg.png"
import studentCorner from "../assets/images/studentcorner.png"
import lostandfound from "../assets/images/lost&found.png"
import campusFeed from "../assets/images/campusFeed.png"
import { Link } from "react-router-dom";
import RotatingText from "../animation/RotatingText";
import sectionImg from "../assets/images/section2img.png"
import secondSectionImg from "../assets/images/section2.0.png"
import thirdSectionImg from "../assets/images/section2.1.png"
import dashborad from "../assets/images/Dashboard.png"
import campusimg from "../assets/images/campus feedU 1.png"
import LT from "../assets/images/LT.png"
import profileImg from "../assets/images/Irfan.png"
import ProfileCard from "../animation/ProfileCard";
import profileImg2 from "../assets/images/Adil.png"
import profileImg3 from "../assets/images/Raj.png"
import profileImg4 from "../assets/images/Yasa.png"
import Creators from "../animation/Creators";
import Footer from "../components/common/Footer";


const Home = () => {

    return (

        <div className="bg-cover flex flex-col justify-center text-richblack-5 mx-auto w-10/12 max-w-maxContent">
            {/* <p className="text-white">hello</p> */}
            {/* <img src={section1} alt="" className="w-40 h-auto"/> */}

            {/* section 1 */}
            <section className=" flex flex-col md:flex-row gap-10 justify-center items-center mx-auto mt-10 xl:mt-0">
                {/* left  */}
                <div className="flex flex-col items-center md:items-start justify-center gap-y-6
            xl:w-[60%] w-full
            ">

                    <div className="text-richblack-5 text-[3.5rem] font-bold w-9/12">
                        <h1>
                            We Build Digital <span className="text-[#13C153]">
                                <RotatingText
                                    texts={['Campus', 'Student Corner', 'Lost&Found', 'Campus Feed']}
                                    mainClassName=" sm:px-2 md:px-3 bg-cyan-300 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-start rounded-lg"
                                    staggerFrom={"last"}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                    rotationInterval={2000}
                                />
                            </span>
                        </h1>
                    </div>
                    <div className="w-5/6">
                        <p className="text-richblack-5 text-[.9rem] tracking-wider">
                            NexCampus is a centralized digital ecosystem designed to bridge
                            the gap between students, academic resources, and campus administration.
                        </p>
                    </div>
                    <div className="shadow-color shadow-bottom flex gap-10 items-center font-bold
                pl-20 pr-5 py-2 rounded-full cursor-pointer bg-gradient-to-r from-[#02FFD9] to-[#051E24]
                ">
                        <button>
                            Explore
                        </button>
                        <div className="shadow-color rounded-full px-3 "
                        >&rarr;</div>
                    </div>
                </div>

                {/* right  */}
                <div className="xl:w-[40%] w-full animate-upDown flex items-center">
                    <img src={BubbleImg} alt="" />
                </div>

            </section>

            {/* section 2 */}
            <section className="shadow-color-section2 mt-56 mb-10  py-4 px-6 rounded-full">
                <div className="flex items-center justify-between ">
                    <Link to={"/studencorner"} target="_blank">
                        <div>
                            <img src={studentCorner} alt="Student Portal" width={317} height={113} />
                        </div>
                    </Link>

                    <Link to={"/lostandfound"} target="_blank">
                        <div>
                            <img src={lostandfound} alt="lost and found" width={317} height={113} />
                        </div>
                    </Link>

                    <Link to={"/campusfeed"} target="_blank">
                        <div>
                            <img src={campusFeed} alt="campus feed" width={317} height={113} />
                        </div>
                    </Link>

                </div>
            </section>


            {/* section 3 */}
            <section className="flex flex-col justify-center">
                {/* first subsection */}
                <div className="flex flex-col items-center lg:flex-row gap-10 justify-between mb-10 border-b py-10 border-b-[#ffffff4e]">
                    <div>
                        <img src={sectionImg} alt="StudentCorner" width={338} height={375} />
                    </div>

                    <div className="flex items-center w-full lg:w-[60%]">
                        <p>The Student Corner empowers students by
                            transforming scattered academic data into a unified,
                            professional identity. It saves time by keeping essential documents
                            handy and provides a structured way to present their achievements to recruiters.
                        </p>
                    </div>
                </div>

                {/* second subsection */}
                <div className="flex gap-10 flex-col items-center lg:flex-row justify-between mb-10 border-b py-10 border-b-[#ffffff4e]">


                    <div className="flex items-center w-full lg:w-[60%]">
                        <p>The Lost & Found section builds trust and cooperation within the campus. It saves students from panic by providing a dedicated place to look for missing essentials and encourages a culture of honesty by making it easy to return found items.
                        </p>
                    </div>

                    <div>
                        <img src={secondSectionImg} alt="StudentCorner" width={338} height={375} />
                    </div>
                </div>

                {/* third section  */}
                <div className="flex gap-10 flex-col items-center lg:flex-row justify-between mb-10 border-b py-10 border-b-[#ffffff4e]">
                    <div>
                        <img src={thirdSectionImg} alt="StudentCorner" width={338} height={375} />
                    </div>

                    <div className="flex items-center w-full lg:w-[60%]">
                        <p>The Campus Feed eliminates information clutter.
                            By combining Academic Notices, Career Opportunities, and Social Events into one "feed," it keeps students informed, engaged, and ready for whatever the campus offers next. It transforms a simple notice board into a dynamic stream of opportunities.
                        </p>
                    </div>
                </div>
            </section>

            {/* section 4  */}

            <section className="flex flex-col space-y-10 mb-12">
                <div>
                    <h2 className="text-white text-[3.6rem] text-center
                    ">Why <span className="text-[#13C153]">NexCampus ?</span></h2>
                    <p className="text-center"> We believe that college life should be focused on innovation and connection, not administrative hassles. By digitizing these services, NexCampus ensures that every student stays informed,
                        organized, and ready for the future—all from a single, modern dashboard.</p>
                </div>

                <div className="flex flex-col items-center gap-7">
                    <div className="space-y-10">
                        <p className="text-[2.5rem]">UI Preview</p>
                        <img src={dashborad} alt="dashboard" width={1146} height={1092} />
                    </div>

                    <div className="flex items-center justify-center overflow-x-hidden">
                        <img src={campusimg} alt="campusFeed" />
                        <img src={LT} alt="L&F" />
                    </div>
                </div>

            </section>


            {/* section 5  */}

            <section>
                <div className="mb-10">
                    <h1 className="text-[#ffff] text-center text-[3.5rem]"><span className="text-[#13C153]">NexCampus</span> Creators</h1>
                </div>

                {/* <div className="grid grid-cols-3 gap-5">
                <ProfileCard
                    name="Md Irfan"
                    title="Full Stack Developer"
                    handle="NexCampus"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl={profileImg}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => console.log('Contact clicked')}
                />

                <ProfileCard
                    name="Adil Hussain"
                    title="UI UX Designer"
                    handle="NexCampus"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl={profileImg2}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => console.log('Contact clicked')}
                />

                <ProfileCard
                    name="Md Irfan"
                    title="Frontend/Product Manager"
                    handle="NexCampus"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl={profileImg3}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => console.log('Contact clicked')}
                />

                <ProfileCard
                    name="Yasa Rahman"
                    title="Designer"
                    handle="NexCampus"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl={profileImg4}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => console.log('Contact clicked')}
                />
            </div> */}

                <Creators />

            </section>


            {/* section 6 */}


            <section>

            <Footer/>

            {/* top div  */}
            <div>
                <div>
                    {/* left  */}
                    <div>

                    </div>

                    {/* right  */}
                    <div>

                    </div>

                </div>

                <div>

                </div>
            </div>
        </section>
        </div >

    )

}

export default Home