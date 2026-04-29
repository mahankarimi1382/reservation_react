import {  CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../../assets/Pics/doctor-profile-icon.png";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../../container/doctor-panel/DoctorPanelMenu";
import monitor_mobbile from "../../../../assets/Pics/doctorPanel/monitor-mobbile.png";
import buliding from "../../../../assets/Pics/doctorPanel/buliding.png";
import DoctorWorkCalendar from "../../../../container/doctor-panel/reservation-managment/DoctorWorkCalendar";
import setting from "../../../../assets/Pics/doctorPanel/setting.png";
import { Switch } from "@mui/material";
function page() {
  return (
    <div dir="rtl" className="flex pb-20  bg-[#F6FBFF]">
      <DoctorPanelMenu />
      <div className=" mt-10 w-full flex flex-col gap-7 items-center">
        <div className=" flex justify-between items-center w-[80%]">
          <label className=" w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between ">
            <input className=" w-full outline-none" placeholder="جستجو" />
            <CiSearch className=" text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>
          <button className=" flex justify-center items-center p-2 border text-[#005DAD] gap-2 border-[#005DAD] rounded-xl">
            <img src={DoctorProfIcon} width={24} alt="icon" />
            دکتر طاهر ثابتیان
            <IoIosArrowDown className=" text-xl" />
          </button>
        </div>
        <div className=" gap-8 w-[80%]  rounded-xl shadow-lg bg-white flex flex-col p-5">
          <div className=" text-xl flex gap-1 items-center">
            <h5>تقویم کاری</h5>
            <p className=" text-red-600 text-sm">
              ( پزشک گرامی لطفا محل ویزیت خود را انتخاب کنید و بعد تقویم کاری
              خود را پر کنید )
            </p>
          </div>
          <div className=" flex justify-center items-center gap-10">
            <button className=" text-[#979797] bg-[#F7F7F7] rounded-lg border border-[#979797] p-2 px-10 flex justify-center items-center gap-2">
              <img src={buliding} alt="icon" width={24} />
              نوبت مطب ونک
            </button>
            <button className="  text-[#979797] bg-[#F7F7F7] rounded-lg border border-[#979797] p-2 px-10 flex justify-center items-center gap-2">
              <img src={monitor_mobbile} alt="icon" width={24} />
              نوبت مشاوره آنلاین
            </button>{" "}
          </div>
        </div>
        <div className=" w-[80%] flex justify-between items-start">
          <div className=" flex flex-col gap-5">
            <DoctorWorkCalendar />
            <h3 className=" font-semibold bg-[rgba(238,161,250,0.53)] rounded-2xl p-3">
              روز 10 آبان در مجموع 10 نوبت غیر حضوری دارید{" "}
            </h3>
            <h3 className=" font-semibold bg-[rgba(248,238,147,0.68)] rounded-2xl p-3">
              روز 10 آبان در مجموع 10 نوبت غیر حضوری دارید{" "}
            </h3>
            <h3 className=" font-semibold bg-[rgba(184,250,161,0.5)] rounded-2xl p-3">
              روز 10 آبان در مجموع 10 نوبت غیر حضوری دارید{" "}
            </h3>
          </div>
          <div className=" gap-5 bg-white p-3 py-5 shadow-md rounded-[30px] w-[550px] flex flex-col">
            <h5 className=" flex gap-1 items-center  font-semibold">
              <img src={setting} width={20} alt="icon" />
              تنظیمات نوبت حضوری
            </h5>
            <div className=" flex items-start justify-between">
              <div className=" flex-col gap-6 flex w-[45%]">
                <div className=" flex  items-center justify-between">
                  <h4>تعداد افراد در هر بازه:</h4>
                  <input className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border" />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>زمان کنسل نوبت (دقیقه):</h4>
                  <input className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border" />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>از ساعت:</h4>
                  <input className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border" />
                </div>
              </div>
              <div className=" flex-col gap-6  flex w-[45%]">
                <div className=" flex items-center justify-between">
                  <h4>بازه زمانی نوبت (دقیقه):</h4>
                  <input className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border" />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>تعداد نوبت :</h4>
                  <input className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border" />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>تا ساعت:</h4>
                  <input className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border" />
                </div>
              </div>
            </div>
            <hr className="border-2 rounded-xl" />
            <div className=" flex flex-col gap-3">
              <div className=" flex justify-between items-center">
                <h5>ویزیت در روز های تعطیل رسمی</h5>
                <Switch />
              </div>
              <div className=" flex justify-between items-center">
                <h5>ویزیت در روز های جمعه</h5>
                <Switch />
              </div>
              <hr className="border-2 rounded-xl" />

              <div className=" w-full flex justify-center gap-10 items-center">
                <button className=" bg-[rgba(230,35,51,0.15)] text-[#E62333F2] border border-[#E62333F2] p-3 w-1/3 rounded-lg">
                  انصراف
                </button>
                <button className=" bg-[#005DAD] text-white  p-3 w-1/3 rounded-lg">
                  ثبت تغییرات
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
