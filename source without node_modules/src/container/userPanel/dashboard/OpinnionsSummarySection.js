import React from "react";
import bahram from "../../../assets/Pics/bahramMirzayi.png";
import { RateCounter } from "../../../utils/RateCounter";
import { AiOutlineLike } from "react-icons/ai";

function OpinnionsSummarySection() {
  return (
    <div className=" text-sm lg:w-[350px] xxl:w-[402px] flex flex-col">
      <div className=" border-b border-dashed border-[#D3E9FD] flex gap-2 p-2 items-center">
        <img
          src={bahram}
          width={40}
          alt="profile"
          className=" w-[35px] aspect-square lg:w-[40px] rounded-full border border-[#005DAD]"
        />
        <div className=" flex w-full flex-col">
          <div className=" justify-between flex">
            <div className=" lg:gap-2 flex">
              <h5 className=" text-xs whitespace-nowrap lg:text-base">
                بهرام میرزایی
              </h5>
              |
              <h5 className=" text-xs lg:text-base text-[#757575]">
                متخصص مغز و اعصاب
              </h5>
            </div>
            <RateCounter width={14} rate={5} />
          </div>
          <div className=" flex justify-between items-center">
            <div className=" text-[#1F7168] text-xs flex justify-center items-start">
              <AiOutlineLike />
              <h5>مراجعه به این پزشک را توصیه میکنم</h5>
            </div>
            <button className=" lg:px-2 px-1 whitespace-nowrap lg:p-1 text-xs lg:text-base rounded-full text-[#005DAD] border border-[#005DAD]">
              تائید شده
            </button>
          </div>
        </div>
      </div>
      <div className=" border-b border-dashed border-[#D3E9FD] flex gap-2 p-2 items-center">
        <img
          src={bahram}
          width={40}
          alt="profile"
          className=" w-[35px] aspect-square lg:w-[40px] rounded-full border border-[#005DAD]"
        />
        <div className=" flex w-full flex-col">
          <div className=" justify-between flex">
            <div className=" lg:gap-2 flex">
              <h5 className=" text-xs whitespace-nowrap lg:text-base">
                بهرام میرزایی
              </h5>
              |
              <h5 className=" text-xs lg:text-base text-[#757575]">
                متخصص مغز و اعصاب
              </h5>
            </div>
            <RateCounter width={14} rate={5} />
          </div>
          <div className=" flex justify-between items-center">
            <div className=" text-[#1F7168] text-xs flex justify-center items-start">
              <AiOutlineLike />
              <h5>مراجعه به این پزشک را توصیه میکنم</h5>
            </div>
            <button className=" lg:px-2 px-1 whitespace-nowrap lg:p-1 text-xs lg:text-base rounded-full text-[#005DAD] border border-[#005DAD]">
              تائید شده
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpinnionsSummarySection;
