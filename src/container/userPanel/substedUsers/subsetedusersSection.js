"use client";
import { smeIdStorage, userSubmitedArrStore } from "../../../store/Store";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
import { TbTrash } from "react-icons/tb";
import prof from "../../../assets/Pics/userPanelProfile.png";
import ReservForAnother from "../../../container/reservStepsToPay/ReservForAnother";
import DeletingModal from "../../../components/modals/DeletingModal";
import {
  delete_patient_simple,
  read_smeprofile_patients,
} from "../../../api/ApiCalling";

function SubsetedusersSection() {
  const [isAddSubsted, setIsAddSubsted] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingPatient, setDeletingPatient] = useState(null);
  const { patients, setPatients } = userSubmitedArrStore();
  const { smeId } = smeIdStorage();

  // لیست بستگان از سرور خوانده می‌شود تا بعد از رفرش صفحه هم در دسترس باشد
  useEffect(() => {
    if (!smeId) return;
    read_smeprofile_patients(smeId).then((list) => {
      if (list.length > 0) {
        setPatients(list);
      }
    });
  }, [smeId, isAddSubsted]);

  const handleDelete = async (id) => {
    await delete_patient_simple(id);
    const refreshed = await read_smeprofile_patients(smeId);
    setPatients(refreshed);
  };
  return (
    <div className=" lg:w-[82%] w-[90%] mx-auto flex justify-center flex-col items-center gap-5">
      {isAddSubsted && (
        <div
          className=" bg-[rgba(0,0,0,0.6)]   flex-col gap-10  py-10   z-50  w-screen h-screen top-0 justify-center items-center flex right-0 fixed "
          dir="rtl"
        >
          <ReservForAnother
            SubsetedusersSection
            editPatient={editingPatient}
            closeModal={() => {
              setEditingPatient(null);
              setIsAddSubsted(false);
            }}
          />
        </div>
      )}
      {patients.length !== 0 ? (
        patients.map((item, index) => {
          console.log(index);
          const isLast = index === patients.length - 1;
          return (
            <div
              key={item.id}
              className=" p-2 relative lg:w-[90%] w-full lg:p-5 bg-white rounded-lg shadow-md flex flex-col gap-5 lg:items-center items-start"
            >
              <div className=" w-full flex-row flex lg:flex-col  items-center text-center">
                <img
                  src={prof}
                  alt="profile"
                  className=" w-[50px] lg:w-[99px]"
                  width={99}
                />
                <h5 className="  text-start lg:text-center w-1/3  lg:w-full">
                  {item.patientName} {item.patientFamily}{" "}
                </h5>
              </div>
              <div className=" flex justify-between  w-full items-center">
                <div className=" flex text-xs lg:text-base justify-center items-center lg:gap-2">
                  <span className="  text-[#7E7E7E]">شماره موبایل :</span>
                  <span>{item.patientPhone}</span>
                </div>
                <div className=" lg:text-base text-xs flex justify-center items-center lg:gap-2">
                  <span className=" text-[#7E7E7E]">کد ملی : </span>
                  <span>{item.nationalId}</span>
                </div>
                <div className=" hidden  gap-2 lg:flex justify-center items-center">
                  <button
                    onClick={() => {
                      setEditingPatient(item);
                      setIsAddSubsted(true);
                    }}
                    className=" p-1 px-2 flex justify-center items-center gap-2 rounded-md border border-[#005DAD] text-[#005DAD]"
                  >
                    <CiEdit className=" text-2xl" />
                    ویرایش
                  </button>
                  <button
                    onClick={() => setDeletingPatient(item)}
                    className=" p-1 px-2 flex justify-center items-center gap-2 rounded-md border border-[#005DAD] text-[#005DAD]"
                  >
                    <TbTrash className=" text-2xl" />
                    حذف
                  </button>
                </div>
                <div className=" lg:hidden left-2 top-2 absolute  gap-2 flex justify-center items-center">
                  <button
                    onClick={() => {
                      setEditingPatient(item);
                      setIsAddSubsted(true);
                    }}
                    className=" p-1 lg:px-2 flex text-sm lg:text-base justify-center items-center gap-2 rounded-md border border-[#005DAD] text-[#005DAD]"
                  >
                    <CiEdit className=" lg:text-2xl" />
                    ویرایش
                  </button>
                  <button
                    onClick={() => setDeletingPatient(item)}
                    className=" p-1 px-2 text-sm lg:text-base flex justify-center items-center gap-2 rounded-md border border-[#005DAD] text-[#005DAD]"
                  >
                    <TbTrash className=" lg:text-2xl" />
                    حذف
                  </button>
                </div>
              </div>
              {isLast && (
                <div className=" border-t-2 border-dashed pt-5 w-full flex justify-center items-center">
                  <button onClick={()=>setIsAddSubsted(true)} className=" py-2 lg:py-0 flex justify-center items-center text-[#005DAD] text-sm lg:text-xl gap-2">
                    <GoPlusCircle />
                    افزودن کاربر جدید
                  </button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className=" flex-col gap-2 w-full h-[80vh] flex justify-center items-center">
          <h2 className=" text-2xl text-slate-600">
            زیر مجموعه ای ثبت نشده است
          </h2>
          <button
            onClick={() => {
              setEditingPatient(null);
              setIsAddSubsted(true);
            }}
            className=" py-2 lg:py-0 flex justify-center items-center text-[#005DAD] text-sm lg:text-xl gap-2"
          >
            <GoPlusCircle />
            افزودن کاربر جدید
          </button>
        </div>
      )}
      {deletingPatient && (
        <DeletingModal
          DeletingFn={(id) => handleDelete(id)}
          id={deletingPatient.id}
          name={`${deletingPatient.patientName ?? ""} ${
            deletingPatient.patientFamily ?? ""
          }`}
          closeModal={() => setDeletingPatient(null)}
        />
      )}
    </div>
  );
}

export default SubsetedusersSection;
