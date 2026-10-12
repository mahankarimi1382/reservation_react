import React from "react";
import LastStep from "../../assets/Pics/LastStepFrame.png";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import {
  doctorProfileStore,
  fullNameStorage,
  reservationStore,
  userProfileStore,
} from "../../store/Store";

function Receipt({ closeModal }) {
  const { fullName } = fullNameStorage();
  const { phoneNum } = userProfileStore();
  const { doctorName, doctorSpecialties, doctorNezamCode } =
    doctorProfileStore();
  const { selectedPtientName, dateAndTime, adress, turnId, reservationId } = reservationStore();

  const patientName =
    selectedPtientName && selectedPtientName !== "" ? selectedPtientName : fullName;

  return (
    <div
      className=" relative flex flex-col justify-center gap-10 items-center w-full max-h-[90vh] overflow-y-auto bg-white p-6 rounded-2xl"
      dir="rtl"
    >
      {closeModal && (
        <button
          onClick={closeModal}
          className="absolute top-5 left-5 text-gray-500 hover:text-black transition-colors"
          title="بستن"
        >
          <RxCross2 className="text-2xl" />
        </button>
      )}
      <div className=" flex justify-center items-center w-[90%] h-[124px] bg-[rgba(196,226,255,0.37)] rounded-2xl">
        <img src={LastStep} width={915} alt="step-picture" />
      </div>
      <div className=" w-[90%] flex flex-col gap-10">
        <div className=" w-full flex justify-center  items-center">
          <div className=" w-[60%] bg-[rgba(0,186,0,0.09)] rounded-2xl h-[77px] flex justify-center gap-5 items-center">
            <FaCircleCheck className=" text-[#038F03] text-3xl" />
            <h5 className=" text-xl text-[#038F03]">
              نوبت شما با موفقیت ثبت شد. شما می توانید اطلاعات رزرو نوبت خود
              را ببینید.
            </h5>
          </div>
        </div>
        <div className=" flex justify-between items-center">
          <div className=" w-[46%] p-5 rounded-2xl flex-col h-[330px] border border-[#005DAD]">
            <h5 className=" text-[#005DAD] text-2xl">اطلاعات بیمار</h5>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">نام و نام خانوادگی</h5>
              <h5 className=" text-lg text-[#858585] ">{patientName}</h5>
            </div>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">شماره تماس</h5>
              <h5 className=" text-lg text-[#858585] " dir="ltr">{phoneNum}</h5>
            </div>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">کد رهگیری نوبت</h5>
              <h5 className=" text-lg font-mono font-bold text-[#005DAD] " dir="ltr">
                {turnId ? `TRN-${turnId}` : (reservationId ? `RES-${reservationId}` : "—")}
              </h5>
            </div>
            <div className=" py-5 flex w-full justify-between">
              <h5 className=" text-lg">بیمه</h5>
              <h5 className=" text-lg text-[#858585] ">—</h5>
            </div>
          </div>
          <div className=" w-[46%] p-5 rounded-2xl flex-col h-[330px] border border-[#005DAD]">
            <h5 className=" text-[#005DAD] text-2xl">اطلاعات پزشک</h5>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">نام و نام خانوادگی پزشک</h5>
              <h5 className=" text-lg text-[#858585] ">{doctorName}</h5>
            </div>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">تخصص</h5>
              <h5 className=" text-lg text-[#858585] ">{doctorSpecialties}</h5>
            </div>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">شماره نظام پزشکی</h5>
              <h5 className=" text-lg text-[#858585] " dir="ltr">
                {doctorNezamCode}
              </h5>
            </div>
            <div className=" py-5 flex w-full justify-between">
              <h5 className=" text-lg">آدرس مطب</h5>
              <h5 className=" text-lg text-[#858585] ">{adress}</h5>
            </div>
          </div>
        </div>
        <div className=" w-full p-5 border border-[#005DAD] rounded-2xl ">
          <h2 className=" text-2xl text-[#005DAD]">اطلاعات ویزیت</h2>
          <div className=" py-5 w-full flex justify-between items-center">
            <h5 className=" text-xl">تاریخ و ساعت ویزیت</h5>
            <h5 className=" text-xl text-[#858585]"> {dateAndTime}</h5>
          </div>
        </div>
        <div className=" w-full flex items-center gap-4 justify-end">
          {closeModal && (
            <button
              onClick={closeModal}
              className=" border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-2 rounded-lg text-sm transition-all"
            >
              بستن و بازگشت
            </button>
          )}
          <button
            onClick={() => window.print()}
            className=" border bg-[#005DAD] hover:bg-[#004885] text-white px-8 py-2 rounded-lg text-sm transition-all"
          >
            چاپ اطلاعات رسید
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
