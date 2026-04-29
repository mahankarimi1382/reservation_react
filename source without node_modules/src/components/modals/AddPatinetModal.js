"use client";
import ReservForAnother from "../../container/reservStepsToPay/ReservForAnother";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CitySelectInput, ProvinceSelectInput } from "../Inputs/Input";
import { smeIdStorage } from "../../store/Store";
import { add_patient } from "../../api/ApiCalling";
import { SyncLoader } from "react-spinners";

function AddPatinetModal({ setIsAddPatient }) {
  const daysOfMonth = Array.from({ length: 32 }, (_, i) => i + 1);
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientFamily, setPatientFamily] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [cityId, setCityId] = useState(1);
  const [patientPhone, setPatientPhone] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const { smeId } = smeIdStorage();
  console.log(smeId);
  const data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: smeId,
    },
    patientName,
    patientFamily,
    nationalId,
    birthNumber: 0,
    birthDate: `${yearOfBirth}/${monthOfBirth}/${dayOfBirth}`,
    cityId: cityId.id,
    geolat: 0,
    geolon: 0,
    patientPhone,
    necessaryPhone: patientPhone,
    email: "string",
    gender: true,
    smeProfileId: smeId,
  };
  return (
    <div className=" w-screen h-screen top-0 z-50 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className=" relative w-[50%] bg-white rounded-xl p-2 flex flex-col justify-center items-center">
        <RxCross2
          onClick={() => setIsAddPatient(false)}
          className=" cursor-pointer absolute top-2 left-2"
        />
        <hr className=" border-dashed border-[#005DAD]" />
        <h2 className=" text-[20px]">اطلاعات بیمار</h2>
        <div className=" gap-2 flex flex-col ">
          <div className=" flex flex-col ">
            <h2 className=" text-[20px]">نام</h2>
            <input
              onChange={(e) => setPatientName(e.target.value)}
              className=" p-2 px-4 border-[#005DAD] border rounded-xl "
            />
          </div>
          <div className=" flex flex-col">
            <h2 className=" text-[20px]">نام خانوادگی</h2>
            <input
              onChange={(e) => setPatientFamily(e.target.value)}
              className=" p-2 px-4 border-[#005DAD] border rounded-xl "
            />
          </div>{" "}
          <div className=" flex flex-col ">
            <h2 className=" text-[20px]">کد ملی</h2>
            <input
              onChange={(e) => setNationalId(e.target.value)}
              className=" p-2  border-[#005DAD] border rounded-xl "
            />
            <div dir="rtl" className="  flex gap-2  items-center">
              <Checkbox size="medium" />
              <h2 className=" text-[18px]">اتباع </h2>
            </div>
            <div className=" flex flex-col">
              <h2 className=" text-[18px]">تاریخ تولد</h2>
              <div className=" flex gap-8 items-center">
                <select
                  onChange={(e) => setDayOfBirth(e.target.value)}
                  className=" text-slate-400 text-center w-[115px] py-4 rounded-xl border-[#005DAD] border"
                  name="day"
                >
                  <option>روز</option>
                  {daysOfMonth.map((day, index) => (
                    <option key={day} value={index + 1}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  onChange={(e) => setMonthOfBirth(e.target.value)}
                  className=" text-slate-400 text-center w-[115px] py-4 rounded-xl border-[#005DAD] border"
                  name="month"
                >
                  {persianMonths.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>

                <input
                  onChange={(e) => setYearOfBirth(e.target.value)}
                  placeholder="سال"
                  className=" text-center w-[115px] py-4 rounded-xl border-[#005DAD] border"
                />
                <h5 className=" text-sm text-[#E62333F2]">
                  (پر کردن این فیلد اجباری نیست)
                </h5>
              </div>
            </div>
            <div className=" flex flex-col ">
              {" "}
              <h2 className=" text-[18px]">جنسیت</h2>
              <FormControl className=" w-full flex ">
                <RadioGroup>
                  <div className=" flex items-center gap-10">
                    <span className=" flex items-center">
                      <h2>خانم</h2>

                      <FormControlLabel
                        className=" mr-0 "
                        value="female"
                        control={<Radio className=" text-3xl" />}
                      />
                    </span>
                    <span className=" flex items-center">
                      <h2>آقا</h2>
                      <FormControlLabel
                        className=" mr-0 "
                        value="male"
                        control={<Radio className=" text-3xl" />}
                      />{" "}
                    </span>
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div className=" flex items-center gap-5">
              <ProvinceSelectInput setCities={setCities} />
              <CitySelectInput setCityId={setCityId} cities={cities} />
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <h2 className=" text-[18px]">شماره همراه</h2>
            <input
              onChange={(e) => setPatientPhone(e.target.value)}
              className=" p-2 rounded-xl border-[#005DAD] border"
            />{" "}
          </div>{" "}
          <div className=" flex justify-center items-center">
            <button
              onClick={() => {
                add_patient(data, setIsLoading, setIsAddPatient);
                setIsLoading(true);
              }}
              className=" w-1/2 p-3  text-white rounded-xl bg-[#005DAD]"
            >
              {isLoading ? (
                <SyncLoader color="white" size={10} />
              ) : (
                "ثبت اطلاعات"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPatinetModal;
