"use client";
import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Icon from "react-multi-date-picker/components/icon";

// تابع ساده تبدیل اعداد فارسی به انگلیسی
const convertToEnglishNumbers = (dateString) => {
  return dateString.toString().replace(/[۰-۹]/g, (char) => 
    '۰۱۲۳۴۵۶۷۸۹'.indexOf(char)
  );
};

function DatePickerComponent({ title, setDate }) {
  return (
    <div style={{ direction: "rtl" }}>
      <DatePicker
        onChange={(date) => {
          let formattedDate = date.format(); // تاریخ با فرمت شمسی
          formattedDate = convertToEnglishNumbers(formattedDate); // تبدیل اعداد فارسی به انگلیسی
          console.log(formattedDate);
          setDate(formattedDate);
        }}
        render={(value, openCalendar) => {
          const englishValue = convertToEnglishNumbers(value || "");
          return (
            <button
              className="flex border-2 justify-between bg-white items-center text-[#AAAAAA] xl:w-[170px] rounded-md p-1 px-3"
              onClick={openCalendar}
            >
              {englishValue || title}
              <Icon />
            </button>
          );
        }}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
      />
    </div>
  );
}

export default DatePickerComponent;
