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
import { axiosConfig } from "../../../api/axiosConfig";

import Cookies from "js-cookie";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";

const pickList = (result) => {
  if (Array.isArray(result)) return result;
  if (result && Array.isArray(result.list)) return result.list;
  return [];
};

// گروه‌بندی نوبت‌ها بر اساس ماه شمسی (کلید: 1405/06)
const groupByJalaliMonth = (reservations, priceMap) => {
  const counts = {};
  const incomes = {};
  (reservations || []).forEach((r) => {
    const d = String(r?.reservation?.reservationDate ?? "");
    if (d.length !== 8) return;
    const key = `${d.slice(0, 4)}/${d.slice(4, 6)}`;
    counts[key] = (counts[key] || 0) + 1;
    const price = Number(priceMap?.[r?.reservation?.visitCostId] ?? 0);
    incomes[key] = (incomes[key] || 0) + price;
  });
  return { counts, incomes };
};

function Page() {
  const navigate = useNavigate();

  const { fullName, setFullName } = fullNameStorage();
  const { setPhoneNum } = userProfileStore();
  const { removeSmeId } = smeIdStorage();

  // ── داده‌های واقعی داشبورد ──────────────────────────────
  const [stats, setStats] = useState({
    doctors: null,
    patients: null,
    turns: null,
    centers: null,
  });
  const [chartData, setChartData] = useState({ counts: {}, incomes: {} });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [doctorsRes, patientsRes, turnsRes, centersRes, costsRes] =
          await Promise.allSettled([
            axiosConfig.get("Doctor/search-list-doctors?pagesize=1&pageNumber=1", { silent: true }),
            axiosConfig.get("Patient/read-all-patients", { silent: true }),
            axiosConfig.get("PatientReservation/read-all-patientreservations", { silent: true }),
            axiosConfig.get("Clinic/read-Clinics", { silent: true }),
            axiosConfig.get("Reservation/read-all-visitcosts", { silent: true }),
          ]);

        if (!isMounted) return;

        const doctorsTotal =
          doctorsRes.status === "fulfilled"
            ? doctorsRes.value?.data?.result?.totalRecords ?? null
            : null;
        const patientsList =
          patientsRes.status === "fulfilled"
            ? pickList(patientsRes.value?.data?.result)
            : [];
        const turnsList =
          turnsRes.status === "fulfilled"
            ? pickList(turnsRes.value?.data?.result)
            : [];
        const centersList =
          centersRes.status === "fulfilled"
            ? pickList(centersRes.value?.data?.result)
            : [];
        const costsList =
          costsRes.status === "fulfilled"
            ? pickList(costsRes.value?.data?.result)
            : [];

        // نقشه‌ی قیمت ویزیت برای محاسبه‌ی درآمد واقعی نوبت‌های ثبت‌شده
        const priceMap = {};
        (costsList || []).forEach((c) => {
          if (c?.id != null) priceMap[c.id] = Number(c.price) || 0;
        });

        setStats({
          doctors: doctorsTotal,
          patients: patientsList.length,
          turns: turnsList.length,
          centers: centersList.length,
        });
        setChartData(groupByJalaliMonth(turnsList, priceMap));
      } catch (err) {
        console.log("dashboard data error:", err?.message);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const faNum = (n) =>
    n === null || n === undefined ? "..." : Number(n).toLocaleString("fa-IR");

  const cards = [
    { id: 1, title: "تعداد پزشکان", caption: `${faNum(stats.doctors)} پزشک`, icon: Doctor },
    { id: 2, title: "تعداد بیماران", caption: `${faNum(stats.patients)} بیمار`, icon: patient },
    { id: 3, title: "نوبت‌های ثبت‌شده", caption: `${faNum(stats.turns)} نوبت`, icon: people },
    { id: 4, title: "مراکز درمانی", caption: `${faNum(stats.centers)} مرکز`, icon: select },
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
              {fullName || "ادمین"}
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

        {/* KPI Cards — داده‌های واقعی از API */}
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
                <p className="text-[#005DAD] font-medium">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Income chart — درآمد واقعی محاسبه‌شده از نوبت‌ها و تعرفه‌ها */}
        <div className="w-[80%] p-4 bg-white items-center rounded-lg shadow-md flex flex-col overflow-x-auto">
          <div className="w-full h-14 bg-[#E5E7E8] px-5 rounded-2xl flex items-center justify-between">
            <h5>درآمد (بر اساس نوبت‌های ثبت‌شده)</h5>
          </div>
          <IncomeAdminChart monthlyIncomes={chartData.incomes} />
        </div>

        {/* Turn status chart — توزیع واقعی نوبت‌ها بر اساس ماه */}
        <div className="mb-5 w-[80%] p-4 bg-white items-center rounded-lg shadow-md flex flex-col overflow-x-auto">
          <div className="w-full h-14 bg-[#E5E7E8] px-5 rounded-2xl flex items-center justify-between">
            <h5>وضعیت نوبت (تعداد نوبت در ماه)</h5>
          </div>
          <TurnStatusChart monthlyCounts={chartData.counts} />
        </div>
      </div>
    </div>
  );
}

export default Page;
