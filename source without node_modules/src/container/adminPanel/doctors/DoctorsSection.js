"use client";
import {
  delete_doctor,
  get_doctors,
  search_doctors,
  search_doctors_list,
} from "../../../api/ApiCalling";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AddDoctorButt } from "../../../components/Buttons/Button";
import excel_icon from "../../../assets/Pics/excelIcon.png";

import { TiArrowSortedDown } from "react-icons/ti";
import {
  SelectFilter,
  SpecialtiesSelectInput,
} from "../../../components/Inputs/Input";
import DoctorsPagination from "./DoctorsPagination";
import SearchSpecialites from "../../../container/Doctors/SearchSpecialites";
import { CiSearch } from "react-icons/ci";
import LoadingComponent from "../../../components/LoadingComponent";
function DoctorsSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAddDoctorModal, setIsAddDoctorModal] = useState(false);
  const [doctorItems, setDoctorItems] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [specialistId, setSpecialistId] = useState("");
  console.log(specialistId);
  const getDoctors = async (name) => {
    const data = await search_doctors_list(name, currentPage, specialistId);
    if (data) {
      console.log(data);
      setDoctors(data.list);
      setIsLoading(false);

      let number = data.totalRecords / 10;
      let totalpages = Math.ceil(number);
      setTotalPages(totalpages);
    }
  };

  const handleSearchDoctors = async (name) => {
    if (name.length >= 2) {
      setIsLoading(true);
      getDoctors(name);
      setName(name);
      setCurrentPage(1);
    } else if (name.length == 0) {
      setIsLoading(true);
      getDoctors(name);
      setName(name);
      setName(name);
      setCurrentPage(1);
    }
  };

  console.log(doctorItems);
  useEffect(() => {
    getDoctors(name);
    setIsLoading(true);
  }, [currentPage, isAddDoctorModal, specialistId]);
  // useEffect(() => {
  //   const url = "Doctor/read-all-doctors";

  //   const fetchData = async () => {
  //     const data = await search_doctors();
  //     if (data) {
  //       setDoctors(data);
  //     }
  //   };
  //   fetchData();
  // }, [isAddDoctorModal]);
  return (
    <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
      <div className=" flex flex-col w-[80%] gap-4 ">
        <div className=" flex w-full gap-5 items-start ">
          <label className=" px-2  border-2 w-1/3 bg-white rounded-lg flex items-center">
            <CiSearch className=" text-2xl" />
            <input
              onChange={(e) => {
                let name = e.target.value;
                handleSearchDoctors(name);
              }}
              className=" outline-none w-full p-2 rounded-lg"
              placeholder="جستجو در دکتر ها "
            />
          </label>
          <div className="w-[20%]">
            <SpecialtiesSelectInput
              all
              specialistId={specialistId}
              setSpecialistId={setSpecialistId}
              hiddenTitle
            />
          </div>
        </div>
      </div>
      <div className=" gap-2 flex justify-end w-[80%] items-center">
        <button className=" border rounded-lg px-3 p-1 gap-2 text-[#185B37] border-[#185B37] flex">
          <img src={excel_icon} alt=" icon" width={24} />
          خروجی اکسل
        </button>
        {/* <button className=" border rounded-lg px-3 p-1 gap-2 text-[#3F444D] border-[#3F444D] flex">
        <Image src={printer} alt=" icon" width={24} />
        چاپ اطلاعات{" "}
      </button> */}
        <AddDoctorButt
          setDoctorItems={setDoctorItems}
          doctorItems={doctorItems}
          isAddDoctorModal={isAddDoctorModal}
          setIsAddDoctorModal={setIsAddDoctorModal}
        />
      </div>
      <div className=" relative gap-3 flex flex-col w-[85%] rounded-lg border shadow-md p-4 bg-white">
        {isLoading && <LoadingComponent />}

        <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
          <span className=" w-[5%]" />
          <h4 className=" w-[14%] flex justify-center  items-center text-[#3F444D] text-lg">
            نام پزشک
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
            نام مرکز درمانی
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
            کد نظام پزشکی
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
            کد ملی <TiArrowSortedDown />
          </h4>
        </div>
        <DoctorsPagination
          isLoading={isLoading}
          doctors={doctors}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setDoctorItems={setDoctorItems}
          setIsAddDoctorModal={setIsAddDoctorModal}
          setDoctors={setDoctors}
        />
      </div>
    </div>
  );
}

export default DoctorsSection;
