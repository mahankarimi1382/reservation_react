import React from "react";
import coins from "../../../assets/Pics/coins-icon.png";
import ticket from "../../../assets/Pics/ticket-icon.png";

/*
 * سیستم امتیاز و جایزه هنوز در بک‌اند وجود ندارد (Endpoint ای ثبت نشده)؛
 * تا هنگام افزودن API، مقادیر واقعی صفر و حالت خالی نمایش داده می‌شود
 */
function RewardsSummarySection() {
  return (
    <div className=" gap-5 xl:px-0 lg:pt-5 text-sm xxl:w-[190px] flex flex-col">
      <div className=" text-xs lg:text-base flex border-b border-dashed border-[#C4E2FF] pb-5 flex-col justify-center items-center">
        <div className=" flex xl:gap-2">
          <img width={24} className=" aspect-square w-[18px] lg:w-[24px]" src={coins} alt="icon" />
          <h5>مجموع امتیازات شما :</h5>{" "}
        </div>
        <p>0 امتیاز</p>
      </div>
      <div className=" gap-2 flex border-b border-dashed border-[#C4E2FF] pb-5 flex-col justify-center items-center">
        <div className=" flex gap-2">
          <img width={24} className=" w-[20px] aspect-square lg:w-[24px]" src={ticket} alt="icon" />
          <h5 className=" text-xs lg:text-base">جایزه های دریافتی</h5>{" "}
        </div>
        <h5 className=" text-xs text-[#757575] text-center">
          هنوز جایزه‌ای دریافت نکرده‌اید
        </h5>
      </div>
    </div>
  );
}

export default RewardsSummarySection;
