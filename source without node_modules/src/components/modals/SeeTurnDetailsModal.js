import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function SeeTurnDetailsModal({ closeModal, selectedItem }) {
  //     name:
  //     item.doctor.doctorName + " " + item.doctor.doctorFamily,
  //   pName:
  //     item.patient.patientName +
  //     " " +
  //     item.patient.patientFamily,
  //   date:
  //     convertDate(item.reservation.reservationDate) +
  //     "ساعت" +
  //     item.reservation.reservationTime,
  //   address:
  //     item.doctorTreatmentCenter.clinic.address ||
  //     item.doctorTreatmentCenter.office.address,
  //   type: "حضوری",
  //   nationalId: item.patient.nationalId,
  //   phone: item.patient.patientPhone,
  return (
    <div className=" z-20  w-screen h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className=" relative w-1/3 h-2/3 p-5 pt-10 rounded-xl bg-white flex flex-col gap-3 ">
        <RxCross2
          onClick={closeModal}
          className=" absolute top-2 left-2 cursor-pointer "
        />
        <h5>جزئیات بیشتر:</h5>
        <div className="  w-full h-full rounded-lg border border-[#005DAD] flex flex-col p-2 px-4">
          <div className=" border-b p-2 w-full flex justify-between items-center">
            <h5>نام پزشک</h5>
            <h5 className=" text-gray-500">{selectedItem.name}</h5>
          </div>
          <div className=" border-b p-2 w-full flex justify-between items-center">
            <h5>نام بیمار</h5>
            <h5 className=" text-gray-500">{selectedItem.pName}</h5>
          </div>
          <div className=" border-b p-2 w-full flex justify-between items-center">
            <h5>تاریخ و ساعت نوبت</h5>
            <h5 className=" text-gray-500">{selectedItem.date}</h5>
          </div>
          <div className=" border-b p-2 w-full flex justify-between items-center">
            <h5>آدرس مطب </h5>
            <h5 className=" text-gray-500">{selectedItem.address}</h5>
          </div>
          <div className=" border-b p-2 w-full flex justify-between items-center">
            <h5>نوع نوبت دهی</h5>
            <h5 className=" text-gray-500">{selectedItem.type}</h5>
          </div>
          <div className=" border-b p-2 w-full flex justify-between items-center">
            <h5>کد ملی</h5>
            <h5 className=" text-gray-500">{selectedItem.nationalId}</h5>
          </div>
          <div className=" border-b p-2 w-full flex justify-between items-center">
            <h5>شماره همراه</h5>
            <h5 className=" text-gray-500">{selectedItem.phone}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeTurnDetailsModal;
