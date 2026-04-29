import React from "react";

function MakeProfileForm() {
  return (
    <div className=" w-[90%] gap-10 flex flex-col justify-center items-center">
      <div className=" w-full gap-7 flex justify-between flex-wrap">
        <div className=" w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className=" text-lg">نام :</h5>
          <input className=" w-full h-14 border-[#6B6B6B] border rounded-lg" />
        </div>
        <div className=" w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className=" text-lg">نام خانوادگی :</h5>
          <input className=" w-full h-14 border-[#6B6B6B] border rounded-lg" />
        </div>
        <div className=" w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className=" text-lg">کد نظام پزشکی :</h5>
          <input className=" w-full h-14 border-[#6B6B6B] border rounded-lg" />
        </div>
        <div className=" w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className=" text-lg">تخصص :</h5>
          <select className=" w-full h-14 border-[#6B6B6B] border rounded-lg">
            <option></option>
          </select>
        </div>
        <div className=" w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className=" text-lg">سابقه فعالیت :</h5>
          <input className=" w-full h-14 border-[#6B6B6B] border rounded-lg" />
        </div>
        <div className=" w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className=" text-lg">آدرس اینستاگرام:</h5>
          <input className=" w-full h-14 border-[#6B6B6B] border rounded-lg" />
        </div>
      </div>
      <button className=" text-white bg-[#005DAD] rounded-xl w-1/3 p-4">تایید و ادامه</button>
    </div>
  );
}

export default MakeProfileForm;
