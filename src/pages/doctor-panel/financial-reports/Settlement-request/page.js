import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../../assets/Pics/doctor-profile-icon.png";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../../container/doctor-panel/DoctorPanelMenu";
import printer from "../../../../assets/Pics/doctorPanel/printer.png";
import { GoPlus } from "react-icons/go";
import { fullNameStorage } from "../../../../store/Store";

function page() {
              const { fullName } = fullNameStorage();

  const fakeData = [
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
  ];
  return (
    <div dir="rtl" className="flex pb-20  bg-[#F6FBFF]">
      <DoctorPanelMenu />
      <div className=" mt-10 w-full flex flex-col gap-7 items-center">
        <div className=" flex justify-between items-center w-[80%]">
          <label className=" bg-white w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between ">
            <input className=" w-full outline-none" placeholder="جستجو" />
            <CiSearch className=" text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>
          <button className=" flex justify-center items-center p-2 border text-[#005DAD] gap-2 border-[#005DAD] rounded-xl">
            <img src={DoctorProfIcon} width={24} alt="icon" />
            دکتر {fullName}
            <IoIosArrowDown className=" text-xl" />
          </button>
        </div>
        <div className=" w-[80%] flex bg-white rounded-3xl shadow-md border  flex-col ">
          <div className=" border-b flex justify-between p-5 items-center">
            <h3 className=" text-xl font-semibold text-[#005DAD]">
              درخواست های تسویه
            </h3>
            <div className="  flex justify-center gap-5">
              <button className=" text-[#979797] flex justify-center items-center gap-2 p-2 px-4 border rounded-lg">
                <img src={printer} alt="icon" width={24} />
                پرینت
              </button>
              <button className=" bg-[#005DAD] text-white flex justify-center items-center px-2 gap-2  border rounded-lg">
                <GoPlus className=" text-3xl text-white" />
                ثبت درخواست جدید
              </button>
            </div>
          </div>
          <div className=" flex w-full border-b p-3 px-5 text-[#6B6B6B] justify-between">
            <h5>شناسه</h5>
            <h5>تاریخ درخواست</h5>
            <h5>مبلغ تسویه</h5>
            <h5>وضعیت بانک</h5>
            <h5>تاریخ واریز</h5>
            <h5>شناسه واریز</h5>
          </div>
          {fakeData.map((item) => {
            return (
              <div
                className=" flex w-full p-3 px-5 text-[#6B6B6B] justify-between border-b last:border-none"
                key={item.id}
              >
                <h5>NBGT87XDF</h5>
                <h5>1403/09/04</h5>
                <h5>250,000 تومان</h5>
                <h5 className=" text-green-500">واریز شد</h5>
                <h5>1403/09/25</h5>
                <h5>54973012</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
