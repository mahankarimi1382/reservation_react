import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../assets/Pics/doctor-profile-icon.png";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../container/doctor-panel/DoctorPanelMenu";
import AnswerOpinions from "../../../container/doctor-panel/opinions-about-me/AnswerOpinions";
import { fullNameStorage } from "../../../store/Store";
import ProfileDropdown from "../../../components/ProfileDropdown";

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
         <ProfileDropdown
            fullName={fullName}
            title="دکتر"

          />
        </div>
        <div className=" w-[80%] flex gap-7 flex-col">
          <AnswerOpinions />
        </div>
      </div>
    </div>
  );
}

export default page;
