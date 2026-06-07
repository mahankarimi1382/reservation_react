import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../assets/Pics/doctor-profile-icon.png";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../container/doctor-panel/DoctorPanelMenu";
import { PiWarningCircle } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import UploadingInputContainer from "../../../container\/doctor-panel/doctor-info/UploadingInputContainer";
import message from "../../../assets/Pics/doctorPanel/messages.png";
import { fullNameStorage } from "../../../store/Store";
function page() {
              const { fullName } = fullNameStorage();

  return (
    <div dir="rtl" className="flex pb-20  bg-[#F6FBFF]">
      <DoctorPanelMenu />
      <div className=" mt-10 w-full flex flex-col gap-7 items-center">
        <div className=" flex justify-between items-center w-[80%]">
          <label className=" bg-white w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between ">
            <input className=" w-full outline-none" placeholder="جستجو" />
            <CiSearch className=" text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>
          <button className=" flex justify-center items-center p-2 border text-[#005DAD] gap-2 border-[#005DAD] rounded-xl">
            <img src={DoctorProfIcon} width={24} alt="icon" />
            دکتر {fullName}
            <IoIosArrowDown className=" text-xl" />
          </button>
        </div>
        <div className=" border shadow w-[80%] mt-14 p-5 flex gap-7 bg-white rounded-3xl flex-col">
          <div className=" flex items-center gap-5">
            <img
              className=" border rounded-full p-3 border-[#005DAD] "
              src={message}
              alt="icon"
              width={64}
            />
            <h5 className=" font-semibold">ارتباط با پشتیبانی</h5>
          </div>
          <p className=" text-[#005DAD]">
            پزشک گرامی اگر مشکلی برایتان پیش آمده و خواستید با پشتیبانی در
            ارتباط باشید لطفا یکی از شماره های زیر تماس بگیرید.
          </p>
          <div className=" flex items-center gap-20">
            <div className=" flex items-center gap-2">
              <span className=" w-2 h-2 rounded-full bg-[#005DAD]" />
              <h5>02122099087</h5>
            </div>
            <div className=" flex items-center gap-2">
              <span className=" w-2 h-2 rounded-full bg-[#005DAD]" />
              <h5>02122099087</h5>
            </div>
            <div className=" flex items-center gap-2">
              <span className=" w-2 h-2 rounded-full bg-[#005DAD]" />
              <h5>02122099087</h5>
            </div>
            <div className=" flex items-center gap-2">
              <span className=" w-2 h-2 rounded-full bg-[#005DAD]" />
              <h5>02122099087</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
