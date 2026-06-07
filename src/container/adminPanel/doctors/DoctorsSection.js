import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TiArrowSortedDown } from "react-icons/ti";

import { search_doctors_list } from "../../../api/ApiCalling";
import LoadingComponent from "../../../components/LoadingComponent";
import DoctorsPagination from "./DoctorsPagination";
import { AddDoctorButt } from "../../../components/Buttons/Button";
import excel_icon from "../../../assets/Pics/excelIcon.png";
import { SpecialtiesSelectInput } from "../../../components/Inputs/Input";
import AddNewDoctorModal from "../../../components/modals/AddNewDoctorModal";

function DoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [specialistId, setSpecialistId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAddDoctorModal, setIsAddDoctorModal] = useState(false);
  const [doctorItems, setDoctorItems] = useState({});

  const handleSearchDoctors = async (name) => {
    setSearchName(name);
    setCurrentPage(1);
  };

  const getDoctors = async (
    customSearchName = searchName,
    customPage = currentPage,
    customSpecialistId = specialistId
  ) => {
    setIsLoading(true);

    const data = await search_doctors_list(
      customSearchName,
      customPage,
      customSpecialistId
    );

    if (data) {
      setDoctors(data.list || []);
      const total = Math.ceil((data.totalRecords || 0) / 10);
      setTotalPages(total);
    } else {
      setDoctors([]);
      setTotalPages(0);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getDoctors();
  }, [currentPage, specialistId, searchName]);

  return (
    <div className="mt-20 w-full flex flex-col items-center px-4">
      {isAddDoctorModal && (
        <AddNewDoctorModal
          doctorItems={doctorItems}
          setIsAddDoctorModal={setIsAddDoctorModal}
          onSuccess={() => {
            setIsAddDoctorModal(false);
            getDoctors();
          }}
        />
      )}

      {/* search + filter */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <CiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />

          <input
            onChange={(e) => handleSearchDoctors(e.target.value)}
            placeholder="جستجو در نام پزشک..."
            className="w-full bg-white border border-gray-300 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] rounded-xl py-3 pr-12 pl-4 text-sm outline-none transition-all"
          />
        </div>

        <div className="w-full lg:w-72">
          <SpecialtiesSelectInput
            all
            specialistId={specialistId}
            setSpecialistId={setSpecialistId}
            hiddenTitle
          />
        </div>
      </div>

      {/* buttons */}
      <div className="w-full max-w-7xl flex justify-end gap-4 mb-6">
        <button className="flex items-center gap-2 border border-[#185B37] text-[#185B37] hover:bg-[#f0f9f4] px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <img src={excel_icon} alt="اکسل" width={22} />
          خروجی اکسل
        </button>

        <AddDoctorButt
          setDoctorItems={setDoctorItems}
          setIsAddDoctorModal={setIsAddDoctorModal}
        />
      </div>

      {/* table */}
      <div className="w-full max-w-7xl bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-12 bg-[#F8F9FA] py-4 px-4 border-b text-sm text-[#3F444D] font-medium">
          <div className="col-span-1" />

          <div className="col-span-1 flex items-center justify-center gap-1">
            نام پزشک
            <TiArrowSortedDown />
          </div>

          <div className="col-span-2 flex items-center justify-center gap-1">
            مرکز درمانی
            <TiArrowSortedDown />
          </div>

          <div className="col-span-2 flex items-center justify-center gap-1">
            کد نظام
            <TiArrowSortedDown />
          </div>

          <div className="col-span-2 flex items-center justify-center gap-1">
            کد ملی
            <TiArrowSortedDown />
          </div>

          <div className="col-span-3 flex items-center justify-center gap-1">
            اقدامات
            <TiArrowSortedDown />
          </div>
        </div>

        {isLoading && <LoadingComponent />}

        <DoctorsPagination
          doctors={doctors}
          isLoading={isLoading}
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
