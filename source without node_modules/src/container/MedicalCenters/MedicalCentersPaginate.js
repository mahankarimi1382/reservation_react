"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import AllMedicalCenters from "./AllMedicalCenters";
import { Filtering_MedicalCenters_Store } from "../../store/Store";
import { search_DoctorTreatmentCenters } from "../../api/ApiCalling";
import LoadingComponent from "../../components/LoadingComponent";
import FilterMedicalCenters from "./FilterMedicalCenters";
import { CgSortAz } from "react-icons/cg";
import filterIcon from "../../assets/Pics/filter.png";

function MedicalCentersPaginate() {
  const [isFilterClickMobile, setIsFilterClickMobile] = useState(false);

  const {
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
    provinceID,
    cityID,
    setCurrentPageMedicalSearch,
    currentPageMedicalSearch,
    setFiltredBoxes,
    multiSpecialtiesBoxes,
    isSerchMedicalLoading,
    setIsSerchMedicalLoading,
  } = Filtering_MedicalCenters_Store();

  const pagesize = 6;
  const genderFn = (gender) => {
    if (gender == "آقایان") {
      return true;
    } else if (gender == "خانم ها") {
      return false;
    } else {
      return "";
    }
  };
  const [name, setName] = useState("");
  const [medicals, setMedicals] = useState([]);
  const [totalPages, setTotalPages] = useState("");

  const getMedicalCenters = async (name) => {
    let data = {
      name: name || "",
      pagesize: pagesize,
      currentPage: currentPageMedicalSearch || "",
      specialistId: specialistSearch || "",
      provinceId: provinceID || "",
      cityId: cityID || "",
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
    const result = await search_DoctorTreatmentCenters(data);
    if (result) {
      console.log(result);
      setMedicals(result.list);
      setIsSerchMedicalLoading(false);

      let number = result.totalRecords / pagesize;
      let totalpages = Math.ceil(number);
      setTotalPages(totalpages);
    }
  };
  useEffect(() => {
    getMedicalCenters(name);
    setIsSerchMedicalLoading(true);
  }, [
    currentPageMedicalSearch,
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
    provinceID,
    cityID,
  ]);
  const handleSearchMedicals = (name) => {
    if (name.length >= 2) {
      setIsSerchMedicalLoading(true);
      getMedicalCenters(name);
      setName(name);
      setCurrentPageMedicalSearch(1);
    } else if (name.length == 0) {
      setIsSerchMedicalLoading(true);
      getMedicalCenters("");
      setName(name);
      setName(name);
      setCurrentPageMedicalSearch(1);
    }
  };
  
  return !isFilterClickMobile ? (
    <div className=" w-[810px] flex flex-col items-center justify-center gap-2 lg:gap-5">
      {isSerchMedicalLoading && <LoadingComponent />}
      <div className="  w-[100%] ">
        <div className=" rounded-2xl flex h-[40px] mt-5 lg:mt-0 lg:h-[73px] items-center px-5 w-[90%] mx-auto lg:mx-0 lg:w-[100%] bg-white ">
          <h2 className=" text-[#919191B5] outline-none">
            لیست تمام مراکز درمانی ایران
          </h2>
        </div>
      </div>
      <div className=" rounded-2xl px-3 h-[40px]   items-center lg:gap-1 flex lg:h-[62px] w-[90%] lg:w-[100%] bg-white ">
        <CiSearch className=" text-[#919191] text-3xl" />

        <input
          onChange={(e) => handleSearchMedicals(e.target.value)}
          className=" w-full  text-sm outline-none h-full"
          placeholder="جستجو در مراکز درمانی....."
        />
      </div>
      <div className=" lg:w-full w-[90%] flex gap-2 items-center justify-start">
        <h2
          onClick={() => setIsFilterClickMobile(true)}
          className=" lg:hidden flex items-center gap-2 text-[12px]"
        >
          <img width={20} src={filterIcon} alt="icon" />
          فیلتر کردن
        </h2>

      </div>
      <AllMedicalCenters
        totalPages={totalPages}
        medicals={medicals}
        isSerchMedicalLoading={isSerchMedicalLoading}
      />
    </div>
  ) : (
    <FilterMedicalCenters
      setIsFilterClickMobile={setIsFilterClickMobile}
      hidden={false}
    />
  );
}

export default MedicalCentersPaginate;
