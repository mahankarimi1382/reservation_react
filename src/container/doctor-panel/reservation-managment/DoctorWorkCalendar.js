"use client";
import React from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function DoctorWorkCalendar() {
  return (
    <div>
      <Calendar
        multiple
        className="rmdp-prime relative flex justify-center items-center"
        calendar={persian}
        locale={persian_fa}
      >
        <div className=" w-full px-5 bottom-5 text-[#005DAD] absolute flex justify-start items-center gap-5">
          <button onClick={() => setValue(undefined)}>تایید</button>
          <button onClick={() => setValue(new Date())}>انصراف</button>
        </div>
          <h5 className=" text-[#49454F] text-sm absolute top-3 m-auto">انتخاب تاریخ</h5>
      </Calendar>
    </div>
  );
}
