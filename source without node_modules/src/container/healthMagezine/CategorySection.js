"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import brain from "../../assets/Pics/healthMagezine-categorys-icon/brain.png";
import heart from "../../assets/Pics/healthMagezine-categorys-icon/Heart Rate.png";
import lungs from "../../assets/Pics/healthMagezine-categorys-icon/Lungs.png";
import mask from "../../assets/Pics/healthMagezine-categorys-icon/Man with Mask.png";
import virus from "../../assets/Pics/healthMagezine-categorys-icon/Virus.png";
import weight from "../../assets/Pics/healthMagezine-categorys-icon/Weight Scale.png";
import xray from "../../assets/Pics/healthMagezine-categorys-icon/X-Ray Chest.png";
import { X } from "@mui/icons-material";

function CategorySection() {
  const categorys = [
    {
      id: 1,
      title: "مغز و اعصاب",
      image: brain,
    },
    {
      id: 2,
      title: "عنوان 2",
      image: heart,
    },
    {
      id: 3,
      title: "عنوان 3",
      image: mask,
    },
    {
      id: 4,
      title: "عنوان 4",
      image: xray,
    },
    {
      id: 5,
      title: "عنوان 5",
      image: lungs,
    },
    {
      id: 6,
      title: "عنوان 6",
      image: weight,
    },
    {
      id: 7,
      title: "عنوان 7",
      image: virus,
    },
    {
      id: 7,
      title: "عنوان 7",
      image: virus,
    },
    {
      id: 7,
      title: "عنوان 7",
      image: virus,
    },
    {
      id: 7,
      title: "عنوان 7",
      image: virus,
    },
    {
      id: 7,
      title: "عنوان 7",
      image: virus,
    },
    {
      id: 7,
      title: "عنوان 7",
      image: virus,
    },
    {
      id: 7,
      title: "عنوان 7",
      image: virus,
    },
    {
      id: 7,
      title: "عنوان 7",
      image: virus,
    },
    {
      id: 7,
      title: "عنوان 7",
      image: virus,
    },
    {
      id: 7,
      title: "عنوان 7",
      image: virus,
    },
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
    <div className=" w-full mt-10 bg-white shadow-lg rounded-xl items-center justify-center gap-5 p-4 flex flex-col">
      <h3 className=" text-2xl">دسته بندی مجله های دکتر رزرو</h3>
      <div className=" relative w-full flex justify-center items-center">
        <IoIosArrowForward
          onClick={goNext}
          className=" absolute right-3 w-10 h-10 bg-white text-[rgba(62,50,50,0.5)] z-10 text-4xl rounded-xl p-2 cursor-pointer"
        />
        <Swiper
          ref={swiperRef}
          slidesPerView={7}
          spaceBetween={20}
          loop={true}
          className=" w-full"
        >
          {categorys.map((item) => {
            return (
              <SwiperSlide
                key={item.id}
                className=" flex justify-center items-center"
              >
                <div className=" min-w-[93px]  gap-2 relative flex flex-col justify-center items-center">
                  <img
                    alt="img"
                    width={90}
                    className=" rounded-xl"
                    src={item.image}
                  />
                  <h5>{item.title}</h5>
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
    </div>
  );
}

export default CategorySection;
