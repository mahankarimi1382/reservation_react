"use client";
import { delete_patient, get_patients } from "../../../api/ApiCalling";
import { AddPatinetButt } from "../../../components/Buttons/Button";
import DatePickerComponent from "../../../components/DatePickerComponent";
import { SelectFilter } from "../../../components/Inputs/Input";
import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import excel_icon from "../../../assets/Pics/excelIcon.png";
import { MdDeleteForever } from "react-icons/md";
function PatientsSection() {
  const [isAddPatient, setIsAddPatient] = useState(false);
  const [patients, setPatients] = useState([]);
  console.log(patients);
  useEffect(() => {
    const url = "Patient/read-all-patients";

    const fetchData = async () => {
      const data = await get_patients(url);
      if (data) {
        setPatients(data);
      }
    };
    fetchData();
  }, [isAddPatient]);
  return (
    <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
      {/* <div className=" flex w-[80%]  justify-center gap-5 items-center">
        <DatePickerComponent title="از تاریخ" />
        <DatePickerComponent title="تا تاریخ" />
        <SelectFilter title="نام پزشک" />
        <SelectFilter title="نام مرکز درمانی" />
        <SelectFilter title="تخصص" />
        <SelectFilter title="نوع ویزیت" />
      </div> */}
      <div className=" gap-2 flex justify-end w-[80%] items-center">
        <button className=" border rounded-lg px-3 p-1 gap-2 text-[#185B37] border-[#185B37] flex">
          <img src={excel_icon} alt=" icon" width={24} />
          خروجی اکسل
        </button>
        {/* <button className=" border rounded-lg px-3 p-1 gap-2 text-[#3F444D] border-[#3F444D] flex">
            <Image src={printer} alt=" icon" width={24} />
            چاپ اطلاعات{" "}
          </button> */}
        {/* <AddPatinetButt
          isAddPatient={isAddPatient}
          setIsAddPatient={setIsAddPatient}
        /> */}
      </div>
      <div className=" gap-3 flex flex-col w-[80%] rounded-lg border shadow-md p-4 bg-white">
        <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
          <h4 className=" w-[12%] flex justify-center  items-center text-[#3F444D] ">
            کدملی <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
            نام بیمار <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
            کد رهگیری <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
            پرداخت شده
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
            تاریخ ویزیت <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
            ساعت ویزیت <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D]">
            وضعیت <TiArrowSortedDown />
          </h4>
        </div>
        {/* <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
          <div className=" w-[10%]"></div>
          <h4 className=" w-[14%] flex justify-center  items-center text-[#3F444D] text-lg">
            نام پزشک
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
            نام بیمار
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
            زمان ویزیت
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
            کد ملی بیمار
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
            شماره همراه بیمار
            <TiArrowSortedDown />
          </h4>
        </div> */}
        {patients.map((item) => {
          return (
            <div
              className=" border flex py-3 rounded-lg bg-white shadow-md"
              key={item.id}
            >
              <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
                {item.nationalId}
              </h4>
              <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
                {item.patientName} {item.patientFamily}
              </h4>
              <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] "></h4>
              <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] "></h4>
              <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] "></h4>
              <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] "></h4>
              <h4 className=" text-green-600 w-[11%] flex justify-center items-center ">
                ثبت شده{" "}
              </h4>
              <button className=" text-sm w-[12%] bg-[#DBEDFF] text-[#005DAD] border border-[#005DAD] p-2 rounded-lg">
                مشاهده جزئیات
              </button>
            </div>

            // <div
            //   className=" border flex py-3 rounded-lg bg-white shadow-md"
            //   key={item.id}
            // >
            //   <div className=" w-[10%] flex justify-center items-center">
            //     <MdDeleteForever
            //       onClick={() => delete_patient(item.id, setPatients)}
            //       className="  text-[#3F444D]  transition-all cursor-pointer hover:text-red-600"
            //     />
            //   </div>
            //   <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg"></h4>
            //   <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
            //     {item.patientName} {item.patientFamily}
            //   </h4>
            //   <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg"></h4>
            //   <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
            //     {item.nationalId}
            //   </h4>
            //   <h4 className=" w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
            //     {item.patientPhone}
            //   </h4>
            //   <button className=" w-[14%] border border-[#005DAD] rounded-lg p-2 text-sm bg-[#DBEDFF] text-[#005DAD]">
            //     مشاهده جزئیات
            //   </button>
            // </div>
          );
        })}
      </div>
    </div>
  );
}

export default PatientsSection;
