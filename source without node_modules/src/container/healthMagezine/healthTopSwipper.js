"use client";
import dog from "../../assets/Pics/healthmagezine-pics/dog.png";
import food from "../../assets/Pics/healthmagezine-pics/food.png";
import stadium from "../../assets/Pics/healthmagezine-pics/statuim.png";
import technology from "../../assets/Pics/healthmagezine-pics/technology.png";
import terapy from "../../assets/Pics/healthmagezine-pics/terapy.png";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export default function TopSwipper() {
  const topics = [
    { id: 1, title: "ورزش  سلامت", img: dog },
    { id: 2, title: "روانشناسی", img: food },
    { id: 3, title: "قلب و عروق", img: stadium },
    { id: 4, title: "اعصاب", img: technology },
    { id: 5, title: "ارتوپدی", img: terapy },
    { id: 6, title: "گوش ، حلق و بینی", img: dog },
    { id: 7, title: "پوست و مو" },
    { id: 8, title: "چشم پزشکی" },
    { id: 9, title: "زنان و زایمان" },
    { id: 10, title: "کودکان" },
    { id: 11, title: "روانپرشکی" },
    { id: 12, title: "رادیولوژی" },
    { id: 13, title: "پزشکی خانواده" },
    { id: 14, title: "بیهوشی" },
    { id: 15, title: "دندانپزشکی" },
  ];
  const swiperRef = useRef(null);
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <div className=" relative w-[90%] m-auto flex justify-center">
      <IoIosArrowForward
        onClick={goNext}
        className=" absolute left-0  shadow-[-3px_0px_23px_32px_rgba(255,_255,_255,_1)] bg-white h-14 z-10  right-0 text-4xl text-[#3E88F6] cursor-pointer"
      />
      <Swiper
        ref={swiperRef}
        slidesPerView={6}
        spaceBetween={20}
        loop={true}
        className=" w-full"
      >
        {topics.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              className=" cursor-pointer flex justify-center items-center"
            >
              <div className=" w-48 min-w-[93px] gap-2 relative flex flex-col justify-center items-center">
                <img
                  alt="img"
                  width={170}
                  className=" p-1 rounded-xl blur-[1.5px]"
                  src={item.img}
                />
                <h5 className=" absolute flex justify-center items-center text-white gap-5">
                  #{item.title}
                </h5>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <IoIosArrowBack
        onClick={goPrev}
        className=" absolute left-0  shadow-[-3px_0px_23px_32px_rgba(255,_255,_255,_1)] bg-white h-14 z-10 text-4xl text-[#3E88F6] cursor-pointer"
      />
    </div>
  );
}
