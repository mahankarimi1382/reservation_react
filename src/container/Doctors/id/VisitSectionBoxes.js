"use client";
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import calenderIcon from "../../../assets/Pics/calendar.png";
import { RxCross2 } from "react-icons/rx";
import VisitHozoriCard from "./VisitHozoriCard";

function VisitSectionBoxes({ icon, topic, list }) {
  console.log(list);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const handleOpenModal = () => {
    setIsBoxOpen(!isBoxOpen);
  };
  return (
    <div className=" w-full justify-center flex">
      {isBoxOpen ? (
        <div className=" transition-all duration-[1000ms]    w-[95%] overflow-auto no-scrollbar pb-2 h-[400px] lg:h-[600px] flex flex-col items-center rounded-2xl border border-[#005DAD]">
          <div className=" w-full px-5 border-b border-dashed border-[#005DAD] py-3 flex items-center justify-between">
            <h2 className=" p-3 gap-2 text-[#005DAD] text-sm lg:text-base lg:font-semibold flex items-end">
              <img
                width={32}
                className=" w-[25px] lg:w-[32px]"
                src={icon}
                alt="hispital-icon"
              />
              {topic}
            </h2>
            <RxCross2
              onClick={handleOpenModal}
              className=" cursor-pointer text-[#005DAD] text-3xl"
            />
          </div>
          {topic === "ویزیت حضوری" ? (
            <div className=" delay-700 w-full flex  flex-col gap-5 pt-10 items-center">
              {list.map((item) => {
                return (
                  <VisitHozoriCard topic={topic} key={item.id} item={item} />
                );
              })}
              {/* <VisitHozoriCard /> */}
            </div>
          ) : (
            <div className=" delay-700 w-full flex  flex-col gap-5 pt-10 items-center">
              {list.map((item) => {
                return (
                  <VisitHozoriCard topic={topic} key={item.id} item={item} />
                );
              })}
              {/* <VisitHozoriCard /> */}
            </div>
          )}
        </div>
      ) : (
        <div className=" overflow-auto transition-all bg-white duration-300 w-[95%] h-[150px] lg:h-[226px] flex flex-col justify-between rounded-2xl border border-[#005DAD]">
          <h2 className=" p-2 lg:p-3 gap-1 lg:gap-2 text-sm lg:text-base lg:font-semibold text-[#005DAD] flex items-end">
            <img
              width={32}
              className="w-[25px] lg:w-[32px]"
              src={icon}
              alt="hispital-icon"
            />
            {topic}
          </h2>

          <h2 className=" flex p-2 lg:p-3 items-center gap-2 text-sm lg:text-[20px] text-[#757575]">
            <img width={24} src={calenderIcon} alt="calender-icon" />
            {list.length==0?
         `نوبتی برای ${topic} برای این دکتر تعریف نشده است`:`            اولین نوبت خالی ، ${list.length != 0 && list[0].nearestDate} ${list.length != 0 && list[0].nearestTime}`}

          </h2>
          <div className=" mx-5 lg:h-20 flex justify-center items-center  border-t border-dashed border-[#005DAD]">
            <button
              onClick={handleOpenModal}
              className=" hover:text-white text-sm m-2 lg:m-0 hover:bg-[#005DAD] transition-all flex items-center border border-[#005DAD] text-[#005DAD] p-1 rounded-lg lg:px-5 lg:text-lg"
            >
              نوبت بگیرید
              <IoIosArrowRoundBack className=" lg:text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VisitSectionBoxes;
