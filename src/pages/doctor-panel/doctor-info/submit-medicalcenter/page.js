import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../../assets/Pics/doctor-profile-icon.png";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../../container/doctor-panel/DoctorPanelMenu";
import bahramMirzayi from "../../../../assets/Pics/bahramMirzayi.png";
import DoctorUploadingOptions from "../../../../container/doctor-panel/doctor-info/DoctorUploadingOptions";
import MakeProfileForm from "../../../../container/doctor-panel/doctor-info/MakeProfileForm";
import SubmitMedicalCenterForm from "../../../../container/doctor-panel/doctor-info/SubmitMedicalCenterForm";
import { fullNameStorage } from "../../../../store/Store";
import ProfileDropdown from "../../../../components/ProfileDropdown";

function page() {
  const { fullName } = fullNameStorage();

  return (
    <div dir="rtl" className="flex min-h-screen pb-20 bg-[#F6FBFF]">
      <DoctorPanelMenu />

      <div className="mt-8 sm:mt-10 w-full flex flex-col gap-6 sm:gap-7 items-center px-4 sm:px-0">
        {/* Top bar: Search + Profile */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full max-w-[80%]">
          <label className="w-full sm:w-[450px] border border-[#005DAD] rounded-xl flex items-center overflow-hidden">
            <input
              type="text"
              className="w-full outline-none px-3 py-2.5 text-sm sm:text-base"
              placeholder="جستجو"
            />
            <div className="bg-[#005DAD] p-2.5 flex items-center justify-center">
              <CiSearch className="text-white text-2xl sm:text-3xl" />
            </div>
          </label>

          <ProfileDropdown fullName={fullName} title="دکتر" />
        </div>

        {/* Doctor profile card */}
        <div className="text-white gap-3 p-5 w-full max-w-[80%] flex flex-col justify-center items-center rounded-3xl shadow-md bg-[#78C0FD]">
          <img
            src={bahramMirzayi}
            alt="doctor"
            width={113}
            height={113}
            className="rounded-full bg-white object-cover"
          />
          <h5 className="text-xl font-semibold">{fullName}</h5>
          <h5 className="text-base sm:text-lg opacity-90">
            کد نظام پزشکی: 12345
          </h5>
        </div>

        {/* Content card */}
        <div className="bg-white rounded-3xl gap-8 sm:gap-10 p-5 sm:p-6 px-5 sm:px-10 shadow-md w-full max-w-[80%] flex flex-col items-center">
          <DoctorUploadingOptions />
          <SubmitMedicalCenterForm />
        </div>
      </div>
    </div>
  );
}

export default page;