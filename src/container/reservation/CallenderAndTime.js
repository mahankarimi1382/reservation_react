"use client";
import { IoIosArrowRoundBack } from "react-icons/io";

import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import SelfOrAnotherModal from "../../components/modals/SelfOrAnotherModal";
const hours = [
  { id: 1, hour: "11:00" },
  { id: 2, hour: "11:00" },
  { id: 3, hour: "11:00" },
  { id: 4, hour: "11:00" },
  { id: 5, hour: "11:00" },
  { id: 6, hour: "11:00" },
  { id: 7, hour: "11:00" },
  { id: 8, hour: "11:00" },
  { id: 9, hour: "11:00" },
  { id: 10, hour: "11:00" },
  { id: 11, hour: "11:00" },
];
const weekDays = [
  ["شنبه", "شنبه"], //[["نام","نام کوتاه"], ... ]
  ["یکشنبه", "یکشنبه"],
  ["دوشنبه", "دوشنبه"],
  ["سه شنبه", "سه شنبه"],
  ["چهارشنبه", "چهارشنبه"],
  ["پنجشنبه", "پنجشنبه"],
  ["جمعه", "جمعه"],
];
function CallenderAndTime() {
  const [modal, setModal] = useState(false);
  const handleOpeningModal = () => {
    setModal(true);
  };
  return (
    <div className=" flex flex-col gap-10 justify-center items-center">
      {modal && <SelfOrAnotherModal setModal={setModal} />}
      <Calendar
      zIndex={0}
        className="rmdp-prime"
        renderButton={(direction, handleClick) => (
          <button
            onClick={handleClick}
            className=" text-2xl text-[#005DAD] bg-white p-1 py-2 rounded-lg"
          >
            {direction === "right" ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </button>
        )}
        weekDays={weekDays}
        calendar={persian}
        locale={persian_fa}
      />
      <div className=" w-[757px] text-[#E62333F2] flex flex-col gap-5 py-5 items-center rounded-xl shadoww ">
        <h2 className=" w-[95%] text-xl">ساعت های خالی تاریخ 1403/06/02</h2>
        <div className=" flex gap-5 w-[95%] flex-wrap">
          {hours.map((item) => {
            return (
              <button
                key={item.id}
                className=" text-xl w-[80px] py-2 text-[#005DAD] border-[#005DAD] border rounded-xl"
              >
                11:00
              </button>
            );
          })}
        </div>
        <button
          onClick={handleOpeningModal}
          className=" flex items-center justify-center px-20 p-2 rounded-lg text-white bg-[#005DAD]"
        >
          نوبت بگیرید
          <IoIosArrowRoundBack className="  text-xl" />
        </button>
      </div>
    </div>
  );
}

export default CallenderAndTime;
