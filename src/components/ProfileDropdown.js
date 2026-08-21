import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import DoctorProfIcon from "../assets/Pics/doctor-profile-icon.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  fullNameStorage,
  userProfileStore,
  userDoctorStorage,
  smeIdStorage,
} from "../store/Store";

import { get_user_role_by_username } from "../api/ApiCalling";

function ProfileDropdown({ fullName, title = "دکتر" }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { setFullName } = fullNameStorage();
  const { phoneNum } = userProfileStore();
  const { doctors, doctorid, setDoctors, setDoctorId } = userDoctorStorage();
  const { removeSmeId } = smeIdStorage();

  // خروج
  const handleLogout = () => {
    setDoctors([]);
    setDoctorId("");
    removeSmeId();
    Cookies.remove("token");
    setFullName(null);
    navigate("/");
    setIsOpen(false);
  };

  // رفتن به داشبورد براساس نقش
  const handleDashboardNavigation = async () => {
    try {
      const usernameForRole = (phoneNum || "").trim();

      const hasDoctorData =
        Boolean(doctorid) ||
        (Array.isArray(doctors)
          ? doctors.length > 0
          : !!doctors && Object.keys(doctors).length > 0);

      if (!usernameForRole) {
        navigate(
          hasDoctorData ? "/doctor-panel/dashboard" : "/userPanel/dashboard"
        );
        return;
      }

      const roles = await get_user_role_by_username(usernameForRole);

      const roleName = (
        roles?.[0]?.roleName ||
        roles?.roleName ||
        ""
      )
        .trim()
        .toLowerCase();

      if (roleName === "superadmin") {
        navigate("/adminpanel/dashboard");
      } else if (roleName === "doctor" || hasDoctorData) {
        navigate("/doctor-panel/dashboard");
      } else {
        navigate("/userPanel/dashboard");
      }
    } catch (error) {
      console.error("Dashboard navigation error:", error);
      navigate("/userPanel/dashboard");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-center items-center p-2 border text-[#005DAD] gap-2 border-[#005DAD] rounded-xl hover:bg-[#F0F7FF] transition-colors"
      >
        <img src={DoctorProfIcon} width={24} alt="icon" />
        {title} {fullName=="string"?"مهمان":fullName}
        <IoIosArrowDown className="text-xl" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full min-w-[170px] p-3 bg-white z-50 rounded-xl flex flex-col gap-3 shadow-xl border">
          <div
            onClick={handleDashboardNavigation}
            className="flex justify-between cursor-pointer gap-8 items-center text-[#004D8F] hover:bg-[#F6FBFF] rounded-lg px-2 py-2"
          >
            داشبورد
            <LuLayoutDashboard />
          </div>

          <div
            onClick={handleLogout}
            className="text-red-600 cursor-pointer flex justify-between gap-8 items-center hover:bg-red-50 rounded-lg px-2 py-2"
          >
            خروج
            <CiLogout />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;