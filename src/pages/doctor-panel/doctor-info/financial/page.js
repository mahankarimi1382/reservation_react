import { CiSearch, CiLogout } from "react-icons/ci";
import DoctorProfIcon from "../../../../assets/Pics/doctor-profile-icon.png";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../../container/doctor-panel/DoctorPanelMenu";
import DoctorUploadingOptions from "../../../../container/doctor-panel/doctor-info/DoctorUploadingOptions";
import FinancialForm from "../../../../container/doctor-panel/doctor-info/FinancialForm";
import DoctorInfoHeader from "../../../../container/doctor-panel/doctor-info/DoctorInfoHeader";

import {
  fullNameStorage,
  userProfileStore,
  userDoctorStorage,
  smeIdStorage,
} from "../../../../store/Store";

import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// API
import { get_user_role_by_username } from "../../../../api/ApiCalling";
import ProfileDropdown from "../../../../components/ProfileDropdown";

function page() {
  const navigate = useNavigate();

  const { fullName, setFullName } = fullNameStorage();
  const { phoneNum } = userProfileStore();
  const { setDoctors, setDoctorId } = userDoctorStorage();
  const { removeSmeId } = smeIdStorage();

  const [isOpen, setIsOpen] = useState(false);

  // ==================== Logout ====================
  const handleLogout = () => {
    setDoctors([]);
    setDoctorId("");
    removeSmeId();
    Cookies.remove("token");
    setFullName(null);
    navigate("/");
    setIsOpen(false);
  };

  // ==================== Navigation با چک نقش ====================
  const handleDashboardNavigation = async () => {
    try {
      const usernameForRole = (phoneNum || "").trim();

      if (!usernameForRole) {
        navigate("/userPanel/dashboard");
        return;
      }

      const roles = await get_user_role_by_username(usernameForRole);
      const roleNameRaw = roles?.[0]?.roleName || "";
      const roleName = roleNameRaw.trim().toLowerCase();

      if (roleName === "superadmin") {
        navigate("/adminpanel/dashboard");
      } else if (roleName === "doctor") {
        navigate("/doctor-panel/dashboard");
      } else {
        navigate("/userPanel/dashboard");
      }
    } catch (e) {
      console.error("dashboard navigation error:", e);
      navigate("/userPanel/dashboard");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div dir="rtl" className="flex pb-20 bg-[#F6FBFF]">
      <DoctorPanelMenu />

      <div className="mt-10 w-full flex flex-col gap-7 items-center">
        <div className="flex justify-between items-center w-[80%]">
          {/* جستجو */}
          <label className="bg-white w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between">
            <input className="w-full outline-none" placeholder="جستجو" />
            <CiSearch className="text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>

          {/* پروفایل با Dropdown */}
         <ProfileDropdown
            fullName={fullName}
            title="دکتر"

          />
        </div>

        {/* کارت اطلاعات پزشک */}
        <DoctorInfoHeader />

        {/* فرم‌ها */}
        <div className="bg-white rounded-3xl gap-10 p-5 px-10 shadow-md w-[80%] flex flex-col items-center">
          <DoctorUploadingOptions />
          <FinancialForm />
        </div>
      </div>
    </div>
  );
}

export default page;
