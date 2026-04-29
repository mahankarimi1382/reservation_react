"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import banner1 from "../../assets/Pics/banner.png";
import banner2 from "../../assets/Pics/baannerr2.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import Baner from "../../components/Baner";

export default function BannerSwipperPhone() {
  return (
    <div className="flex w-[90%]  my-2  gap-5 justify-center items-center lg:hidden">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        spaceBetween={10}
        modules={[Pagination, Autoplay]}
        grabCursor={true}
        touchStartPreventDefault={false}
        simulateTouch={true}
        className="h-full "
      >
        <SwiperSlide>
          <Baner pic={banner2} />
        </SwiperSlide>
        <SwiperSlide>
          <Baner pic={banner1} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
