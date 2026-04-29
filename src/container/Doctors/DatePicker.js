import React from "react";
import calenderIcon from "../../assets/Pics/calendar.png";
import DatePickerComponent from "../../components/DatePickerComponent";
import { myStore } from "../../store/Store";

function DatePicker() {
  const { setSDate } = myStore();
  const { setEDate } = myStore();
  return (
    <div className=" w-full flex justify-center items-center">
      <div className=" w-full rounded-2xl h-[112px] justify-center gap-4  border shadow-md flex flex-col">
        <h2 className=" px-5">تعیین روز نوبت :</h2>
        <div className=" w-full">
          <div className=" flex justify-around">
            <DatePickerComponent setDate={setSDate} title="از تاریخ" />

            <DatePickerComponent setDate={setEDate} title="تا تاریخ" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
