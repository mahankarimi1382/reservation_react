import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../../assets/Pics/doctor-profile-icon.png";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../../container/doctor-panel/DoctorPanelMenu";
import PaidListChart from "../../../../container/doctor-panel/financial-reports/PaidListChart";
import PaideListTable from "../../../../container/doctor-panel/financial-reports/PaidListTable";

function page() {

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
            دکتر طاهر ثابتیان
            <IoIosArrowDown className=" text-xl" />
          </button>
        </div>
        <div className=" w-[80%] flex gap-7 flex-col">
          <div className=" w-full justify-between flex">
            <div className=" bg-white gap-2 p-4 py-7 w-[35%] border shadow-md rounded-3xl flex flex-col">
              <h4 className=" text-lg font-semibold">درآمدها</h4>
              <div className=" py-5 w-full flex justify-between items-center border-b-2">
                <h5>درآمد ویزیت حضوری </h5>
                <h5>142.500.000</h5>
              </div>
              <div className="  w-full py-5 flex justify-between items-center border-b-2">
                <h5>درآمد ویزیت تصویری </h5>
                <h5>142.500.000</h5>
              </div>
              <div className=" w-full py-5 flex justify-between items-center border-b-2">
                <h5>درآمد ویزیت تلفنی </h5>
                <h5>142.500.000</h5>
              </div>
              <div className=" w-full py-5 flex justify-between items-center border-b-2">
                <h5>درآمد ویزیت متنی </h5>
                <h5>142.500.000</h5>
              </div>
              <div className=" mt-4 w-full flex justify-between items-center font-semibold text-lg">
                <h5>مجموع درآمدها</h5>
                <h5>142.500.000</h5>
              </div>
            </div>
            <div className=" w-[60%] gap-10 px-10 p-8 bg-white rounded-3xl border shadow-md flex flex-col">
              <div className=" flex justify-between  items-center">
                <div className=" flex flex-col items-center justify-center gap-2">
                  <h4>موجودی کیف پول</h4>
                  <h4>142.500.000</h4>
                </div>
                <hr className=" w-8 border-2 rounded-full border-[#D9D9D9] rotate-90" />
                <div className=" flex flex-col items-center justify-center gap-2">
                  <h4>موجودی قابل برداشت</h4>
                  <h4>142.500.000</h4>
                </div>
                <hr className=" w-8 border-2 rounded-full border-[#D9D9D9] rotate-90" />
                <div className=" flex flex-col items-center justify-center gap-2">
                  <h4>تعداد تراکش کیف پول</h4>
                  <h4>142.500.000</h4>
                </div>
              </div>
              <PaidListChart />
            </div>
          </div>
          <PaideListTable />
        </div>
      </div>
    </div>
  );
}

export default page;
