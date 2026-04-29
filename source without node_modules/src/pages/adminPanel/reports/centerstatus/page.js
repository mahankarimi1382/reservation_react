import DatePickerComponent from "../../../../components/DatePickerComponent";
import { SelectFilter } from "../../../../components/Inputs/Input";
import AdminPanelMenu from "../../../../container/adminPanel/AdminPanelMenu";
import React from "react";
import excel_icon from "../../../../assets/Pics/excelIcon.png";
import printer from "../../../../assets/Pics/printer.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { RateCounter } from "../../../../utils/RateCounter";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";

function page() {
  const fakeData = [
    {
      id: 1,
      name: "ایمان سالارکیا",
      time: "1403/0402 ساعت 10:30",
      code: "0024567980",
      phone: "09129804556",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      time: "1403/0402 ساعت 10:30",
      code: "0024567980",
      phone: "09129804556",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      time: "1403/0402 ساعت 10:30",
      code: "0024567980",
      phone: "09129804556",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      time: "1403/0402 ساعت 10:30",
      code: "0024567980",
      phone: "09129804556",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      time: "1403/0402 ساعت 10:30",
      code: "0024567980",
      phone: "09129804556",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      time: "1403/0402 ساعت 10:30",
      code: "0024567980",
      phone: "09129804556",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      time: "1403/0402 ساعت 10:30",
      code: "0024567980",
      phone: "09129804556",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      time: "1403/0402 ساعت 10:30",
      code: "0024567980",
      phone: "09129804556",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      time: "1403/0402 ساعت 10:30",
      code: "0024567980",
      phone: "09129804556",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      time: "1403/0402 ساعت 10:30",
      code: "0024567980",
      phone: "09129804556",
    },
  ];
  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />
      <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
        <div className=" flex w-[80%]  gap-5 items-center">
          <DatePickerComponent title="از تاریخ" />
          <DatePickerComponent title="تا تاریخ" />
          <SelectFilter title="نام پزشک" />
          <SelectFilter title="ساعت" />
          <SelectFilter title="نوع ویزیت" />
          <SelectFilter title="نام مرکز درمانی" />
        </div>
        <div className=" gap-2 flex justify-end w-[80%] items-center">
          <button className=" border rounded-lg px-3 p-1 gap-2 text-[#185B37] border-[#185B37] flex">
            <img src={excel_icon} alt=" icon" width={24} />
            خروجی اکسل
          </button>
          <button className=" border rounded-lg px-3 p-1 gap-2 text-[#3F444D] border-[#3F444D] flex">
            <img src={printer} alt=" icon" width={24} />
            چاپ اطلاعات{" "}
          </button>
        </div>
        <div className=" gap-3 flex flex-col w-[80%] rounded-lg border shadow-md p-4 bg-white">
          <div className=" text-sm py-2 w-full flex rounded-lg bg-[#F4F4F4]">
            <h4 className=" gap-2 text-[#005DAD] font-semibold w-[13%] flex justify-center  items-center text-base">
              <input className=" border-[#005DAD] border" type="checkbox" />
              همه
            </h4>
            <h4 className=" w-[9%] flex justify-center  items-center text-[#3F444D] ">
              بیمارستان
              <TiArrowSortedDown />

            </h4>
            <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
              پزشک
              <TiArrowSortedDown />

            </h4>
            <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
              تاریخ
              <TiArrowSortedDown />

            </h4>
            <span className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
              شروع
              <TiArrowSortedDown />

            </span>
            <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
              پایان
              <TiArrowSortedDown />

            </h4>
            <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
              حضوری
              <TiArrowSortedDown />

            </h4>
            <span className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
              غیرحضوری
              <TiArrowSortedDown />

            </span>
            <span className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
              تلفنی
              <TiArrowSortedDown />

            </span>
            <span className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
              متنی
              <TiArrowSortedDown />

            </span>{" "}
            <span className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
              تصویری
              <TiArrowSortedDown />

            </span>
          </div>
          {fakeData.map((item) => {
            return (
              <div
                className=" border flex py-3 rounded-lg bg-white shadow-md"
                key={item.id}
              >
                <div className=" w-[13%] flex justify-center items-center">
                  <input className="border-[#005DAD] border" type="checkbox" />
                </div>
                <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
                  کسری
                </h4>
                <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
                  انوشه اسدی{" "}
                </h4>
                <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
                  1403/04/02{" "}
                </h4>
                <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
                  08:00{" "}
                </h4>
                <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
                  09:00{" "}
                </h4>
                <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
                  230{" "}
                </h4>
                <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
                  230{" "}
                </h4>
                <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
                  230{" "}
                </h4>
                <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
                  230{" "}
                </h4>
                <h4 className=" w-[9%] flex justify-center items-center text-[#3F444D] ">
                  230{" "}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
