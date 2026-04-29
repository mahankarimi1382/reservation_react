import { CiEdit, CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../assets/Pics/doctor-profile-icon.png";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../container/doctor-panel/DoctorPanelMenu";

function page() {
  return (
    <div dir="rtl" className="flex pb-20  bg-[#F6FBFF]">
      <DoctorPanelMenu />
      <div className=" mt-10 w-full flex flex-col gap-7 items-center">
        <div className=" flex justify-between items-center w-[80%]">
          <label className=" w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between ">
            <input className=" w-full outline-none" placeholder="جستجو" />
            <CiSearch className=" text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>
          <button className=" flex justify-center items-center p-2 border text-[#005DAD] gap-2 border-[#005DAD] rounded-xl">
            <img src={DoctorProfIcon} width={24} alt="icon" />
            دکتر طاهر ثابتیان
            <IoIosArrowDown className=" text-xl" />
          </button>
        </div>
        <div className=" gap-8 w-[80%]  rounded-xl shadow-lg bg-white flex flex-col p-5">
          <div className=" flex justify-between items-center">
            <h5 className=" text-[#005DAD] text-lg">مطب ونک</h5>
            <button className="  flex gap-2 justify-center items-center p-2 px-3 rounded-lg border border-[#005DAD] text-[#005DAD]">
              <CiEdit className="text-2xl" />
              ویرایش
            </button>
          </div>
          <div className=" relative p-5 gap-20 bg-white shadow-md rounded-md flex justify-center items-center">
            <h5 className=" absolute right-3">نوع ویزیت :</h5>
            <span className=" flex justify-center items-center gap-1">
              <input type="radio" className=" h-4 w-4" />
              <h5>حضوری</h5>
            </span>
            <span className=" flex justify-center items-center gap-1">
              <input type="radio" className=" h-4 w-4" />
              <h5>آنلاین</h5>
            </span>
            <span className=" flex justify-center items-center gap-1">
              <input type="radio" className=" h-4 w-4" />
              <h5>همه</h5>
            </span>
          </div>
          <div className=" relative p-5 gap-20 bg-white shadow-md rounded-md flex justify-center items-center">
            <h5 className=" absolute right-3">نوع مشاوره آنلاین :</h5>
            <span className=" flex justify-center items-center gap-1">
              <input type="radio" className=" h-4 w-4" />
              <h5>صوتی</h5>
            </span>
            <span className=" flex justify-center items-center gap-1">
              <input type="radio" className=" h-4 w-4" />
              <h5>تصویری</h5>
            </span>
            <span className=" flex justify-center items-center gap-1">
              <input type="radio" className=" h-4 w-4" />
              <h5>متنی</h5>
            </span>
            <span className=" flex justify-center items-center gap-1">
              <input type="radio" className=" h-4 w-4" />
              <h5>همه</h5>
            </span>
          </div>
          <h3 className=" text-xl">
            پزشک گرامی اگر قوانین خاصی برای بیماران خود در نظر گرفته لطفا
            بنویسید
          </h3>
          <textarea className=" resize-none border shadow-md rounded-lg h-48 p-3 outline-none" />
          <div className=" flex justify-center items-center w-full">
            <button className=" p-3 rounded-lg text-white bg-[#005DAD] w-1/3">
              ذخیره
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
