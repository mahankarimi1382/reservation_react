import React, { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { CgSortAz } from "react-icons/cg";
import doctorprof from "../../assets/Pics/abbas.png";
import star from "../../assets/Pics/star.png";
import hospital from "../../assets/Pics/hospital.png";
import monitor from "../../assets/Pics/monitor-mobbile.png";
import { AiFillLike } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import LoadingComponent from "../../components/LoadingComponent";
import filterIcon from "../../assets/Pics/filter.png";
import doctorIcon from "../../assets/Pics/doctor-icon.jpg";

import {
  CitySelectButtSearchingDoctors,
  EmtyReservButt,
  MatabShowButt,
  SeeDoctorNazaratButt,
} from "../../components/Buttons/Button";

import { Link, useNavigate } from "react-router-dom";

import { Pagination, PaginationItem } from "@mui/material";

import { search_doctors } from "../../api/ApiCalling";
import { doctorProfileStore, myStore } from "../../store/Store";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import FilterDoctors from "./FilterDoctors";

function DoctorsPaginate() {
  const navigate = useNavigate();

  const { setDoctorId, setDoctorName } = doctorProfileStore();
  const {
    isSerchDoctorLoading,
    setIsSerchDoctorLoading,

    bimehTakmili,
    bimeAsli,
    justOnline,
    hasTurn,
    acceptInsurance,
    gender,
    sDate,
    eDate,
    onlineTypeId,
    officeOrClinicHozoori,
    specialistSearch,
    provinceId,
    cityId,

    currentPageDoctorSearch,
    setCurrentPageDoctorSearch,

    setFiltredBoxes,
    multiSpecialtiesBoxes,
  } = myStore();

  const [isFilterClickMobile, setIsFilterClickMobile] = useState(false);
  const [isDaste, setIsDaste] = useState(false);

  const [name, setName] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [doctors, setDoctors] = useState([]);

  const onlineTypeFn = (id) => {
    if (id == 2) return "تصویری";
    if (id == 3) return "تلفنی";
    if (id == 4) return "پیامرسان";
    if (id == 1) return "مطب ها";
  };

  let boxItems = [
    { id: 1, caption: bimeAsli, type: "bimeAsli" },
    { id: 2, caption: bimehTakmili, type: "bimeTakmili" },
    { id: 3, caption: onlineTypeFn(onlineTypeId), type: "onlineTypeId" },
    { id: 4, caption: gender, type: "gender" },
    { id: 5, caption: provinceId.label, type: "province" },
    { id: 6, caption: cityId.label, type: "city" },
    { id: 7, caption: justOnline && "فقط پزشکان آنلاین", type: "justOnline" },
    {
      id: 8,
      caption: acceptInsurance && "فقط پزشکانی که بیمه قبول میکنند",
      type: "acceptInsurance",
    },
  ];

  const pagesize = 6;

  const handleSearchDoctors = (value) => {
    if (value.length >= 2) {
      setIsSerchDoctorLoading(true);
      getDoctors(value);
      setName(value);
      setCurrentPageDoctorSearch(1);
    } else if (value.length === 0) {
      setIsSerchDoctorLoading(true);
      getDoctors("");
      setName("");
      setCurrentPageDoctorSearch(1);
    }
  };

  const handleFiltredBoxes = () => {
    setFiltredBoxes(boxItems);
  };

  const genderFn = (gender) => {
    if (gender === "آقایان") return true;
    if (gender === "خانم ها") return false;
    return "";
  };

  const getDoctors = async (name) => {
    let data = {
      name: name || "",
      pagesize,
      currentPage: currentPageDoctorSearch || "",
      specialistId: specialistSearch || "",
      provinceId: provinceId.id || "",
      cityId: cityId.id || "",
      BimehTakmili: bimehTakmili || "",
      BimeAsli: bimeAsli || "",
      JustOnline: justOnline || "",
      HasTurn: hasTurn || "",
      AcceptInsurance: acceptInsurance || "",
      Gender: genderFn(gender) || "",
      Sdate: sDate || "",
      Edate: eDate || "",
      OnlineTypeId: onlineTypeId || "",
      OfficeOrClinicHozoori: officeOrClinicHozoori || "",
    };

    const result = await search_doctors(data);

    if (result) {
      setDoctors(result.list);
      setIsSerchDoctorLoading(false);
      handleFiltredBoxes();

      const totalpages = Math.ceil(result.totalRecords / pagesize);
      setTotalPages(totalpages);
    }
  };

  useEffect(() => {
    setIsSerchDoctorLoading(true);
    getDoctors(name);
  }, [
    currentPageDoctorSearch,
    specialistSearch,
    bimehTakmili,
    bimeAsli,
    justOnline,
    hasTurn,
    acceptInsurance,
    gender,
    sDate,
    eDate,
    onlineTypeId,
    officeOrClinicHozoori,
    provinceId,
    cityId,
  ]);

  const handleChange = (event, value) => {
    setCurrentPageDoctorSearch(value);
  };

  const ShowDaste = () => {
    setIsDaste(!isDaste);
  };

  const imgFN = (img) => {
    if (img === "string") return doctorIcon;
    return img;
  };

  const toPersianDigits = (str) =>
    str.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);

  return !isFilterClickMobile ? (
    <div className="lg:w-[900px] px-2 lg:px-0 w-[97%] flex flex-col items-center justify-center gap-2 lg:gap-10">
      <div className="w-[100%]">
        <div className="rounded-2xl lg:px-3 px-1 items-center justify-center lg:text-base text-[sm] lg:gap-1 flex h-[40px] lg:h-[73px] w-full bg-white">
          <CiSearch className="text-[#919191] text-xl lg:text-3xl" />

          <input
            onChange={(e) => handleSearchDoctors(e.target.value)}
            className="text-xs lg:text-sm outline-none h-full w-[80%]"
            placeholder="جستجو پزشک،درمانگر،کلینیک..."
          />

          <CitySelectButtSearchingDoctors />
        </div>
      </div>

      <div className="w-full flex gap-2 items-center justify-start">
        <h2
          onClick={() => setIsFilterClickMobile(true)}
          className="lg:hidden flex items-center gap-2 text-[12px]"
        >
          <img width={20} src={filterIcon} alt="icon" />
          فیلتر کردن
        </h2>

        <h2 onClick={ShowDaste} className="flex lg:hidden items-center text-[12px]">
          <CgSortAz className="text-lg xl:text-3xl" />
          دسته بندی
        </h2>
      </div>

      {isDaste && (
        <div className="flex lg:hidden w-full xl:gap-10 lg:gap-5 justify-between xl:text-base text-[9px] lg:text-sm px-3 xl:px-10 bg-white rounded-2xl h-11 lg:h-[62px]">
          <button className="text-[#858585]">پیشفرض</button>
          <button className="text-[#858585]">محبوب ترین ها</button>
          <button className="text-[#858585]">نزدیک ترین نوبت</button>
          <button className="text-[#858585]">کم ترین معطلی در مطب</button>
        </div>
      )}

      <div className="hidden lg:flex w-full xl:gap-10 lg:gap-5 justify-between xl:text-base text-[9px] lg:text-sm px-3 xl:px-10 bg-white rounded-2xl h-11 lg:h-[62px]">
        <h2 className="hidden lg:flex items-center text-[20px]">
          <CgSortAz className="xl:text-3xl" />
          دسته بندی :
        </h2>

        <button className="text-[#858585]">پیشفرض</button>
        <button className="text-[#858585]">محبوب ترین ها</button>
        <button className="text-[#858585]">نزدیک ترین نوبت</button>
        <button className="text-[#858585]">کم ترین معطلی در مطب</button>
      </div>

      <div className="w-full flex flex-col gap-2 lg:gap-10">
        {isSerchDoctorLoading && <LoadingComponent />}

        {doctors.length !== 0
          ? doctors.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl xl:px-10 px-2 lg:px-5 lg:gap-6 gap-2 flex flex-col w-full bg-white text-xs lg:text-base pb-2 lg:min-h-[400px]"
              >
                <div className="flex justify-between lg:items-center items-start border-[#CBCBCB] border-b py-3 lg:py-7">
                  <div className="lg:w-1/2 flex items-start lg:items-center justify-start gap-2 lg:gap-5">
                    <img
                      onClick={() => {
                        setDoctorName(item.doctorName + " " + item.doctorFamily);
                        setDoctorId(item.id);
                        navigate("/doctors/doctor-profile");
                      }}
                      width={90}
                      height={90}
                      className="w-[60px] h-[60px] lg:w-[90px] lg:h-[90px] object-cover object-center cursor-pointer border-2 border-[#005DAD] rounded-full"
                      src={imgFN(item.docInstaLink)}
                      alt="doctor-prof"
                    />

                    <div className="flex flex-col gap-2 lg:gap-5">
                      <h2
                        onClick={() => {
                          setDoctorName(item.doctorName + " " + item.doctorFamily);
                          setDoctorId(item.id);
                          navigate("/doctors/doctor-profile");
                        }}
                        className="cursor-pointer text-sm lg:text-[22px]"
                      >
                        {item.doctorName} {item.doctorFamily}
                      </h2>

                      <h2 className="text-[12px] lg:text-base text-[#757575]">
                        {item.specialist}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col items-end lg:items-start justify-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <img
                          key={index}
                          width={22}
                          className="w-[15px] lg:w-[22px]"
                          alt=""
                          src={star}
                        />
                      ))}
                    </div>

                    <h2 className="rounded flex text-xs lg:text-base items-center justify-center gap-1 text-[#1F7168]">
                      <AiFillLike className="lg:text-lg" />
                      {item.recomend}
                    </h2>

                    <SeeDoctorNazaratButt />
                  </div>
                </div>

                <h2 className="text-sm lg:text-lg">
                  خدمات :
                  <span className="text-[#7E7E7E]">{item.skills}</span>
                </h2>

                <div className="text-xs gap-1 flex lg:gap-5 lg:text-lg">
                  <h2>روش نوبت دهی:</h2>

                  <h2 className="flex gap-1 lg:gap-2">
                    <img
                      className="lg:w-[24px] w-[20px]"
                      width={24}
                      src={monitor}
                      alt="monitor-icon"
                    />
                    ویزیت آنلاین
                  </h2>

                  <h2 className="flex gap-1 lg:gap-2">
                    <img
                      width={24}
                      className="lg:w-[24px] w-[20px]"
                      src={hospital}
                      alt="hospital-icon"
                    />
                    ویزیت حضوری
                  </h2>
                </div>

                <div className="w-full flex">
                  <MatabShowButt items={item.doctorTreatmentCenterList} />
                </div>

                <div className="mt-5 lg:-mt-3 flex justify-between">
                  <EmtyReservButt docDetail={item} />

                  <Link
                    to={`doctors/${item.doctorName + " " + item.doctorFamily}`}
                    className="text-white flex rounded-xl lg:text-base text-sm justify-center items-center bg-[#005DAD] p-1 lg:p-2"
                  >
                    نوبت بگیرید
                    <IoIosArrowRoundBack className="text-2xl" />
                  </Link>
                </div>
              </div>
            ))
          : !isSerchDoctorLoading && "نتیجه ای یافت نشد"}

        <Pagination
          size="small"
          onChange={handleChange}
          page={currentPageDoctorSearch}
          count={totalPages}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: FaArrowRight, next: FaArrowLeft }}
              {...item}
              page={item.page ? toPersianDigits(item.page) : item.page}
            />
          )}
        />
      </div>
    </div>
  ) : (
    <FilterDoctors hidden={false} setIsFilterClickMobile={setIsFilterClickMobile} />
  );
}

export default DoctorsPaginate;
