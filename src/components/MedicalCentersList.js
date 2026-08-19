"use client";
import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import {
  delete_clinic,
  delete_office,
  get_clinics,
  get_offices,
} from "../api/ApiCalling";

import { Pagination } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeletingModal from "./modals/DeletingModal";
import excel_icon from "../assets/Pics/excelIcon.png";
import printer from "../assets/Pics/printer.png";
import DatePickerComponent from "../components/DatePickerComponent";
import { SelectFilter } from "../components/Inputs/Input";
import { AddMedicalCenterButt } from "../components/Buttons/Button";
import SeeReservsModal from "./modals/SeeReservsModal";
import medicalProf from "../assets/Pics/medicalcenters.jpg";
import MedicalFormModal from "./modals/MedicalFormModal";
import MedicalDetails from "./modals/MedicalDetails";
import LoadingComponent from "./LoadingComponent";
import AssignDoctorToCenterModal from "./modals/AssignDoctorToCenterModal";

function MedicalCentersList({ type }) {
  const [isLoading, setIsLoading] = useState(true);
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [isMedicalCenterForm, setIsMedicalCenterForm] = useState(false);
  const [isSeeReservsModal, setIsSeeReservsModal] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState({});
  const [isEditMedical, setIsEditMedical] = useState(false);
  console.log(medicalCenters);
  const getMedicalCenters = async () => {
    const data = await get_clinics();
    if (data) {
      console.log(data);
      setMedicalCenters(data);
      setIsLoading(false);
    }
  };
  const getOffices = async () => {
    const data = await get_offices();
    if (data) {
      console.log(data);
      setMedicalCenters(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (type == "office") {
      getOffices();
    } else {
      getMedicalCenters();
    }
  }, [isMedicalCenterForm, isEditMedical]);

  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [IsSeeMedicalDetails, setIsSeeMedicalDetails] = useState(false);
  const [isAssignDoctorModal, setIsAssignDoctorModal] = useState(false);
  console.log(selectedItem);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const itemsPerPage = 10;
  const totalPages = Math.ceil(medicalCenters.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medicalCenters.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
      <div className=" flex w-[80%]  gap-5 items-center">
        {isLoading && <LoadingComponent />}
        {IsSeeMedicalDetails && (
          <MedicalDetails
            closeModal={() => setIsSeeMedicalDetails(false)}
            selectedItem={selectedItem}
          />
        )}
        {isEditMedical && (
          <MedicalFormModal
            selectedMedical={selectedMedical}
            closeModal={() => setIsEditMedical(false)}
          />
        )}
        {isSeeReservsModal && (
          <SeeReservsModal
            closeModal={() => setIsSeeReservsModal(false)}
            selectedMedical={selectedMedical}
          />
        )}
        {isAssignDoctorModal && (
          <AssignDoctorToCenterModal
            center={selectedItem}
            type={type}
            closeModal={() => setIsAssignDoctorModal(false)}
          />
        )}
        {/* <DatePickerComponent title="از تاریخ" />
        <DatePickerComponent title="تا تاریخ" /> */}
        {/* <SelectFilter title="نظر" />
        <SelectFilter title="نوع ویزیت" />
        <SelectFilter title="محل ویزیت" />
        <SelectFilter title="ساعت" /> */}
      </div>
      <div className=" gap-1 flex-col flex items-end w-[80%] justify-end">
        <AddMedicalCenterButt
          isOffice={type == "office" ? true : false}
          isMedicalCenterForm={isMedicalCenterForm}
          setIsMedicalCenterForm={setIsMedicalCenterForm}
        />
        <div className=" gap-2 flex justify-end w-[80%] items-center">
          <button className=" border rounded-lg px-3 p-1 gap-2 text-[#185B37] border-[#185B37] flex">
            <img src={excel_icon} alt=" icon" width={24} />
            خروجی اکسل
          </button>
          <button className=" border rounded-lg px-3 p-1 gap-2 text-[#3F444D] border-[#3F444D] flex">
            <img src={printer} alt=" icon" width={24} />
            چاپ اطلاعات{" "}
          </button>
        </div>
      </div>
      <div className=" gap-3 flex flex-col w-[80%] rounded-lg border shadow-md p-4 bg-white">
        {isDeletingModal && (
          <DeletingModal
            // delete_office(id, setList, closeModal) اما delete_clinic(id, setList, closeModal, setIsLoading)
            // پس هر دو را با امضای یکسان صدا می‌زنیم
            DeletingFn={(id, setList, closeModal, setIsLoading) =>
              type == "office"
                ? delete_office(id, setList, closeModal)
                : delete_clinic(id, setList, closeModal, setIsLoading)
            }
            id={selectedItem.id}
            name={
              type == "office" ? selectedItem.name : selectedItem.clinicName
            }
            setList={setMedicalCenters}
            closeModal={() => setIsDeletingModal(false)}
          />
        )}
        <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
          <span className="w-[5%]" />
          <h4 className=" primary w-[14%] flex justify-center items-center text-[#3F444D] ">
            {type == "office" ? "مطب" : "مراکز درمانی"}

            <TiArrowSortedDown />
          </h4>

          <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] ">
            {type == "office" ? "نام مطب" : "نام مرکز "}
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] ">
            {type == "office" ? "کد پستی" : "کد سیام"}

            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[14%] font-medium flex justify-center items-center text-[#3F444D]">
            {type == "office" ? "تعداد پزشکان مطب" : "تعداد پزشکان مرکز"}

            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D]">
            {type == "office" ? "نوع مطب" : "نوع مرکز"}

            <TiArrowSortedDown />
          </h4>
          <span className="w-[25%]" />
        </div>
        {currentItems.map((item) => {
          return (
            <div
              className=" border flex py-3 items-center rounded-lg bg-white shadow-md"
              key={item.id}
            >
              <div className=" flex w-[5%] justify-center items-center gap-1 text-lg">
                <MdDeleteForever
                  onClick={() => {
                    setSelectedItem(item);
                    setIsDeletingModal(true);
                  }}
                  className="  text-[#3F444D]  transition-all cursor-pointer hover:text-red-600"
                />
                <FaEdit
                  onClick={() => {
                    setIsEditMedical(true);
                    setSelectedMedical(item);
                  }}
                  className="  text-[#3F444D]  transition-all cursor-pointer hover:text-green-600"
                />
              </div>
              <div className=" w-[14%] flex justify-center items-center text-[#3F444D] ">
                <img
                  src={medicalProf}
                  alt="img"
                  width={67}
                  className=" rounded-full border border-[#005DAD]"
                />
              </div>
              <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] ">
                {type == "office" ? item.name : item.clinicName}
              </h4>
              <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] ">
                {type == "office" ? item.postalCode : item.siamCode}
              </h4>
              <h4 className=" text-[#005DAD] w-[14%] flex justify-center items-center ">
                {item.doctorsCount}
              </h4>
              <h4 className=" text-[#005DAD] w-[14%] flex justify-center items-center ">
                {type == "office" ? item.officeTypeName : item.clinicTypeName}

                {}
              </h4>
              <div className=" flex justify-center gap-2 items-center w-[25%]">
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setIsSeeMedicalDetails(true);
                  }}
                  className=" gap-2 border rounded-lg p-1 flex justify-center items-center bg-[#DBEDFF] border-[#005DAD] text-[#005DAD]"
                >
                  مشاهده جزئیات
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setIsAssignDoctorModal(true);
                  }}
                  className=" gap-2 border rounded-lg p-1 flex justify-center items-center bg-[#F2FEF8] border-[#1F7168] text-[#1F7168]"
                >
                  تخصیص پزشک
                </button>
                {/* <button
                  onClick={() => {
                    setSelectedMedical(item);
                    setIsSeeReservsModal(true);
                  }}
                  className=" gap-2 border rounded-lg  p-1 flex justify-center items-center bg-[#F2FEF8] border-[#1F7168] text-[#1F7168]"
                >
                  مشاهده نوبت ها
                </button> */}
              </div>
            </div>
          );
        })}
        <div className=" w-full flex justify-center items-center">
          <Pagination
          dir="ltr"
            onChange={handleChange}
            page={currentPage}
            count={totalPages}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default MedicalCentersList;
