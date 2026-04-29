"use client";
import React from "react";
import { CiEdit } from "react-icons/ci";
import bahramProf from "../../assets/Pics/bahramMirzayi.png";
import star from "../../assets/Pics/star.png";
import step1reservation from "../../assets/Pics/reservationStep1.png";
import doctorIcon from "../../assets/Pics/doctor-icon.jpg";

import {
  doctorProfileStore,
  fullNameStorage,
  reservationStore,
  smeIdStorage,
  userProfileStore,
  userSubmitedArrStore,
} from "../../store/Store";
import { RxCross2 } from "react-icons/rx";

function ReservForMe({ setSteps, closeModal }) {
  const { phoneNum } = userProfileStore();
  const { patients } = userSubmitedArrStore();
    const { selectedPtientName } = reservationStore();
  
  console.log(patients);
  console.log(phoneNum);
  const { fullName } = fullNameStorage();
  const { doctorName } = doctorProfileStore();
  const { dateAndTime, adress, doctorSpecialties } = reservationStore();
  const handleCompleteStep1 = () => {
    setSteps(2);
  };
  return (
    <div className="flex pt-12 lg:pt-0 relative bg-white w-full lg:w-[80%] rounded-xl overflow-auto min-h-screen lg:h-full flex-col justify-start gap-10 items-center">
      <RxCross2
        onClick={closeModal}
        className=" cursor-pointer text-xl absolute top-5 left-5"
      />
      <div className=" hidden lg:flex justify-center  items-center w-[90%] h-[124px] bg-[rgba(196,226,255,0.37)] rounded-2xl">
        <img src={step1reservation} width={915} alt="step-picture" />
      </div>
      <div className=" w-[90%] flex flex-col gap-2 lg:flex-row justify-between">
        <div className=" lg:w-[750px] p-4 lg:h-[340px] gap-5 rounded-xl border border-[#005DAD] flex flex-col bg-[#F8FCFF]">
          <h2 className=" pb-4 lg:text-[20px] border-b border-dashed border-[#005DAD] text-[#005DAD] ">
            دریافت نوبت برای خودم
          </h2>
          <div className=" w-full flex justify-between items-center">
            <h2 className=" lg:text-[20px]">اطلاعات من</h2>
            {/* <button className=" flex gap-1 items-center text-[#005DAD] p-2 rounded-lg border border-[#005DAD]">
              <CiEdit className=" text-2xl" />
              ویرایش
            </button> */}
          </div>
          <div className=" w-full flex justify-between items-center">
            <h2 className=" lg:text-[20px]">نام و نام خانوادگی</h2>
            <h2 className=" lg:text-[20px]">
              {fullName != "string"
                ? fullName
                : selectedPtientName}
            </h2>
          </div>
          <div className=" w-full flex justify-between items-center">
            <h2 className=" lg:text-[20px]">شماره موبایل</h2>
            <h2 className=" lg:text-[20px]">{phoneNum}</h2>
          </div>
          <div className=" w-full flex justify-between items-center">
            <h2 className=" lg:text-[20px]">بیمه</h2>
            {/* <h2 className=" text-[20px]">بیمه تکمیلی دانا</h2> */}
          </div>
          <p>(باتوجه به بیمه تکمیلی شما هزینه تا 15% کسر می شود)</p>
        </div>
        <div className=" lg:w-[560px] p-4 lg:h-[340px]  rounded-xl border border-[#005DAD] flex flex-col ">
          <div className=" border-b pb-4 border-[#CBCBCB] flex items-start justify-between">
            <div className=" flex justify-center items-center gap-2">
              <img
                alt="prof"
                src={doctorIcon}
                width={87}
                className="border lg:w-[87px] w-[50px] rounded-full border-[#005DAD]"
              />
              <div className=" flex flex-col gap-2">
                <h2 className=" text-xs lg:text-[20px]">{doctorName}</h2>
                <h5 className=" text-xs lg:text-base text-[#757575]">
                  {doctorSpecialties}
                </h5>
              </div>
            </div>

            <p className=" lg:text-base text-xs flex mt-3 items-center gap-1">
              <img width={22} src={star} alt="star" />
              4.5/5 از (نظر 320)
            </p>
          </div>
          <div className=" flex lg:py-5 lg:text-[20px] gap-1 border-b border-[#CBCBCB]">
            <h2>تاریخ و ساعت نوبت:</h2>
            <h2 className=" text-[#757575]">{dateAndTime}</h2>
          </div>
          <div className=" flex lg:py-5 lg:text-[20px] gap-1 border-b border-[#CBCBCB]">
            <h2>نوع نوبت دهی:</h2>
            <h2 className=" text-[#757575]">حضوری</h2>
          </div>
          <div className=" flex lg:py-5 lg:text-[20px] gap-1 ">
            <h2>آدرس:</h2>
            <h2 className=" text-[#757575]">{adress}</h2>
          </div>
        </div>
      </div>
      <button
        onClick={handleCompleteStep1}
        className=" px-10 lg:px-0 lg:w-[460px] rounded-xl bg-[#005DAD] text-white py-4"
      >
        ادامه
      </button>
    </div>
  );
}

export default ReservForMe;
