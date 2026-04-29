import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminPanelMenu from "../../../container/adminPanel/AdminPanelMenu";
import { CiSearch } from "react-icons/ci";

import DoctorProfIcon from "../../../assets/Pics/doctor-profile-icon.png";
import Doctor from "../../../assets/Pics/AdminDashboard-icons/miniDoctorAvatar.png";
import patient from "../../../assets/Pics/AdminDashboard-icons/patientAvatar.png";
import select from "../../../assets/Pics/AdminDashboard-icons/select-all 1.png";
import people from "../../../assets/Pics/AdminDashboard-icons/peopleAvatar.png";

import IncomeAdminChart from "../../../container/adminPanel/dashBoard/IncomeAdminChart";
import TurnStatusChart from "../../../container/adminPanel/dashBoard/TurnStatusChart";

import {
  fullNameStorage,
  smeIdStorage,
  userProfileStore,
} from "../../../store/Store";

import Cookies from "js-cookie";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";

function Page() {
  const navigate = useNavigate();

  const { fullName, setFullName } = fullNameStorage();
  const { setPhoneNum } = userProfileStore();
  const { removeSmeId } = smeIdStorage();

  const HandleCaptionColor = (id) => {
    switch (id) {
      case 1:
        return "text-[#8A8A8A]";
      case 2:
        return "text-[#36B7FF]";
      case 3:
        return "text-[#FFCB5A]";
      case 4:
        return "text-[#66C6B9]";
      default:
        return "text-[#8A8A8A]";
    }
  };

  const cards = [
    {
      id: 1,
      title: "تعداد مراجعین",
      caption: "500 مراجعه کننده",
      icon: people,
    },
    { id: 2, title: "تعداد پزشکان", caption: "320 پزشک", icon: Doctor },
    { id: 3, title: "تعداد بیماران", caption: "320 بیمار", icon: patient },
    { id: 4, title: "آمار", caption: "350,000,000 تومان", icon: select },
  ];

  // Dropdown state
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    if (!open) return;

    const onClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLogout = () => {
    setPhoneNum("");
    removeSmeId();
    Cookies.remove("token");
    setFullName(null);

    navigate("/");
  };

  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] min-h-screen">
      <AdminPanelMenu />

      <div className="mt-10 w-full flex flex-col gap-7 items-center">
        {/* Top bar */}
        <div className="flex justify-between items-center w-[80%]">
          {/* Search */}
          <label className="w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between items-center bg-white">
            <input className="w-full outline-none" placeholder="جستجو" />
            <CiSearch className="text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>

          {/* Profile dropdown */}
          <div className="relative" ref={btnRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex justify-center items-center p-2 border text-[#005DAD] gap-2 border-[#005DAD] rounded-xl bg-white hover:bg-[#F3F8FE] transition"
            >
              <img src={DoctorProfIcon} width={24} alt="profile icon" />
              {fullName}
              <IoIosArrowDown
                className={`text-xl transition ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {open && (
              <div
                ref={menuRef}
                role="menu"
                className="absolute left-0 md:right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <button
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-red-600 hover:bg-red-50 px-4 py-2"
                >
                  <IoIosLogOut className="text-lg" /> خروج
                </button>
              </div>
            )}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="w-[80%] flex items-center justify-between flex-wrap gap-4">
          {cards.map((item) => (
            <div
              key={item.id}
              className="w-[225px] gap-2 h-[178px] bg-white rounded-xl shadow-lg flex items-center justify-center"
            >
              <img
                src={item.icon}
                alt="icon"
                width={item.id === 1 || item.id === 4 ? 94 : 88}
              />
              <div className="items-start flex flex-col justify-center gap-10">
                <h5 className="font-semibold">{item.title}</h5>
                <p className={HandleCaptionColor(item.id)}>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Income chart */}
        <div className="w-[80%] p-4 bg-white items-center rounded-lg shadow-md flex flex-col">
          <div className="w-full h-14 bg-[#E5E7E8] px-5 rounded-2xl flex items-center justify-between">
            <h5>درآمد</h5>
            <select className="bg-[#E5E7E8] p-2 px-4 rounded-lg border border-[#818181]">
              <option>این ماه</option>
            </select>
          </div>
          <IncomeAdminChart />
        </div>

        {/* Turn status chart */}
        <div className="mb-5 w-[80%] p-4 bg-white items-center rounded-lg shadow-md flex flex-col">
          <div className="w-full h-14 bg-[#E5E7E8] px-5 rounded-2xl flex items-center justify-between">
            <h5>وضعیت نوبت</h5>
            <select className="bg-[#E5E7E8] p-2 px-4 rounded-lg border border-[#818181]">
              <option>1403</option>
            </select>
          </div>
          <TurnStatusChart />
        </div>
      </div>
    </div>
  );
}

export default Page;
