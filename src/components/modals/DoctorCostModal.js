"use client";
import {
  create_visitcost,
  delete_doctor_treatment,
  get_doctor_treatmentCenter,
} from "../../api/ApiCalling";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AddTreatmentButt } from "../Buttons/Button";
import DeletingModal from "./DeletingModal";
import SeeReservsModal from "./SeeReservsModal";
import { SyncLoader } from "react-spinners";

function DoctorCostModal({ id, name, setIsDoctorCostModal }) {
  const [treatmentCenters, setTreatmenCenters] = useState([]);
  const [prices, setPrices] = useState({});
  const [submittingId, setSubmittingId] = useState(null);

  console.log(treatmentCenters);
  const getTreatMent = async () => {
    const data = await get_doctor_treatmentCenter(id);
    if (data) {
      console.log(data);
      setTreatmenCenters(data);
    }
  };
  console.log(treatmentCenters);

  useEffect(() => {
    getTreatMent();
  }, []);
  const handleClose = () => {
    setIsDoctorCostModal(false);
  };
  return (
    <div className=" w-screen z-10 h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className=" w-[450px] h-2/3 bg-white flex flex-col justify-between py-2 px-2 pb-5  items-center rounded-2xl">
        <div className=" relative w-full h-full gap-2 flex items-center flex-col">
          <RxCross2
            onClick={handleClose}
            className=" absolute cursor-pointer top-0 left-0  text-xl text-[#717171] "
          />

          <img src={ModalLogo} alt="logo" width={67} />
          <div className=" w-full items-start justify-start">
            <h5 className=" flex gap-1">
              مراکز درمانی دکتر
              <span className=" text-[#005DAD]">{name}</span>:
            </h5>
          </div>
          {treatmentCenters.length == 0 ? (
            <h5 className=" w-full h-full flex justify-center items-center text-[#858585]">
              هیچ مرکز درمانی برای {name} ثبت نشده است
            </h5>
          ) : (
            <div className=" overflow-auto rounded-xl border p-2 border-[#005DAD] w-full h-full flex flex-col">
              <div className=" p-2 border-b w-full  flex items-center justify-center">
                <h5 className=" w-[30%]">نام مرکز </h5>
                <h5 className=" w-[30%]  text-center">نوع مرکز</h5>
                <h5 className=" w-[40%] "></h5>
              </div>
              {treatmentCenters.map((item) => {
                return (
                  <div
                    className=" text-[#858585] border-b last:border-none p-2  flex items-center justify-center"
                    key={item.id}
                  >
                    <h5 className=" w-[30%]">
                      {item.officeName || item.clinicName}
                    </h5>
                    <h5 className=" w-[30%]  text-center">
                      {item.officeName ? "مطب" : "بیمارستان,درمانگاه"}
                    </h5>
                    <input
                      value={prices[item.id] ?? ""}
                      onChange={(e) =>
                        setPrices({ ...prices, [item.id]: e.target.value })
                      }
                      className=" p-1 text-xs border rounded-lg w-[30%]"
                      placeholder="قیمت ویزیت "
                    />
                    <button
                      onClick={async () => {
                        const price = prices[item.id];
                        if (!price || Number(price) <= 0) {
                          setPrices({ ...prices, [item.id]: "" });
                          return;
                        }
                        setSubmittingId(item.id);
                        await create_visitcost(id, price);
                        setSubmittingId(null);
                      }}
                      className=" w-[10%] text-xs bg-[#005DAD] text-white p-1 px-2 rounded-lg"
                    >
                      {submittingId === item.id ? (
                        <SyncLoader color="white" size={6} />
                      ) : (
                        "ثبت"
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorCostModal;
