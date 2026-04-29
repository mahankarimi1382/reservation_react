import DatePickerComponent from "../../../../components/DatePickerComponent";
import { SelectFilter } from "../../../../components/Inputs/Input";
import AdminPanelMenu from "../../../../container/adminPanel/AdminPanelMenu";
import React from "react";
import excel_icon from "../../../../assets/Pics/excelIcon.png";
import printer from "../../../../assets/Pics/printer.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import bahram from "../../../../assets/Pics/bahramMirzayi.png";
import { CiEdit } from "react-icons/ci";
import folder from "../../../../assets/Pics/folder.png";
import medicalcenter from "../../../../assets/Pics/medicalcenter.png";
import hamele from "../../../../assets/Pics/hamele.png";

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
          <SelectFilter title="نظر" />
          <SelectFilter title="نوع ویزیت" />
          <SelectFilter title="محل ویزیت" />
          <SelectFilter title="ساعت" />
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
          <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
            <h4 className=" gap-2 text-[#005DAD] font-semibold w-[12%] flex justify-center  items-center text-lg">
              <input className=" border-[#005DAD] border" type="checkbox" />
              همه
            </h4>

            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
              مجله سلامت <TiArrowSortedDown />
            </h4>

            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
              عنوان
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
              دسته بندی مجله سلامت
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D]">
              نوع مجله سلامت
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D]">
              نام نویسنده <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D]">
              تاریخ بارگذاری
              <TiArrowSortedDown />
            </h4>
          </div>
          {fakeData.map((item) => {
            return (
              <div
                className=" border flex py-3 items-center rounded-lg bg-white shadow-md"
                key={item.id}
              >
                <div className=" w-[11%] flex justify-center items-center">
                  <input className="border-[#005DAD] border" type="checkbox" />
                </div>
                <div className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
                  <img src={hamele} alt="img" width={70} />
                </div>
                <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
                  کودک سالم{" "}
                </h4>
                <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
                  بارداری{" "}
                </h4>
                <h4 className=" text-[#005DAD] w-[12%] flex justify-center items-center ">
                  صوتی{" "}
                </h4>
                <h4 className=" text-[#005DAD] w-[12%] flex justify-center items-center ">
                  دکتر طاهر ثابتیان{" "}
                </h4>
                <h4 className=" text-[#005DAD] w-[12%] flex justify-center items-center ">
                  1403/09/28{" "}
                </h4>
                <button className=" gap-2 border rounded-lg px-2 p-1 flex justify-center items-center bg-[#F2FEF8] border-[#1F7168] text-[#1F7168]">
                  <CiEdit className=" font-bold text-2xl" />
                  ویرایش
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
