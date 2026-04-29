import React from "react";
import { LuPlus } from "react-icons/lu";
import bankmelli from "../../../assets/Pics/doctorPanel/bankmelli.png";
function FinancialForm() {
  return (
    <div className=" w-full gap-5  flex flex-col p-3 border border-[#6B6B6B] rounded-md">
      <div className=" flex items-center gap-2">
        <h5>اطلاعات حساب بانکی</h5>
        <h5 className=" text-[#E62333F2]">( مربوط به مطب ونک )</h5>
      </div>
      <div className=" flex w-full justify-between">
        <h5>شماره شبا:</h5>
        <button className=" flex justify-center text-sm p-2 gap-2 items-center rounded-lg text-[#005DAD] border border-[#005DAD]">
          <LuPlus className=" text-xl" />
          افزودن مطب های بیشتر
        </button>
      </div>
      <div className=" -mt-5 border px-2 p-1  gap-5 rounded-xl flex w-[40%]">
        <img src={bankmelli} alt="bank icon" width={40} />
        <select className=" w-full">
          <option>IR987800000000456780459821</option>
        </select>
      </div>
      <div className=" flex w-[40%] flex-col">
        <h5>شماره حساب:</h5>
        <input className=" w-full rounded-xl h-14 border-[#979797] border" />
      </div>
      <hr className=" border-dashed border" />
      <h5 className=" text-xl font-semibold">مشخصات درگاه</h5>
      <h5>ترمینال آیدی :</h5>
      <input className=" rounded-xl w-full h-14 border border-[#979797]" />
      <h5>آی پی :</h5>
      <input className=" rounded-xl w-full h-14 border border-[#979797]" />
      <h5>رمز عبور :</h5>
      <input className=" rounded-xl w-full h-14 border border-[#979797]" />
      <h5> : URL</h5>
      <input className=" rounded-xl w-full h-14 border border-[#979797]" />
      <div className=" w-full flex justify-between items-center">
        <div className=" flex flex-col w-[45%]  gap-2">
          <h5>نام درگاه :</h5>
          <input className=" w-full h-14 rounded-xl border border-[#979797] " />
        </div>
        <div className=" flex flex-col w-[45%]  gap-2">
          <h5>نام درگاه :</h5>
          <input className="  w-full h-14 rounded-xl border border-[#979797] " />
        </div>
      </div>
      <div className=" w-full flex gap-10">
        <h5 className=" font-semibold">
          آیا بیمار بیعانه پرداخت کند و مابقی حق ویزیت را حین حضور در مطب پرداخت
          کند؟{" "}
        </h5>
        <div className=" flex items-center gap-1">
          <input type="checkbox" />
          <h5 className=" font-semibold">بله</h5>
        </div>
        <div className=" flex items-center gap-1">
          <input type="checkbox" />
          <h5 className=" font-semibold">خیر</h5>
        </div>
      </div>
      <div className=" w-full flex justify-center items-center">
        <button className=" text-white p-3 w-[40%] rounded-lg bg-[#005DAD]">
          ثبت اطلاعات
        </button>
      </div>
    </div>
  );
}

export default FinancialForm;
