import React from "react";
import LastStep from "../../assets/Pics/LastStepFrame.png";
import { FaCircleCheck } from "react-icons/fa6";

function Receipt() {
  return (
    <div
      className=" flex flex-col justify-center gap-10 items-center"
      dir="rtl"
    >
      <div className=" flex justify-center items-center w-[90%] h-[124px] bg-[rgba(196,226,255,0.37)] rounded-2xl">
        <img src={LastStep} width={915} alt="step-picture" />
      </div>
      <div className=" w-[90%] flex flex-col gap-10">
        <div className=" w-full flex justify-center  items-center">
          <div className=" w-[60%] bg-[rgba(0,186,0,0.09)] rounded-2xl h-[77px] flex justify-center gap-5 items-center">
            <FaCircleCheck className=" text-[#038F03] text-3xl" />
            <h5 className=" text-xl text-[#038F03]">
              پرداخت شما با موفقیت انجام شد. شما می توانید اطلاعات رزرو نوبت خود
              را ببینید.
            </h5>
          </div>
        </div>
        <div className=" flex justify-between items-center">
          <div className=" w-[46%] p-5 rounded-2xl flex-col h-[330px] border border-[#005DAD]">
            <h5 className=" text-[#005DAD] text-2xl">اطلاعات بیمار</h5>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">نام و نام خانوادگی</h5>
              <h5 className=" text-lg text-[#858585] ">ایمان خسروی</h5>
            </div>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">شماره تماس</h5>
              <h5 className=" text-lg text-[#858585] ">09121885312</h5>
            </div>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">تاریخ تولد</h5>
              <h5 className=" text-lg text-[#858585] ">1380/01/18</h5>
            </div>
            <div className=" py-5 flex w-full justify-between">
              <h5 className=" text-lg">بیمه</h5>
              <h5 className=" text-lg text-[#858585] ">تامین اجتماعی</h5>
            </div>
          </div>
          <div className=" w-[46%] p-5 rounded-2xl flex-col h-[330px] border border-[#005DAD]">
            <h5 className=" text-[#005DAD] text-2xl">اطلاعات پزشک</h5>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">نام و نام خانوادگی پزشک</h5>
              <h5 className=" text-lg text-[#858585] ">ایمان خسروی</h5>
            </div>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">تخصص</h5>
              <h5 className=" text-lg text-[#858585] ">09121885312</h5>
            </div>
            <div className=" border-b-2 py-5 flex w-full justify-between">
              <h5 className=" text-lg">شماره نظام پزشکی</h5>
              <h5 className=" text-lg text-[#858585] ">1380/01/18</h5>
            </div>
            <div className=" py-5 flex w-full justify-between">
              <h5 className=" text-lg">آدرس مطب</h5>
              <h5 className=" text-lg text-[#858585] ">تامین اجتماعی</h5>
            </div>
          </div>
        </div>
        <div className=" w-full p-5 border border-[#005DAD] rounded-2xl ">
          <h2 className=" text-2xl text-[#005DAD]">اطلاعات ویزیت</h2>
          <div className=" border-b-2 py-5 w-full flex justify-between items-center">
            <h5 className=" text-xl">تاریخ و ساعت ویزیت</h5>
            <h5 className=" text-xl text-[#858585]"> 1403/06/02 ساعت 10:30</h5>
          </div>
          <div className=" border-b-2 py-5 w-full flex justify-between items-center">
            <h5 className=" text-xl">تاریخ و ساعت ویزیت</h5>
            <h5 className=" text-xl text-[#858585]"> 1403/06/02 ساعت 10:30</h5>
          </div>
          <div className=" border-b-2 py-5 w-full flex justify-between items-center">
            <h5 className=" text-xl">تاریخ و ساعت ویزیت</h5>
            <h5 className=" text-xl text-[#858585]"> 1403/06/02 ساعت 10:30</h5>
          </div>
          <div className=" border-b-2 py-5 w-full flex justify-between items-center">
            <h5 className=" text-xl">تاریخ و ساعت ویزیت</h5>
            <h5 className=" text-xl text-[#858585]"> 1403/06/02 ساعت 10:30</h5>
          </div>
          <div className=" border-b-2 py-5 w-full flex justify-between items-center">
            <h5 className=" text-xl">تاریخ و ساعت ویزیت</h5>
            <h5 className=" text-xl text-[#858585]"> 1403/06/02 ساعت 10:30</h5>
          </div>
          <div className=" py-5 w-full flex justify-between items-center">
            <h5 className=" text-xl">تاریخ و ساعت ویزیت</h5>
            <h5 className=" text-xl text-[#858585]"> 1403/06/02 ساعت 10:30</h5>
          </div>
        </div>
        <div className=" w-full flex items-center gap-10 justify-end">
          <button className=" border border-[#005DAD] text-[#005DAD] px-20 p-1 rounded-lg">
            نمایش رویه نقشه
          </button>
          <button className=" border bg-[#005DAD] text-white px-20 p-1 rounded-lg">
            چاپ اطلاعات رسید
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

export default Receipt;
