"use client";
import dog from "../../assets/Pics/healthmagezine-pics/dog.png";
import food from "../../assets/Pics/healthmagezine-pics/food.png";
import stadium from "../../assets/Pics/healthmagezine-pics/statuim.png";
import technology from "../../assets/Pics/healthmagezine-pics/technology.png";
import terapy from "../../assets/Pics/healthmagezine-pics/terapy.png";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import poster from "../../assets/Pics/healthmagezine-pics/avocadoposter.png";

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
    <div className=" relative w-1/2 flex justify-center items-center">
      <IoIosArrowForward
        onClick={goNext}
        className=" absolute right-3 w-10 h-10 bg-white text-[rgba(62,50,50,0.5)] z-10 text-4xl rounded-xl p-2 cursor-pointer"
      />
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        className=" w-full"
      >
        {topics.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              className="  flex justify-center items-center"
            >
              <div className=" min-w-[93px]  gap-2 relative flex flex-col justify-center items-center">
                <img
                  alt="img"
                  width={1000}
                  className=" rounded-xl"
                  src={poster}
                />
                <div className=" absolute w-[95%] gap-2 rounded-xl bottom-2 pb-4 bg-[rgba(255,255,255,0.75)] flex flex-col p-2">
                  <h5 className=" text-2xl font-semibold">
                    رژیم غذایی سالم ، سبک زندگی سالم
                  </h5>
                  <p className=" font-light">
                    اگر شما رژیم غذایی خود را تغییر دهید نه تنها وزنتان بلکه سبک
                    زندگیتان هم نیز تغییر خواهد کرده پس از تغییر نترسید و این
                    لطف را در حق کنید و.....
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <IoIosArrowBack
        onClick={goPrev}
        className=" absolute left-3 w-10 h-10 bg-white text-[rgba(62,50,50,0.5)] z-10 text-4xl rounded-xl p-2 cursor-pointer"
      />
    </div>
  );
}
