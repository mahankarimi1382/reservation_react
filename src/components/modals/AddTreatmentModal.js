"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { PiHospital } from "react-icons/pi";
import { PiBuildingOffice } from "react-icons/pi";
import {
  create_doctor_treatment,
  get_clinics,
  get_offices,
} from "../../api/ApiCalling";
import { SyncLoader } from "react-spinners";

function AddTreatmentModal({ closeModal, id, assignedIds = [] }) {
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clinicId, setClinicId] = useState("");
  const [officeId, setOfficeId] = useState("");
  const [desc, setDesc] = useState("");
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [isListLoading, setIsListLoading] = useState(false);

  // مرکز انتخاب‌شده برای برداشتن cityId
  const selectedCenter = medicalCenters.find(
    (item) => String(item.id) === String(clinicId || officeId)
  );

  const data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: 0,
    },
    doctorId: Number(id),
    clinicId,
    officeId,
    desc: desc.trim(),
    cityId: Number(selectedCenter?.cityId) || 0,
  };

  console.log(medicalCenters);
  const getClinics = async () => {
    setIsListLoading(true);
    const data = await get_clinics();
    setMedicalCenters(data || []);
    setIsListLoading(false);
  };
  const getOffices = async () => {
    setIsListLoading(true);
    const data = await get_offices();
    setMedicalCenters(data || []);
    setIsListLoading(false);
  };

  // مراکزی که قبلا به این پزشک تخصیص داده شده‌اند را کنار می‌گذاریم
  const availableCenters = medicalCenters.filter(
    (item) => !assignedIds.map(String).includes(String(item.id))
  );
  const handleChange = (e) => {
    // با تعویض نوع، انتخاب قبلی باید پاک شود
    setClinicId("");
    setOfficeId("");
    setMedicalCenters([]);

    if (e.target.value === "بیمارستان") {
      getClinics();
      setType("بیمارستان");
    } else {
      getOffices();
      setType("مطب");
    }
  };
  return (
    <div className=" w-screen z-10 h-screen top-0 justify-center items-center flex right-0 fixed">
      <div className=" relative w-[450px] h-2/3 bg-white flex flex-col gap-2 py-2 px-2 pb-5  items-center rounded-2xl">
        <RxCross2
          onClick={closeModal}
          className=" absolute left-2 top-2 cursor-pointer  text-xl text-[#717171] "
        />
        <img src={ModalLogo} alt="logo" width={67} />
        <div className=" w-full items-center justify-start">
          <h5>لطفا نوع مرکز درمانی را انتخاب کنید:</h5>
        </div>
        <RadioGroup
          onChange={handleChange}
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
        >
          <div className=" flex w-full justify-center items-center gap-10">
            <div className=" border-2 rounded-xl pl-2  flex justify-center items-center gap-2">
              <FormControlLabel
                className=" mr-0 "
                value="بیمارستان"
                control={<Radio />}
              />
              <PiHospital className="text-[#717171] text-xl" />
              بیمارستان,درمانگاه
            </div>
            <div className="  border-2 rounded-xl pl-2  flex justify-center items-center gap-2">
              <FormControlLabel
                value="مطب"
                className=" mr-0 "
                control={<Radio />}
              />
              <PiBuildingOffice className=" text-xl text-[#717171]" />
              مطب
            </div>
          </div>
        </RadioGroup>
        {isListLoading && (
          <h5 className="text-sm text-[#858585] py-2">در حال بارگذاری...</h5>
        )}

        {!isListLoading && type && availableCenters.length === 0 && (
          <h5 className="text-sm text-[#858585] py-2 text-center px-3">
            {medicalCenters.length === 0
              ? "موردی برای تخصیص یافت نشد"
              : "همه‌ی موارد این دسته قبلاً به این پزشک تخصیص داده شده است"}
          </h5>
        )}

        {availableCenters.length != 0 && (
          <div className=" overflow-auto overflow-x-hidden   w-full border rounded-xl border-[#005DAD]">
            <RadioGroup
              onChange={(e) => {
                console.log(type);
                {
                  type == "بیمارستان"
                    ? setClinicId(e.target.value)
                    : setOfficeId(e.target.value);
                }
              }}
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              {availableCenters.map((item) => {
                return (
                  <div
                    key={item.id}
                    className=" border-b last:border-none p-2 w-full flex items-center justify-between px-2"
                  >
                    <FormControlLabel
                      className=" mr-0 "
                      value={item.id}
                      control={<Radio />}
                    />
                    <h5 className=" w-[30%]">{item.clinicName || item.name}</h5>
                    <h5 className=" w-[20%]">{item.cityName}</h5>
                    <h5
                      className={item.clinicTypeName ? " w-[40%]" : "w-[20%]"}
                    >
                      {item.clinicTypeName || item.officeTypeName}
                    </h5>
                    <h5 className={item.siamCode ? " w-[10%]" : "w-[30%]"}>
                      {item.siamCode || item.postalCode}
                    </h5>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        )}
        {availableCenters.length != 0 && (
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="توضیحات (اختیاری)"
            className="w-full border border-[#B9B9B9] rounded-lg p-2 text-sm outline-none focus:border-[#005DAD]"
          />
        )}

        {availableCenters.length != 0 && (
          <button
            onClick={() => {
              const message =
                type == "بیمارستان"
                  ? "مرکز درمانی با موفقیت تخصیص داده شد"
                  : "مطب با موفقیت تخصیص داده شد";

              console.log(data);
              setIsLoading(true);
              create_doctor_treatment(data, setIsLoading, closeModal, message);
            }}
            disabled={
              isLoading ||
              (type == "بیمارستان" && !clinicId) ||
              (type != "بیمارستان" && !officeId)
            }
            className=" disabled:bg-slate-300 w-1/2 flex font-light justify-center items-center gap-2 rounded-lg p-2 min-h-10 bg-[#005DAD] text-white"
          >
            {isLoading ? (
              <SyncLoader color="white" size={10} />
            ) : (
              "تخصیص مرکز درمانی به دکتر"
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default AddTreatmentModal;
