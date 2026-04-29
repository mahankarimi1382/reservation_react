import React from "react";
import logo from "../assets/Pics/logo-doctor.png";
import home from "../assets/Pics/BurgerMenuIcons/house 1.png";
import Special from "../assets/Pics/BurgerMenuIcons/equipment 1.png";
import medicalCenter from "../assets/Pics/BurgerMenuIcons/hospital (4) 1.png";
import dentistry from "../assets/Pics/BurgerMenuIcons/tooth (4) 1.png";
import psychiatry from "../assets/Pics/BurgerMenuIcons/research 1.png";
import healthMagezine from "../assets/Pics/BurgerMenuIcons/book (5) 1.png";
import medicalCentersLogin from "../assets/Pics/BurgerMenuIcons/ambulance 1.png";
import doctorLogin from "../assets/Pics/BurgerMenuIcons/doctor (4) 1.png";
import dashboardIcon_blue from "../assets/Pics/UserPanel-Icons/dashboard-icon.png";
import acountInfoIcon_blue from "../assets/Pics/UserPanel-Icons/acountInfo-icon.png";
import historyIcon_blue from "../assets/Pics/UserPanel-Icons/history-icon.png";
import messageIcon_blue from "../assets/Pics/UserPanel-Icons/message-icon.png";
import rewardsIcon_blue from "../assets/Pics/UserPanel-Icons/rewards-icon.png";
import transactionsIcon_blue from "../assets/Pics/UserPanel-Icons/transaction-icon.png";
import walletIcon_blue from "../assets/Pics/UserPanel-Icons/wallet-icon.png";
import opinions_blue from "../assets/Pics/UserPanel-Icons/opinions-icon.png";
import saves_blue from "../assets/Pics/UserPanel-Icons/saves-icon.png";
import heart_blue from "../assets/Pics/UserPanel-Icons/heart-blue.png";
import SubsetedUsers_blue from "../assets/Pics/UserPanel-Icons/subsetedUsers-icon.png";

import { IoPerson } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

// Stores
import { fullNameStorage, myStore } from "../store/Store";

function BurgerMenu() {
  const { fullName, setFullName } = fullNameStorage();
  const { setToken } = myStore();

  // Replaces usePathname() from Next.js
  const location = useLocation();
  const pathName = location.pathname;

  const isUserPanel = pathName.startsWith("/userPanel");

  const UserPanelLinks = [
    {
      id: 1,
      name: "داشبورد",
      link: "/userPanel/dashboard",
      img: dashboardIcon_blue,
    },
    {
      id: 2,
      name: "اطلاعات حساب کاربری",
      link: "/userPanel/acountInfo",
      img: acountInfoIcon_blue,
    },
    { id: 3, name: "سوابق", link: "/userPanel/history", img: historyIcon_blue },
    {
      id: 4,
      name: "پیغام ها",
      link: "/userPanel/messages",
      img: messageIcon_blue,
    },
    {
      id: 5,
      name: "تراکنش ها",
      link: "/userPanel/transactions",
      img: transactionsIcon_blue,
    },
    { id: 6, name: "کیف پول", link: "/userPanel/wallet", img: walletIcon_blue },
    {
      id: 7,
      name: "امتیاز ها",
      link: "/userPanel/rewards",
      img: rewardsIcon_blue,
    },
    { id: 8, name: "نظرات", link: "/userPanel/opinions", img: opinions_blue },
    { id: 9, name: "ذخیره شده ها", link: "/userPanel/saves", img: saves_blue },
    { id: 10, name: "علاقمندی", link: "/userPanel/favorites", img: heart_blue },
    {
      id: 11,
      name: "کاربران زیرمجموعه",
      link: "/userPanel/subsetedusers",
      img: SubsetedUsers_blue,
    },
  ];

  const Weblinks = [
    { id: 1, name: "خانه", link: "/", img: home },
    { id: 2, name: "تخصص", link: "/Specialties", img: Special },
    {
      id: 3,
      name: "مراکز درمانی",
      link: "/medical-centers",
      img: medicalCenter,
    },
    { id: 9, name: "دکتر ها", link: "/doctors", img: doctorLogin },
    { id: 4, name: "دندانپزشکی", link: "/dentistry", img: dentistry },
    { id: 5, name: "روانپزشک", link: "/psychiatry", img: psychiatry },
    {
      id: 6,
      name: "مجله درمانی",
      link: "/healthMagezine",
      img: healthMagezine,
    },
    {
      id: 7,
      name: "ورود مرکز درمانی",
      link: "/medicalCentersLogin",
      img: medicalCentersLogin,
    },
    { id: 8, name: "ورود پزشک", link: "/doctor-login", img: doctorLogin },
  ];

  const handleMenuLinks = () => (isUserPanel ? UserPanelLinks : Weblinks);

  const handleMenuPic = () =>
    isUserPanel ? (
      <div className="flex flex-col justify-center items-center">
        <IoPerson className="w-[46px] h-[46px] p-3 rounded-full text-[#005DAD] bg-[#DBEDFF]" />
        <h2 className="text-lg">
          {fullName === "string" ? "کاربر مهمان" : fullName}
        </h2>
      </div>
    ) : (
      <img src={logo} alt="logo" width={75} />
    );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col overflow-auto pb-20 items-center p-5 h-full w-2/3 bg-white"
    >
      {handleMenuPic()}

      {handleMenuLinks().map((item) => (
        <Link
          to={item.link}
          key={item.id}
          className="py-4 last:border-none border-b w-full flex justify-between items-center"
        >
          <div className="flex justify-center items-center gap-2">
            <img src={item.img} alt="img" width={24} />
            <h2>{item.name}</h2>
          </div>
          <IoIosArrowBack />
        </Link>
      ))}

      {/* Logout */}
      <Link
        to="/" // href → to
        onClick={() => {
          setFullName("");
          setToken("");
        }}
        className="py-4 last:border-none border-b w-full flex justify-between items-center"
      >
        <div className="text-red-600 flex justify-center items-center gap-2">
          <CiLogout className="text-2xl" />
          <h2>خروج</h2>
        </div>
      </Link>
    </div>
  );
}

export default BurgerMenu;
