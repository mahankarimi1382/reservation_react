import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../../assets/Pics/doctor-profile-icon.png";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../../container/doctor-panel/DoctorPanelMenu";
import { PiWarningCircle } from "react-icons/pi";
import { fullNameStorage } from "../../../../store/Store";

function page() {
              const { fullName } = fullNameStorage();

  const fakeData = [
    {
      id: 1,
      name: "ایمان سالارکیا",
      sickness: "فشار خون بالا",
      type: "حضوری ، مطب",
      time: "1403/0402 ",
      hour: " 10:30",
      code: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      sickness: "فشار خون بالا",
      type: "حضوری ، مطب",
      time: "1403/0402 ",
      hour: " 10:30",
      code: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      sickness: "فشار خون بالا",
      type: "حضوری ، مطب",
      time: "1403/0402 ",
      hour: " 10:30",
      code: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      sickness: "فشار خون بالا",
      type: "حضوری ، مطب",
      time: "1403/0402 ",
      hour: " 10:30",
      code: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      sickness: "فشار خون بالا",
      type: "حضوری ، مطب",
      time: "1403/0402 ",
      hour: " 10:30",
      code: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      sickness: "فشار خون بالا",
      type: "حضوری ، مطب",
      time: "1403/0402 ",
      hour: " 10:30",
      code: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      sickness: "فشار خون بالا",
      type: "حضوری ، مطب",
      time: "1403/0402 ",
      hour: " 10:30",
      code: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      sickness: "فشار خون بالا",
      type: "حضوری ، مطب",
      time: "1403/0402 ",
      hour: " 10:30",
      code: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      sickness: "فشار خون بالا",
      type: "حضوری ، مطب",
      time: "1403/0402 ",
      hour: " 10:30",
      code: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      sickness: "فشار خون بالا",
      type: "حضوری ، مطب",
      time: "1403/0402 ",
      hour: " 10:30",
      code: "0024567980",
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
        <div className=" w-[80%] flex gap-7 flex-col">
          <div className=" flex p-3 border border-[#C30505] bg-[#F4F1F5] rounded-xl items-center text-[#C30505] gap-1">
            <PiWarningCircle />
            <h5>
              پزشک گرامی اگر می خواهید نوبت رزرو شده توسط بیمار را کنسل کنید
              لطفا باتوجه به فیلتر روز و ساعت کنسلی را انتخاب کنید.{" "}
            </h5>
          </div>
          <div className=" flex justify-between items-center">
            <h5 className=" font-semibold">جدیدترین نوبت های رزرو شده</h5>
            <button className=" text-sm p-2 px-10 bg-[#EED4D7] rounded-lg text-[#C30505] border border-[#C30505]">
              کنسل کردن نوبت
            </button>
          </div>
          <div className=" flex flex-col w-full rounded-lg border shadow-md bg-white">
            <div className=" py-4 w-full flex rounded-t-lg bg-[#DBEDFF]">
              <h4 className=" w-1/6 flex justify-center  items-center text-[#3F444D] text-lg">
                نام بیمار
              </h4>
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                نام بیماری
              </h4>
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                نوع مراجعه
              </h4>
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                تاریخ
              </h4>
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                ساعت
              </h4>
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                کد ملی
              </h4>
            </div>
            {fakeData.map((item) => {
              return (
                <div
                  className=" border flex py-5 px-4  bg-white "
                  key={item.id}
                >
                  <input type="checkbox" />
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.name}
                  </h4>
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.sickness}
                  </h4>
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.type}
                  </h4>
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.time}
                  </h4>
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.hour}
                  </h4>
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.code}
                  </h4>
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
