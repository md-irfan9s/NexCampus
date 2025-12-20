import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import profileImg from "../assets/images/Irfan.png"
import ProfileCard from "../animation/ProfileCard";
import profileImg2 from "../assets/images/Adil.png"
import profileImg3 from "../assets/images/Raj.png"
import profileImg4 from "../assets/images/Yasa.png"
import profileImg5 from "../assets/images/Smriti.png"
import profileImg6 from "../assets/images/Shivani.png"
import profileImg7 from "../assets/images/Jyoti.png"
import profileImg8 from "../assets/images/Amir.png"

import { EffectCoverflow, Pagination, Navigation, Autoplay, FreeMode } from 'swiper/modules';


function Creators() {
    return (
        <div className="container mb-8">
            {/* <h1 className="heading">Flower Gallery</h1> */}
            <Swiper
                effect="coverflow"
                centeredSlides={false}
                spaceBetween={25}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: false,
                }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                speed={900}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="w-full creators-swiper first-swiper mt-10"
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 3 },
                }}

            >

                <SwiperSlide>

                    <ProfileCard
                        name="Smriti Kumari"
                        title="Frontend Developer"
                        handle="NexCampus"
                        status="Online"
                        contactText="Contact Me"
                        avatarUrl={profileImg5}
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => console.log('Contact clicked')}
                    />
                </SwiperSlide>


                <SwiperSlide>

                    <ProfileCard
                        name="Shivani Kumari"
                        title="Designer"
                        handle="NexCampus"
                        status="Online"
                        contactText="Contact Me"
                        avatarUrl={profileImg6}
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => console.log('Contact clicked')}
                    />
                </SwiperSlide>

                <SwiperSlide>

                    <ProfileCard
                        name="Jyoti Kumari"
                        title="Frontend Developer"
                        handle="NexCampus"
                        status="Online"
                        contactText="Contact Me"
                        avatarUrl={profileImg7}
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => console.log('Contact clicked')}
                    />
                </SwiperSlide>
            </Swiper>


            <Swiper
                effect="coverflow"
                centeredSlides={true}
                // centeredSlidesBounds  
                // rewind
                // slidesPerView="auto"
                // loop
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 120,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                slidesPerView={3}
                spaceBetween={25}
                loop={true}
                freeMode={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                speed={900}
                modules={[FreeMode, Pagination, Autoplay]}
                className="w-full creators-swiper mt-10"
                breakpoints={{
                    320: { slidesPerView: 1 },    // Mobile
                    640: { slidesPerView: 1.5 },  // Small tablets
                    768: { slidesPerView: 2 },    // Tablets
                    // 1024: { slidesPerView: 3 },   // Laptops
                    1280: { slidesPerView: 3 },   // Large screens
                }}

            >

                <SwiperSlide>

                    <ProfileCard
                        name="Md Irfan"
                        title="MERN Stack Developer"
                        handle="NexCampus"
                        status="Online"
                        contactText="Contact Me"
                        avatarUrl={profileImg}
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => console.log('Contact clicked')}
                    />
                </SwiperSlide>


                <SwiperSlide>

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
                </SwiperSlide>


                <SwiperSlide>

                    <ProfileCard
                        name="Md Raj"
                        title="Frontend Developer"
                        handle="NexCampus"
                        status="Online"
                        contactText="Contact Me"
                        avatarUrl={profileImg3}
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => console.log('Contact clicked')}
                    />
                </SwiperSlide>

                <SwiperSlide>

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
                </SwiperSlide>

                <SwiperSlide>

                    <ProfileCard
                        name="Amiruddin Rashid"
                        title="Frontend Developer"
                        handle="NexCampus"
                        status="Online"
                        contactText="Contact Me"
                        avatarUrl={profileImg8}
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => console.log('Contact clicked')}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Creators;
