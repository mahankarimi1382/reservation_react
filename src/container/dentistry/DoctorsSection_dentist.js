import React from "react";
import abbas from "../../assets/Pics/abbas.png";
import star from "../../assets/Pics/star.png";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import { Link } from "react-router-dom";
function DoctorsSection_dentist() {
  const doctors = [
    {
      id: 1,
      name: "عباس",
      family: "میر احمدی",
      ability: "قلب و عروق",
      razi: 558,
      raziPercent: 87,
      rate: 4.7,
      address: "بیمارستان میلاد",
      tags: [
        { id: 1, text: "جراحی قلب" },
        { id: 2, text: "آنجوگرافی" },
        { id: 3, text: "تست ورزش" },
      ],
    },
    {
      id: 2,
      name: "عباس",
      family: "میر احمدی",
      ability: "قلب و عروق",
      razi: 558,
      raziPercent: 87,
      rate: 4.7,
      address: "بیمارستان میلاد",
      tags: [
        { id: 1, text: "جراحی قلب" },
        { id: 2, text: "آنجوگرافی" },
        { id: 3, text: "تست ورزش" },
      ],
    },
    {
      id: 3,
      name: "عباس",
      family: "میر احمدی",
      ability: "قلب و عروق",
      razi: 558,
      raziPercent: 87,
      rate: 4.7,
      address: "بیمارستان میلاد",
      tags: [
        { id: 1, text: "جراحی قلب" },
        { id: 2, text: "آنجوگرافی" },
        { id: 3, text: "تست ورزش" },
      ],
    },
    {
      id: 4,
      name: "عباس",
      family: "میر احمدی",
      ability: "قلب و عروق",
      razi: 558,
      raziPercent: 87,
      rate: 4.7,
      address: "بیمارستان میلاد",
      tags: [
        { id: 1, text: "جراحی قلب" },
        { id: 2, text: "آنجوگرافی" },
        { id: 3, text: "تست ورزش" },
      ],
    },
    {
      id: 5,
      name: "عباس",
      family: "میر احمدی",
      ability: "قلب و عروق",
      razi: 558,
      raziPercent: 87,
      rate: 4.7,
      address: "بیمارستان میلاد",
      tags: [
        { id: 1, text: "جراحی قلب" },
        { id: 2, text: "آنجوگرافی" },
        { id: 3, text: "تست ورزش" },
      ],
    },
    {
      id: 6,
      name: "عباس",
      family: "میر احمدی",
      ability: "قلب و عروق",
      razi: 558,
      raziPercent: 87,
      rate: 4.7,
      address: "بیمارستان میلاد",
      tags: [
        { id: 1, text: "جراحی قلب" },
        { id: 2, text: "آنجوگرافی" },
        { id: 3, text: "تست ورزش" },
      ],
    },
    {
      id: 7,
      name: "عباس",
      family: "میر احمدی",
      ability: "قلب و عروق",
      razi: 558,
      raziPercent: 87,
      rate: 4.7,
      address: "بیمارستان میلاد",
      tags: [
        { id: 1, text: "جراحی قلب" },
        { id: 2, text: "آنجوگرافی" },
        { id: 3, text: "تست ورزش" },
      ],
    },
    {
      id: 8,
      name: "عباس",
      family: "میر احمدی",
      ability: "قلب و عروق",
      razi: 558,
      raziPercent: 87,
      rate: 4.7,
      address: "بیمارستان میلاد",
      tags: [
        { id: 1, text: "جراحی قلب" },
        { id: 2, text: "آنجوگرافی" },
        { id: 3, text: "تست ورزش" },
      ],
    },
  ];
  return (
    <div className=" w-full flex flex-col items-center justify-center">
      <div className=" lg:mt-20 mt-5 flex justify-between w-11/12">
        <h2 className=" lg:text-[38px] flex justify-center items-center gap-1 lg:gap-2">
          <span className=" text-[#005DAD] ">پزشکان</span>
          ویزیت فوری
        </h2>
        <Link to="/doctors" className=" text-[#005DAD] flex items-center gap-1 text-[12px] lg:text-[16px]">
          مشاهده همه
          <IoIosArrowBack />
        </Link>
      </div>
      <div className=" lg:mt-10 mt-5 flex gap-12 no-scrollbar overflow-x-auto w-11/12">
        {doctors.map((items) => {
          return (
            <div
              key={items.id}
              className=" px-2 lg:px-0 flex lg:gap-5 gap-2 flex-col justify-center items-center rounded-xl border-2 min-w-[215px] lg:min-w-[310px] h-[266px] lg:h-[399px]"
            >
              <img
                alt="doctot-img"
                className=" object-cover w-[86px] h-[86px]   lg:w-[133px] lg:h-[133px] rounded-full"
                src={abbas}
              />
              <div className=" flex w-full lg:px-5 justify-between items-center">
                <h2 className=" lg:text-[16px] lg:font-semibold">
                  {items.name} {items.family}
                </h2>
                <div className=" flex items-center justify-center">
                  <h2 className=" font-medium text-[12px]">{items.rate}</h2>
                  <img
                    alt="star-icon"
                    className=" lg:w-[18px] w-4 h-4 lg:h-[18px]"
                    src={star}
                  />
                </div>
              </div>
              <h2 className=" text-gray-400 text-[14px] lg:font-semibold lg:px-5 w-full">
                متخصص {items.ability}
              </h2>
              <h2 className=" text-[#1F7168] text-[14px] lg:font-semibold w-full lg:px-5">
                ({items.raziPercent}%) {items.razi} بیمار راضی
              </h2>
              <div className=" flex w-full justify-center lg:px-5 gap-5">
                {items.tags.map((item2) => {
                  return (
                    <h2
                      className=" text-[12px] lg:font-semibold  text-[#757575] bg-[#F1F1F1] p-1 px-2 rounded-xl flex"
                      key={item2.id}
                    >
                      {item2.text}
                    </h2>
                  );
                })}
              </div>
              <button className=" hover:bg-[#005DAD] hover:text-white transition-all flex justify-center items-center gap-2 text-sm lg:text-base lg:w-2/3 text-[#005DAD] rounded-lg p-1 lg:p-2 border-2 border-[#005DAD]">
                نوبت بگیرید
                <MdArrowBackIosNew />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DoctorsSection_dentist;
