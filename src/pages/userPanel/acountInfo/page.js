import {
  ApllyEditButt,
  EditUserInfoButt,
  ManOrWomanButt,
} from "../../../components/Buttons/Button";
import {
  AcountInfoInputs,
  BirthDayInput,
  CitySelect,
} from "../../../components/Inputs/Input";
import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React from "react";
import { UserPanel_PhoneTitle } from "../dashboard/page";

function page() {
  return (
    <div dir="rtl" className=" bg-[#F6FBFF] pb-20 lg:pb-0 w-full">
      <Navbar />
      <UserPanel_PhoneTitle />
      <div className=" flex w-full justify-center lg:justify-start">
        <UserPanelMenue />
        <div className=" lg:w-[82%] w-full  flex justify-center lg:h-screen">
          <div className=" bg-white lg:w-[90%] xl:w-[70%] w-[90%] lg:h-[620px] flex flex-col rounded-xl shadow-md border ">
            <span className="  flex p-2 text-xs lg:text-base items-center w-full justify-end  ">
              <EditUserInfoButt />
            </span>
            <div className=" gap-4 flex flex-col lg:flex-row py-4 lg:p-10 lg:flex-wrap lg:justify-between items-center lg:items-start">
              {/* <div className=" flex flex-col gap-2 lg:gap-0"> */}
              <AcountInfoInputs title="نام" />
              <AcountInfoInputs title="نام خانوادگی" />
              <AcountInfoInputs title="آدرس ایمیل" />
              <AcountInfoInputs title="شماره تماس" />
              <AcountInfoInputs title="کد ملی" />
              <div className=" lg:w-[48%] w-[90%] flex flex-col gap-2">
                <h2>تاریخ تولد</h2>
                <BirthDayInput />
              </div>
              <div className=" lg:w-[48%] w-[90%]  flex flex-col gap-2">
                <h2>جنسیت</h2>
                <div className=" w-full flex justify-between items-center">
                  <ManOrWomanButt gender="آقا" />
                  <ManOrWomanButt gender="خانم" />
                </div>
              </div>
              <div className="lg:w-[48%] w-[90%]  flex flex-col gap-2">
                <h2>بیمه</h2>
                <CitySelect isWfull />
              </div>
              <div className=" lg:w-[48%] w-[90%]  flex flex-col gap-2">
                <h2>شهر</h2>
                <CitySelect isWfull />
                {/* </div> */}
              </div>
              {/* <div className=" flex flex-col gap-2 lg:gap-0"> */}

              <div className=" lg:w-[48%] w-[90%]  flex flex-col gap-2">
                <h2>استان</h2>
                <CitySelect isWfull />
              </div>
            </div>
            {/* <p className=" text-[#005DAD]">
              برای تغییر هر بخش از اطلاعات کافی است به روی آن کلیک کنید و پس از
              اعمال تغییرات بر روی دکمه ذخیره کلیک کنید
            </p> */}
            {/* </div> */}
            <div className=" w-full justify-center flex px-5">
              <ApllyEditButt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
