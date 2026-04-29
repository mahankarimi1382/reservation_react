import React from "react";
import takhfif from "../../../assets/Pics/discount-shape.png";
import copy from "../../../assets/Pics/copy-icon.png";
import callender from "../../../assets/Pics/callender-icon-blue.png";
import reminder from "../../../assets/Pics/reminder-icon.png";
function MessageSummarySection() {
  return (
    <div className=" text-sm gap-5 lg:pt-5  xxl:w-[284px] flex flex-col">
      <div className=" border-b xl:px-2 border-dashed pb-4 flex flex-col border-[#C4E2FF] ">
        <div className=" flex gap-1 xl:gap-2 items-center">
          <img
            src={takhfif}
            alt="icon"
            width={24}
            className=" w-[20px] aspect-square lg:w-[24px]"
          />
          <h5 className=" text-xs lg:text-base">کد تخفیف</h5>
        </div>
        <div className="   xl:w-full p-1 lg:p-0 xl:p-2 bg-[#D3E9FD] justify-center items-center gap-1 rounded-lg flex">
          <div className=" bg-white rounded-md xl:w-[70%] flex justify-center items-center">
            <h5 className=" text-xs xl:text-base font-semibold text-[#7E7E7E]">
              FGK98MNB3LXZ9Q
            </h5>
          </div>
          <img
            src={copy}
            alt="icon"
            width={24}
            className=" w-[20px] lg:w-[24px] aspect-square"
          />
          <h5 className=" text-xs xl:text-base text-ellipsis">کپی</h5>
        </div>
      </div>
      <div className=" flex gap-2 border-b xl:px-2 px-1 lg:px-0 lg:pb-4  border-dashed border-[#C4E2FF] items-center">
        <img
          src={callender}
          alt="icon"
          width={24}
          className=" w-[20px] lg:w-[24px]"
        />
        <h5 className=" text-xs lg:text-sm xl:text-base">
          یک پیام از طرف پزشک
        </h5>
      </div>
      <div className=" flex gap-2 border-b xl:px-2 px-1 lg:pb-4  border-dashed border-[#C4E2FF] items-center">
        <img src={reminder} alt="icon" width={24} />
        <h5 className=" text-xs lg:text-sm xl:text-base">
          یادآور روز نوبت شما
        </h5>
      </div>
    </div>
  );
}

export default MessageSummarySection;
