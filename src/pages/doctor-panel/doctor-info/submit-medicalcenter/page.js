import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../../assets/Pics/doctor-profile-icon.png";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../../container/doctor-panel/DoctorPanelMenu";
import bahramMirzayi from "../../../../assets/Pics/bahramMirzayi.png";
import DoctorUploadingOptions from "../../../../container/doctor-panel/doctor-info/DoctorUploadingOptions";
import MakeProfileForm from "../../../../container/doctor-panel/doctor-info/MakeProfileForm";
import SubmitMedicalCenterForm from "../../../../container/doctor-panel/doctor-info/SubmitMedicalCenterForm";
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
        <div className=" text-white gap-3 p-5 w-[80%] flex flex-col justify-center items-center rounded-3xl shadow-md bg-[#78C0FD]">
          <img
            src={bahramMirzayi}
            alt="img"
            width={113}
            className=" rounded-full bg-white"
          />
          <h5 className=" text-xl font-semibold">طاهر ثابتیان</h5>
          <h5 className=" text-lg">کد نظام پزشکی: 12345</h5>
        </div>
        <div className=" bg-white rounded-3xl gap-10 p-5 px-10 shadow-md w-[80%] flex flex-col items-center">
          <DoctorUploadingOptions />
          <SubmitMedicalCenterForm />
        </div>
      </div>
    </div>
  );
}

export default page;
