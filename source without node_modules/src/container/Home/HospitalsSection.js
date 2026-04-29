"use client"
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import hospitalIcon from "../../assets/Pics/hospitalIcon.png";
import { Link } from "react-router-dom";
import { Read_DoctorTreatmentCenters4FirstPage } from "../../api/ApiCalling";

function HospitalsSection() {
  const [medicals,setMedicals]=useState([])
  console.log(medicals)
    const getMedicalCentersList = async () => {
      const result = await Read_DoctorTreatmentCenters4FirstPage();
      if (result) {
        console.log(result)
        setMedicals(result.list)
      }
    };
    useEffect(() => {
      getMedicalCentersList();
    }, []);
  const hospitals = [
    {
      id: 1,
      name: "بیمارستان ابن سینا ",
      category: "بیمارستان تخصصی",
      joined: "36",
      skills: "15",
      loc: "تهران",
    },
    {
      id: 2,
      name: "بیمارستان ابن سینا ",
      category: "بیمارستان تخصصی",
      joined: "36",
      skills: "15",
      loc: "تهران",
    },
    {
      id: 3,
      name: "بیمارستان ابن سینا ",
      category: "بیمارستان تخصصی",
      joined: "36",
      skills: "15",
      loc: "تهران",
    },
    {
      id: 4,
      name: "بیمارستان ابن سینا ",
      category: "بیمارستان تخصصی",
      joined: "36",
      skills: "15",
      loc: "تهران",
    },
    {
      id: 5,
      name: "بیمارستان ابن سینا ",
      category: "بیمارستان تخصصی",
      joined: "36",
      skills: "15",
      loc: "تهران",
    },
    {
      id: 6,
      name: "بیمارستان ابن سینا ",
      category: "بیمارستان تخصصی",
      joined: "36",
      skills: "15",
      loc: "تهران",
    },
    {
      id: 7,
      name: "بیمارستان ابن سینا ",
      category: "بیمارستان تخصصی",
      joined: "36",
      skills: "15",
      loc: "تهران",
    },
    {
      id: 8,
      name: "بیمارستان ابن سینا ",
      category: "بیمارستان تخصصی",
      joined: "36",
      skills: "15",
      loc: "تهران",
    },
    {
      id: 9,
      name: "بیمارستان ابن سینا ",
      category: "بیمارستان تخصصی",
      joined: "36",
      skills: "15",
      loc: "تهران",
    },
    {
      id: 10,
      name: "بیمارستان ابن سینا ",
      category: "بیمارستان تخصصی",
      joined: "36",
      skills: "15",
      loc: "تهران",
    },
  ];
  return (
    <div className=" mt-5 lg:mt-20 flex flex-col justify-center items-center">
      <div className=" flex items-center justify-between w-11/12">
        <h2 className=" flex gap-1 items-center lg:gap-2 lg:text-[38px]">
          <span className=" text-[#005DAD]">مراکز درمانی</span>
          عضو
        </h2>
        <Link
          to="/medical-centers"
          className=" text-[#005DAD] lg:text-base text-xs flex justify-center items-center gap-1"
        >
          مشاهده همه
          <IoIosArrowBack />
        </Link>
      </div>
      <div className=" lg:mt-10  flex lg:gap-12 gap-5 lg:m-10 lg:p-10 p-2 no-scrollbar overflow-x-auto w-full">
        {medicals.filter((item)=>item).map((items) => {
          return (
            <div
              key={items&&items.id}
              className=" flex lg:gap-7 gap-4 flex-col shadow-lg justify-center items-center rounded-xl min-w-[202px] h-[164px] lg:min-w-[326px] lg:h-[260px]"
            >
              <div className=" flex justify-center lg:gap-10 gap-5 w-full items-center">
                <div className=" justify-center flex w-1/3">
                  <div className=" lg:w-[97px] lg:h-[97px] rounded-full border border-[#4282F7] p-2 lg:p-4">
                    <img alt="hospital-icon" src={hospitalIcon} />
                  </div>
                </div>
                <div className=" lg:gap-3 gap-2 text-start flex-col flex ">
                  <h2 className=" text-[16px] lg:text-[18px]">{items&&items.name}</h2>
                  <h3 className=" lg:text-[14px] text-[10px] text-[#817D7D]">
                    {items&&items.category}
                  </h3>
                </div>
              </div>
              <div className=" flex gap-1 lg:gap-2">
                <h5 className=" px-2 rounded-full flex justify-center font-medium items-center lg:text-[14px] text-[11px] lg:px-5 lg:h-[22px] bg-[rgba(254,182,47,0.25)]">
                  {items&&items.cityName}
                </h5>
                <h5 className=" px-2  text-[11px] font-medium rounded-full flex items-center lg:text-[14px] justify-center lg:px-5 lg:h-[22px] bg-[rgba(244,1,1,0.1)]">
                  {items&&items.specialistCount} تخصص
                </h5>
                <h5 className=" px-2  text-[11px] font-medium rounded-full flex items-center lg:text-[14px] justify-center lg:px-5 lg:h-[22px] bg-[rgba(128,173,241,0.2)]">
                  {items&&items.doctorsCount} پزشک عضو
                </h5>
              </div>
              <button className=" hover:bg-[#005DAD] hover:text-white transition-all lg:w-[246px] rounded-lg flex justify-center items-center gap-2 border border-[#005DAD] text-[#005DAD] p-1 text-xs lg:text-base  lg:h-[34px]">
                مشاهده پزشکان مرکز
                <IoIosArrowBack />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HospitalsSection;
