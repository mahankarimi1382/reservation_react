import React, { useEffect, useState, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { CgSortAz } from "react-icons/cg";
import { AiFillLike } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

// Assets
import starIcon from "../../assets/Pics/star.png";
import hospitalIcon from "../../assets/Pics/hospital.png";
import monitorIcon from "../../assets/Pics/monitor-mobbile.png";
import filterIcon from "../../assets/Pics/filter.png";
import doctorDefaultIcon from "../../assets/Pics/doctor-icon.jpg";

// Components & API
import LoadingComponent from "../../components/LoadingComponent";
import FilterDoctors from "./FilterDoctors";
import {
  CitySelectButtSearchingDoctors,
  EmtyReservButt,
  MatabShowButt,
  SeeDoctorNazaratButt,
} from "../../components/Buttons/Button";
import { search_doctors } from "../../api/ApiCalling";
import { doctorProfileStore, myStore } from "../../store/Store";

const DoctorsPaginate = () => {
  const navigate = useNavigate();
  const { setDoctorId, setDoctorName } = doctorProfileStore();
  const store = myStore();

  const [isFilterClickMobile, setIsFilterClickMobile] = useState(false);
  const [isDasteOpen, setIsDasteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [doctors, setDoctors] = useState([]);

  const pageSize = 6;

  // تبدیل اعداد به فارسی برای Pagination
  const toPersianDigits = (n) => n?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  const getDoctors = async (nameVal) => {
    store.setIsSerchDoctorLoading(true);
    const payload = {
      name: nameVal || "",
      pagesize: pageSize,
      currentPage: store.currentPageDoctorSearch || 1,
      specialistId: store.specialistSearch || "",
      provinceId: store.provinceId.id || "",
      cityId: store.cityId.id || "",
      BimehTakmili: store.bimehTakmili || "",
      BimeAsli: store.bimeAsli || "",
      JustOnline: store.justOnline || "",
      HasTurn: store.hasTurn || "",
      AcceptInsurance: store.acceptInsurance || "",
      Gender: store.gender === "آقایان" ? true : store.gender === "خانم ها" ? false : "",
      Sdate: store.sDate || "",
      Edate: store.eDate || "",
      OnlineTypeId: store.onlineTypeId || "",
      OfficeOrClinicHozoori: store.officeOrClinicHozoori || "",
    };

    try {
      const result = await search_doctors(payload);
      if (result) {
        setDoctors(result.list || []);
        setTotalPages(Math.ceil(result.totalRecords / pageSize));
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      store.setIsSerchDoctorLoading(false);
    }
  };

  useEffect(() => {
    getDoctors(searchTerm);
  }, [
    store.currentPageDoctorSearch,
    store.specialistSearch,
    store.bimehTakmili,
    store.bimeAsli,
    store.justOnline,
    store.hasTurn,
    store.acceptInsurance,
    store.gender,
    store.onlineTypeId,
    store.cityId,
  ]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.length >= 2 || val.length === 0) {
      store.setCurrentPageDoctorSearch(1);
      getDoctors(val);
    }
  };

  if (isFilterClickMobile) {
    return <FilterDoctors hidden={false} setIsFilterClickMobile={setIsFilterClickMobile} />;
  }

  return (
    <div className="w-full max-w-[950px] mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Search Bar Section */}
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-2 lg:p-3 flex items-center gap-3">
        <CiSearch className="text-gray-400 text-2xl lg:text-3xl" />
        <input
          onChange={handleSearch}
          className="flex-1 outline-none text-sm lg:text-base text-gray-700 bg-transparent"
          placeholder="جستجو پزشک، درمانگر، کلینیک..."
        />
        <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden lg:block" />
        <CitySelectButtSearchingDoctors />
      </div>

      {/* Mobile Quick Actions */}
      <div className="flex lg:hidden items-center justify-between px-1">
        <button
          onClick={() => setIsFilterClickMobile(true)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-xl border border-gray-100"
        >
          <img width={18} src={filterIcon} alt="filter" />
          فیلترها
        </button>
        <button
          onClick={() => setIsDasteOpen(!isDasteOpen)}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-xl border border-gray-100"
        >
          <CgSortAz className="text-2xl" />
          مرتب‌سازی
        </button>
      </div>

      {/* Sort Options (Desktop & Mobile Toggle) */}
      <div
        className={`${
          isDasteOpen ? "flex" : "hidden lg:flex"
        } w-full overflow-x-auto bg-white rounded-2xl p-2 lg:px-6 lg:h-16 items-center justify-between border border-gray-50 shadow-sm transition-all`}
      >
        <h3 className="hidden lg:flex items-center gap-2 font-bold text-gray-800 whitespace-nowrap">
          <CgSortAz className="text-3xl text-primary" />
          مرتب‌سازی:
        </h3>
        <div className="flex gap-4 lg:gap-8 overflow-x-auto no-scrollbar py-2">
          {["پیش‌فرض", "محبوب‌ترین‌ها", "نزدیک‌ترین نوبت", "کمترین معطلی"].map((label) => (
            <button
              key={label}
              className="whitespace-nowrap text-xs lg:text-sm text-gray-500 hover:text-[#005DAD] transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors List */}
      <div className="flex flex-col gap-6">
        {store.isSerchDoctorLoading ? (
          <LoadingComponent />
        ) : doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onNavigate={(id, name) => {
                setDoctorId(id);
                setDoctorName(name);
                navigate(
                  `/doctors/${encodeURIComponent(
                    `${doctor.doctorName ?? ""} ${doctor.doctorFamily ?? ""}`.trim()
                  )}`
                );
              }}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl text-gray-400">
            نتیجه‌ای یافت نشد.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={totalPages}
              page={store.currentPageDoctorSearch}
              onChange={(_, value) => store.setCurrentPageDoctorSearch(value)}
              color="primary"
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: FaArrowRight, next: FaArrowLeft }}
                  {...item}
                  page={toPersianDigits(item.page)}
                />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-Component for Doctor Card
const DoctorCard = ({ doctor, onNavigate }) => {
  const fullName = `${doctor.doctorName} ${doctor.doctorFamily}`;

  return (
    <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-sm border border-gray-50 hover:shadow-md transition-shadow flex flex-col gap-5">
      {/* Header Info */}
      <div className="flex justify-between items-start border-b border-gray-100 pb-5">
        <div className="flex gap-4 lg:gap-6 items-center">
          <img
            onClick={() => onNavigate(doctor.id, fullName)}
            src={doctor.docInstaLink !== "string" ? doctor.docInstaLink : doctorDefaultIcon}
            alt={fullName}
            className="w-16 h-16 lg:w-24 lg:h-24 rounded-full object-cover border-2 border-[#005DAD] p-0.5 cursor-pointer hover:scale-105 transition-transform"
          />
          <div className="flex flex-col gap-1 lg:gap-3">
            <h2
              onClick={() => onNavigate(doctor.id, fullName)}
              className="text-base lg:text-xl font-bold text-gray-800 cursor-pointer hover:text-[#005DAD]"
            >
              {fullName}
            </h2>
            <p className="text-xs lg:text-sm text-gray-500 font-medium">{doctor.specialist}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={starIcon} className="w-3 lg:w-4 opacity-80" alt="star" />
            ))}
          </div>
          <div className="flex items-center gap-1 text-[#1F7168] text-xs lg:text-sm font-bold bg-[#1f71680a] px-2 py-1 rounded-lg">
            <AiFillLike />
            {doctor.recomend} رضایت
          </div>
          <SeeDoctorNazaratButt />
        </div>
      </div>

      {/* Services & Methods */}
      <div className="flex flex-col gap-4">
        <p className="text-xs lg:text-sm leading-relaxed text-gray-600">
          <span className="font-bold text-gray-800 ml-2">خدمات:</span>
          {doctor.skills}
        </p>

        <div className="flex flex-wrap gap-4 text-xs lg:text-sm">
          <span className="text-gray-400">روش‌های نوبت‌دهی:</span>
          <div className="flex items-center gap-1.5 text-gray-700">
            <img src={monitorIcon} className="w-5" alt="online" /> ویزیت آنلاین
          </div>
          <div className="flex items-center gap-1.5 text-gray-700">
            <img src={hospitalIcon} className="w-5" alt="in-person" /> ویزیت حضوری
          </div>
        </div>
      </div>

      {/* Address / Clinics Section */}
      <div className="bg-gray-50 p-3 rounded-2xl">
        <MatabShowButt items={doctor.doctorTreatmentCenterList} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-gray-200">
        <EmtyReservButt docDetail={doctor} />
        <Link
          to={`/doctors/${fullName}`}
          className="bg-[#005DAD] text-white px-5 py-2.5 lg:px-8 rounded-xl text-sm lg:text-base font-bold flex items-center gap-2 hover:bg-[#004a8a] transition-colors shadow-lg shadow-blue-100"
        >
          نوبت بگیرید
          <IoIosArrowRoundBack className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorsPaginate;
