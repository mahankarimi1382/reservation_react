import React, { useEffect, useState } from "react";
import takhfif from "../../../assets/Pics/discount-shape.png";
import copy from "../../../assets/Pics/copy-icon.png";
import callender from "../../../assets/Pics/callender-icon-blue.png";
import reminder from "../../../assets/Pics/reminder-icon.png";
import { read_recived_messages } from "../../../api/ApiCalling";

function MessageSummarySection() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // پیغام‌های واقعی کاربر از بک‌اند خوانده می‌شود
  useEffect(() => {
    read_recived_messages()
      .then((list) => {
        setMessages(list ?? []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

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
              {messages[0]?.messageBody?.slice(0, 14) || "—"}
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
      {isLoading && (
        <h5 className=" text-xs text-[#757575] py-4 text-center">در حال بارگذاری…</h5>
      )}
      {!isLoading && messages.length === 0 && (
        <h5 className=" text-xs lg:text-sm text-[#757575] py-4 text-center">
          پیغامی ندارید
        </h5>
      )}
      {messages.slice(0, 2).map((item, index) => (
        <div
          key={item.id ?? index}
          className=" flex gap-2 border-b xl:px-2 px-1 lg:pb-4  border-dashed border-[#C4E2FF] items-center"
        >
          <img src={reminder} alt="icon" width={24} />
          <h5 className=" text-xs lg:text-sm xl:text-base whitespace-nowrap overflow-hidden text-ellipsis">
            {item.messageSubject || item.messageBody || "پیغام جدید"}
          </h5>
        </div>
      ))}
      {!isLoading && messages.length === 0 && (
        <div className=" flex gap-2 border-b xl:px-2 px-1 lg:px-0 lg:pb-4  border-dashed border-[#C4E2FF] items-center">
          <img
            src={callender}
            alt="icon"
            width={24}
            className=" w-[20px] lg:w-[24px]"
          />
          <h5 className=" text-xs lg:text-sm xl:text-base">
            یادآور روز نوبت شما
          </h5>
        </div>
      )}
    </div>
  );
}

export default MessageSummarySection;
