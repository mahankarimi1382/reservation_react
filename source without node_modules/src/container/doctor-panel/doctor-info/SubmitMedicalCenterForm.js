import React from "react";
import { PiWarningCircleLight } from "react-icons/pi";
import { LuPlus } from "react-icons/lu";

function SubmitMedicalCenterForm() {
  return (
    <div className=" w-full flex gap-5 flex-col">
      <div className=" flex w-full items-center text-[#005DAD] bg-[#ECF6FF] rounded-lg border border-[#005DAD] px-5 p-3 ">
        <PiWarningCircleLight className=" text-xl" />
        <h5>پزشک گرامی لطفا اطلاعات مربوط به مطب خود را وارد نمایید.</h5>
      </div>
      <div className=" flex w-full justify-end">
        <button className=" flex justify-center p-2 gap-2 items-center rounded-lg text-[#005DAD] border border-[#005DAD]">
          <LuPlus className=" text-3xl" />
          افزودن مطب های بیشتر
        </button>
      </div>
      <div className=" bg-white rounded-3xl shadow-md flex flex-col gap-5 p-3">
        <div className=" flex items-center gap-1">
          <h5 className=" text-lg font-semibold">اطلاعات مطب: </h5>
          <h5 className=" text-[#7D7D7D]">
            ( لطفا اطلاعات مطب خود را وارد کنید )
          </h5>
        </div>
        <div className=" flex justify-between items-center">
          <div className=" flex flex-col w-[45%] items-start justify-center gap-2">
            <h5 className=" text-lg font-semibold">نام مطب</h5>
            <input
              placeholder="لطفا نام مطب را وارد کنید"
              className=" w-full bg-[#F7F7F7] py-4 border border-[#6B6B6B] rounded-lg "
            />
          </div>
          <div className=" flex flex-col w-[45%] items-start justify-center gap-2">
            <h5 className=" text-lg font-semibold">نوع مطب</h5>
            <input
              placeholder="لطفا نوع مطب را وارد کنید"
              className=" w-full bg-[#F7F7F7] py-4 border border-[#6B6B6B] rounded-lg "
            />
          </div>
        </div>
        <div className=" flex justify-between items-start">
          <div className=" flex gap-5 flex-col w-[45%]">
            <div className=" flex flex-col w-full items-start justify-center gap-2">
              <h5 className=" text-lg font-semibold">نوع مطب</h5>
              <input
                placeholder="لطفا نوع مطب را وارد کنید"
                className=" w-full bg-[#F7F7F7] py-4 border border-[#6B6B6B] rounded-lg "
              />
            </div>
            <div className=" flex flex-col w-full items-start justify-center gap-2">
              <h5 className=" text-lg font-semibold">آدرس مطب</h5>
              <textarea
                placeholder="لطفا آدرس مطب را وارد کنید"
                className=" w-full resize-none px-5 h-[120px] bg-[#F7F7F7] py-4 border border-[#6B6B6B] rounded-lg "
              />
            </div>
          </div>
          <div className=" w-[45%] flex flex-col gap-2 ">
            <h5 className=" font-semibold">لوکیشن مطب</h5>
            <div className=" flex justify-center h-60 rounded-xl border border-[#6B6B6B] bg-[#F7F7F7] items-center">
              <LuPlus className=" text-5xl " />
            </div>
          </div>
        </div>
        <div className=" flex flex-col w-full items-start justify-center gap-2">
          <h5 className=" text-lg font-semibold">نوع مطب</h5>
          <input
            placeholder="لطفا نوع مطب را وارد کنید"
            className=" w-full bg-[#F7F7F7] py-4 border border-[#6B6B6B] rounded-lg "
          />
        </div>
        <div className=" w-full justify-center items-center flex">
          <button className=" text-white bg-[#005DAD] p-3 w-[40%] rounded-lg">
            ثبت اطلاعات
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitMedicalCenterForm;
