"use client";
import React from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// تقویم کاری پزشک؛ تاریخ‌های انتخابی به صورت آرایه‌ای از رشته‌های شمسی
// "YYYY/MM/DD" به والد برمی‌گردند تا هنگام ثبت تقویم به بک‌اند ارسال شوند
export default function DoctorWorkCalendar({
  selectedDates = [],
  onConfirm,
  onCancel,
}) {
  return (
    <div>
      <Calendar
        multiple
        value={selectedDates}
        onChange={(dates) => {
          const formatted = (dates ?? []).map((d) =>
            d.format ? d.format("YYYY/MM/DD") : String(d)
          );
          onConfirm && onConfirm(formatted);
        }}
        className="rmdp-prime relative flex justify-center items-center"
        calendar={persian}
        locale={persian_fa}
      >
        <div className=" w-full px-5 bottom-5 text-[#005DAD] absolute flex justify-start items-center gap-5">
          <button type="button" onClick={() => onCancel && onCancel()}>
            انصراف
          </button>
        </div>
        <h5 className=" text-[#49454F] text-sm absolute top-3 m-auto">
          انتخاب تاریخ
        </h5>
      </Calendar>
    </div>
  );
}
