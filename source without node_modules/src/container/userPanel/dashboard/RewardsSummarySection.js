import React from "react";
import coins from "../../../assets/Pics/coins-icon.png";
import ticket from "../../../assets/Pics/ticket-icon.png";
import eye from "../../../assets/Pics/Specialties/eye-icon.png";
function RewardsSummarySection() {
  return (
    <div className=" gap-5 xl:px-0 lg:pt-5 text-sm xxl:w-[190px] flex flex-col">
      <div className=" text-xs lg:text-base flex border-b border-dashed border-[#C4E2FF] pb-5 flex-col justify-center items-center">
        <div className=" flex xl:gap-2">
          <img width={24} className=" aspect-square w-[18px] lg:w-[24px]" src={coins} alt="icon" />
          <h5>مجموع امتیازات شما :</h5>{" "}
        </div>
        <p>123,000 امتیاز</p>
      </div>
      <div className=" gap-2 flex border-b border-dashed border-[#C4E2FF] pb-5 flex-col justify-center items-center">
        <div className=" flex gap-2">
          <img width={24} className=" w-[20px] aspect-square lg:w-[24px]" src={ticket} alt="icon" />
          <h5 className=" text-xs lg:text-base">جایزه های دریافتی</h5>{" "}
        </div>
        <div className=" flex gap-1 flex-col lg:flex-row  text-xs">
          <span className=" flex justify-center items-center border rounded-lg  p-1">
            <img width={20} src={eye} alt="icon" />
            <h5>چشم پزشکی</h5>
          </span>
          <span className=" flex justify-center items-center border rounded-lg  p-1">
            <img width={20} src={eye} alt="icon" />
            <h5>چشم پزشکی</h5>
          </span>
        </div>
        <div className=" flex-col lg:flex-row flex gap-1  text-xs">
          <span className=" flex justify-center items-center border rounded-lg  p-1">
            <img width={20} src={eye} alt="icon" />
            <h5>چشم پزشکی</h5>
          </span>
          <span className=" flex justify-center items-center border rounded-lg  p-1">
            <img width={20} src={eye} alt="icon" />
            <h5>چشم پزشکی</h5>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RewardsSummarySection;
