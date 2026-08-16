"use client";

import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../../assets/Pics/doctor-profile-icon.png";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../../container/doctor-panel/DoctorPanelMenu";
import bahramMirzayi from "../../../../assets/Pics/bahramMirzayi.png";
import DoctorUploadingOptions from "../../../../container/doctor-panel/doctor-info/DoctorUploadingOptions";
import MakeProfileForm from "../../../../container/doctor-panel/doctor-info/MakeProfileForm";
import { fullNameStorage, userDoctorStorage } from "../../../../store/Store";
import { get_doctor_profile_by_id } from "../../../../api/ApiCalling";
import ProfileDropdown from "../../../../components/ProfileDropdown";

function Page() {
  const { fullName } = fullNameStorage();
  const { doctors, doctorid } = userDoctorStorage();

  const [doctorProfile, setDoctorProfile] = useState(null);
  console.log(doctorProfile)
  const [isLoading, setIsLoading] = useState(true);

  const currentDoctorId = doctorid || doctors?.id;
console.log(currentDoctorId)
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      if (!currentDoctorId) return;

      setIsLoading(true);

      const data = await get_doctor_profile_by_id(currentDoctorId);

      if (data) {
        setDoctorProfile(data);
      }

      setIsLoading(false);
    };

    fetchDoctorProfile();
  }, [currentDoctorId]);

  const displayedFullName = doctorProfile
    ? `${doctorProfile.doctorName || ""} ${doctorProfile.doctorFamily || ""}`.trim()
    : fullName;

  return (
    <div dir="rtl" className="flex pb-20 bg-[#F6FBFF]">
      <DoctorPanelMenu />

      <div className="mt-10 w-full flex flex-col gap-7 items-center">
        <div className="flex justify-between items-center w-[80%]">
          <label className="w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between">
            <input className="w-full outline-none" placeholder="جستجو" />
            <CiSearch className="text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>

         <ProfileDropdown
            fullName={fullName}
            title="دکتر"

          />
        </div>

        <div className="text-white gap-3 p-5 w-[80%] flex flex-col justify-center items-center rounded-3xl shadow-md bg-[#78C0FD]">
          <img
            src={doctorProfile?.docInstaLink || bahramMirzayi}
            alt="img"
            width={113}
            className="rounded-full bg-white w-24 h-24"
          />

          <h5 className="text-xl font-semibold">
            {isLoading ? "در حال دریافت اطلاعات..." : displayedFullName}
          </h5>

          <h5 className="text-lg">
            کد نظام پزشکی: {doctorProfile?.codeNezam || "-"}
          </h5>
        </div>

        <div className="bg-white rounded-3xl gap-10 p-5 px-10 shadow-md w-[80%] flex flex-col items-center">
          <DoctorUploadingOptions />

          {isLoading ? (
            <div className="py-10 text-[#005DAD]">در حال بارگذاری...</div>
          ) : (
            <MakeProfileForm
              doctorProfile={doctorProfile}
              setDoctorProfile={setDoctorProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
