import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React, { useEffect, useState } from "react";
import reminderIcon from "../../../assets/Pics/reminder-icon-black.png";
import disCountShapeBlack from "../../../assets/Pics/discount-shape-black.png";
import reminderIconBlue from "../../../assets/Pics/reminder-icon.png";
import { UserPanel_PhoneTitle } from "../dashboard/page";
import { read_recived_messages } from "../../../api/ApiCalling";
import { SyncLoader } from "react-spinners";

function page() {
  const messageTypeFilters = [
    { id: 1, type: "همه", isSelect: true, icon: null },
    { id: 1, type: "اطلاع رسانی", isSelect: true, icon: reminderIcon },
    { id: 1, type: "کد تخفیف", isSelect: true, icon: disCountShapeBlack },
  ];
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("همه");

  // پیام‌های سایت (اطلاع‌رسانی/یادآوری) از بک‌اند خوانده می‌شوند
  useEffect(() => {
    read_recived_messages()
      .then((list) => {
        setMessages(list);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const visibleMessages = messages.filter((item) => {
    if (activeFilter === "همه") return true;
    if (activeFilter === "کد تخفیف") return item.messageType === 2;
    return item.messageType !== 2;
  });

  return (
    <div dir="rtl" className=" bg-[#F6FBFF] w-full">
      <Navbar />
      <UserPanel_PhoneTitle />

      <div className=" w-full flex mb-20 lg:mb-0">
        <UserPanelMenue />
        <div className=" flex mx-auto w-[90%] lg:w-[82%] flex-col items-center">
          <div className=" lg:w-[80%]">
            <div className=" border-b lg:pb-5 w-full flex items-center lg:gap-5 gap-2 pb-2">
              {messageTypeFilters.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setActiveFilter(item.type)}
                    className={` text-sm lg:text-base flex justify-center items-center p-1 lg:p-2 gap-1 rounded-md ${
                      activeFilter === item.type
                        ? " bg-[#005DAD] text-white"
                        : " bg-[rgba(203,203,203,0.17)]"
                    }`}
                  >
                    {item.icon && (
                      <img src={item.icon} alt="icon" className=" lg:w-[24px] w-[20px]" width={24} />
                    )}
                    {item.type}
                  </button>

                );
              })}

            </div>
            {isLoading && (
              <div className=" flex justify-center py-10">
                <SyncLoader color="#005DAD" />
              </div>
            )}
            {!isLoading && visibleMessages.length === 0 && (
              <h5 className=" text-center text-[#757575] py-10">
                پیامی برای نمایش وجود ندارد
              </h5>
            )}
            <div className=" flex flex-col justify-center mt-2 lg:mt-5 items-center gap-2 lg:gap-5">
              {visibleMessages.map((item, index) => {
                return (
                  <div
                    className=" border p-4 w-full relative shadow-md flex flex-col rounded-lg"
                    key={item.id ?? index}
                  >
                    <h5 className=" bg-[#B7F0B7] px-2 rounded-b-md top-0 left-5 text-[#00BA00] absolute">
                      جدید
                    </h5>
                    <div className=" flex items-center gap-2">
                      <img className=" w-[24px] lg:w-[32px]" width={32} src={reminderIconBlue} alt="icon" />
                      <h5>{item.messageSubject ?? item.title ?? "اطلاع رسانی"}</h5>
                    </div>
                    <p className=" text-sm text-[#737373]">{item.messageBody ?? item.caption}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
