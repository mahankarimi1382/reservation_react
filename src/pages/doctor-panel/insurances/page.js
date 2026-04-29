import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../assets/Pics/doctor-profile-icon.png";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../container/doctor-panel/DoctorPanelMenu";

import { PiWarningCircle } from "react-icons/pi";
import { BsPlusLg } from "react-icons/bs";

function page() {

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
            دکتر طاهر ثابتیان
            <IoIosArrowDown className=" text-xl" />
          </button>
        </div>
        <div className=" w-[80%] flex gap-7 flex-col">
          <div className=" flex items-center gap-2 p-3 bg-[rgba(195,5,5,0.1)] border border-[#C30505] rounded-xl text-[#C30505]">
            <PiWarningCircle className=" text-xl" />
            <h4>
              پزشک گرامی لطفا بیمه هایی که با آن ها طرف قرار داد هستید را وارد
              کنید.{" "}
            </h4>
          </div>
          <div className=" flex justify-between items-center">
            <h5 className=" text-lg">بیمه ها</h5>
            <button className=" border border-[#005DAD] rounded-lg p-2 flex justify-center items-center gap-2 text-[#005DAD]">
              <BsPlusLg className=" text-xl text-[#005DAD]" />
              افزودن بیمه
            </button>
          </div>
          <div className=" w-full gap-10 py-10 bg-white rounded-xl shadow border flex flex-col justify-center items-center">
            <div className=" flex justify-between w-[92%]">
              <div className=" flex-col flex items-start justify-center gap-10">
                <div className=" flex flex-col items-start justify-center gap-2">
                  <h5>نام بیمه :</h5>
                  <input className=" p-2 w-[300px] rounded-lg border border-[#6B6B6B] bg-[#F7F7F7]" />
                </div>
                <div className=" flex flex-col items-start justify-center gap-2">
                  <h5>وضعیت قرارداد :</h5>
                  <input className=" p-2 w-[300px] rounded-lg border border-[#6B6B6B] bg-[#F7F7F7]" />
                </div>
              </div>
              <div className=" flex-col flex gap-10 items-start justify-center ">
                <div className=" flex flex-col items-start justify-center gap-2">
                  <h5>درصد پوشش بیمه :</h5>
                  <input className=" p-2 w-[565px] rounded-lg border border-[#6B6B6B] bg-[#F7F7F7]" />
                </div>
                <div className=" flex flex-col items-start justify-center gap-2">
                  <h5>مبلغ ویزیت :</h5>
                  <input className=" p-2 w-[565px] rounded-lg border border-[#6B6B6B] bg-[#F7F7F7]" />
                </div>
              </div>
            </div>
            <button className=" bg-[#005DAD] text-white rounded-lg px-24 p-3">
              ثبت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
