import React from "react";
import HomeIcon from "../assets/Pics/phone-menu-icon/home_phone_icon.png";
import clipboard from "../assets/Pics/phone-menu-icon/clipboard_phone_icon.png";
import profile_phone from "../assets/Pics/phone-menu-icon/profile_phone_icon.png";
import search_phone from "../assets/Pics/phone-menu-icon/search_phone_icon.png";
import HomeIcon_blue from "../assets/Pics/phone-menu-icon/home_phone_icon_blue.png";
import clipboard_blue from "../assets/Pics/phone-menu-icon/clipboard_phone_icon_blue.png";
import profile_phone_blue from "../assets/Pics/phone-menu-icon/profile_phone_icon_blue.png";
import bilbilak from "../assets/Pics/phone-menu-icon/bilbilak_phoneMenu.png";

import { useLocation, useNavigate } from "react-router-dom";

function PhoneMenuHref({ handleSearchButtClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const pathName = location.pathname;

  return (
    <div
      dir="rtl"
      className="shadow-[0px_-9px_9px_0px_rgba(0,_0,_0,_0.1)]
      flex z-[70] justify-around items-center w-full lg:hidden md:hidden h-[74px]
      fixed bottom-0 bg-white text-white"
    >
      <div
        onClick={() => navigate("/")}
        className="h-full relative w-1/4 flex items-center justify-center flex-col"
      >
        <img
          className={pathName === "/" ? "w-[30px]" : ""}
          width={24}
          src={pathName === "/" ? HomeIcon_blue : HomeIcon}
          alt="home-icon"
        />

        <button
          className={
            pathName === "/"
              ? "text-[#005DAD] text-[18px]"
              : "text-black text-base"
          }
        >
          خانه
        </button>

        {pathName === "/" && (
          <img
            className="absolute bottom-0"
            width={40}
            src={bilbilak}
            alt="home-icon"
          />
        )}
      </div>

      <div
        onClick={handleSearchButtClick}
        className="w-1/4 flex items-center justify-center flex-col"
      >
        <img width={24} src={search_phone} alt="search-icon" />
        <button className="text-black">جستجو</button>
      </div>

      <div
        onClick={() => navigate("/userPanel/history")}
        className="w-1/4 flex items-center justify-center flex-col"
      >
        <img
          className={pathName === "/userPanel/history" ? "w-[30px]" : ""}
          width={24}
          src={
            pathName === "/userPanel/history"
              ? clipboard_blue
              : clipboard
          }
          alt="history-icon"
        />

        <button className="text-black whitespace-nowrap">
          نوبت های من
        </button>

        {pathName === "/userPanel/history" && (
          <img
            className="absolute bottom-0"
            width={40}
            src={bilbilak}
            alt="history-icon"
          />
        )}
      </div>

      <div
        onClick={() => navigate("/userPanel/dashboard")}
        className="w-1/4 flex items-center justify-center flex-col"
      >
        <img
          className={pathName === "/userPanel/dashboard" ? "w-[30px]" : ""}
          width={24}
          src={
            pathName === "/userPanel/dashboard"
              ? profile_phone_blue
              : profile_phone
          }
          alt="profile-icon"
        />

        <button className="text-black">پروفایل</button>

        {pathName === "/userPanel/dashboard" && (
          <img
            className="absolute bottom-0"
            width={40}
            src={bilbilak}
            alt="profile-icon"
          />
        )}
      </div>
    </div>
  );
}

export default PhoneMenuHref;
