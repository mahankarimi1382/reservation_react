import React from "react";
import MakeProfIcon_blue from "../../../assets/Pics/doctorPanel/make-profile-icon-blue.png";
import MakeProfIcon_black from "../../../assets/Pics/doctorPanel/make-profile-icon-black.png";
import { DoctorProfileUploadOptionButtons } from "../../../components/Links/Links";
import uploadlicensesicon_blue from "../../../assets/Pics/doctorPanel/uploadlicenses-icon-blue.png";
import uploadlicensesicon_black from "../../../assets/Pics/doctorPanel/uploadlicenses-icon-black.png";

import hospital_black from "../../../assets/Pics/Adminpanelmenu-icon/hospital-black.png";
import hospital_blue from "../../../assets/Pics/Adminpanelmenu-icon/hospital.png";
import walletfinancialicon_blue from "../../../assets/Pics/doctorPanel/wallet-financial-icon-blue.png";
import walletfinancialicon_black from "../../../assets/Pics/doctorPanel/wallet-financial-icon-black.png";

function DoctorUploadingOptions() {
  return (
    <div className=" p-2 w-full flex justify-between shadow-md rounded-3xl items-center bg-[#F7F7F7]">
      <DoctorProfileUploadOptionButtons
        text="ساخت پروفایل"
        path="/doctor-panel/doctor-info/make-profile"
        blueicon={MakeProfIcon_blue}
        blackicon={MakeProfIcon_black}
      />
      <DoctorProfileUploadOptionButtons
        text="ثبت مدارک"
        path="/doctor-panel/doctor-info/upload-licenses"
        blueicon={uploadlicensesicon_blue}
        blackicon={uploadlicensesicon_black}
      />
      <DoctorProfileUploadOptionButtons
        text="ثبت مرکز درمانی"
        path="/doctor-panel/doctor-info/submit-medicalcenter"
        blueicon={hospital_blue}
        blackicon={hospital_black}
      />
      <DoctorProfileUploadOptionButtons
        text="مالی"
        path="/doctor-panel/doctor-info/financial"
        blueicon={walletfinancialicon_blue}
        blackicon={walletfinancialicon_black}
      />
    </div>
  );
}

export default DoctorUploadingOptions;
