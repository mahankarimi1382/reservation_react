import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../assets/Pics/doctor-profile-icon.png";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../container/doctor-panel/DoctorPanelMenu";
import { PiWarningCircle } from "react-icons/pi";
import { fullNameStorage } from "../../../store/Store";
import ProfileDropdown from "../../../components/ProfileDropdown";

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
         <ProfileDropdown
            fullName={fullName}
            title="دکتر"

          />
        </div>
        <div className=" w-[80%] flex gap-7 flex-col">
          <div className=" flex p-3 border border-[#005DAD] bg-[#ECF6FF] rounded-xl items-center text-[#005DAD] gap-1">
            <PiWarningCircle />
            <h5>
              لیست زیر شامل بیماران شما در مطب انتخاب شده می باشد در صورت نیاز
              مطب خود را تغییر دهید.
            </h5>
          </div>

          <div className=" flex flex-col w-full rounded-lg border shadow-md bg-white">
            <div className=" py-4 w-full flex rounded-t-lg bg-[#DBEDFF]">
              <h4 className=" w-1/6 flex justify-center  items-center text-[#3F444D] text-lg">
                کد پیگیری
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                نام بیمار
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                شماره نوبت
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                آخرین ویزیت
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                کدملی
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg"></h4>
            </div>
            {fakeData.map((item) => {
              return (
                <div
                  className=" border flex py-5 px-4  bg-white "
                  key={item.id}
                >
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.code}
                  </h4>
                  <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                    {item.name}
                  </h4>
                  <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                    1
                  </h4>
                  <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                    17 ساعت پیش
                  </h4>
                  <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                    0024175749
                  </h4>
                  <button className=" border border-[#005DAD] text-[#005DAD] bg-[#DBEDFF] p-2 rounded-lg w-[18%] flex justify-center items-center text-lg">
                    مشاهده جزییات
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
