import { CiLogout, CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../assets/Pics/doctor-profile-icon.png";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../container/doctor-panel/DoctorPanelMenu";
import AddArticle from "../../../container/doctor-panel/article/AddArticle";

import {
  fullNameStorage,
  userProfileStore,
  userDoctorStorage,
  smeIdStorage,
} from "../../../store/Store";

import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// API
import { get_user_role_by_username } from "../../../api/ApiCalling";
import ProfileDropdown from "../../../components/ProfileDropdown";

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
    // setPhoneNum(""); // اگر setter دارید اضافه کنید
    removeSmeId();
    Cookies.remove("token");
    setFullName(null);
    navigate("/");
    setIsOpen(false);
  };

  // ==================== Navigation (دقیقاً مثل LoginButton) ====================
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
            <input
              className="w-full outline-none"
              placeholder="جستجو"
            />
            <CiSearch className="text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>

          <ProfileDropdown
            fullName={fullName}
            title="دکتر"

          />
        </div>

        {/* محتوای اصلی */}
        <div className="w-[80%] mt-14 p-5 items-center flex gap-7 bg-white rounded-3xl flex-col">
          <AddArticle />
        </div>
      </div>
    </div>
  );
}

export default page;