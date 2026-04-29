import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React from "react";
import reminderIcon from "../../../assets/Pics/reminder-icon-black.png";
import disCountShapeBlack from "../../../assets/Pics/discount-shape-black.png";
import reminderIconBlue from "../../../assets/Pics/reminder-icon.png";
import { UserPanel_PhoneTitle } from "../dashboard/page";
function page() {
  const messageTypeFilters = [
    { id: 1, type: "همه", isSelect: true, icon: null },
    { id: 1, type: "اطلاع رسانی", isSelect: true, icon: reminderIcon },
    { id: 1, type: "کد تخفیف", isSelect: true, icon: disCountShapeBlack },
  ];
  const messages = [
    {
      id: 1,
      title: "یادآوری",
      icon: reminderIconBlue,
      caption:
        "کاربر گرامی ایمان خسروی شما در روز پنجشنبه 1403/06/12  ساعت 14:00  با دکتر بهرام میرزایی وقت دارید.",
    },
    {
      id: 2,
      title: "یادآوری",
      icon: reminderIconBlue,
      caption:
        "کاربر گرامی ایمان خسروی شما در روز پنجشنبه 1403/06/12  ساعت 14:00  با دکتر بهرام میرزایی وقت دارید.",
    },
    {
      id: 3,
      title: "یادآوری",
      icon: reminderIconBlue,
      caption:
        "کاربر گرامی ایمان خسروی شما در روز پنجشنبه 1403/06/12  ساعت 14:00  با دکتر بهرام میرزایی وقت دارید.",
    },
  ];
  return (
    <div dir="rtl" className=" bg-[#F6FBFF] w-full">
      <Navbar />
      <UserPanel_PhoneTitle />

      <div className=" w-full flex mb-20 lg:mb-0">
        <UserPanelMenue />
        <div className=" flex mx-auto w-[90%] lg:w-[82%] flex-col items-center">
          <div className=" lg:w-[80%]">
            <div className=" border-b lg:pb-5 w-full flex items-center lg:gap-5 gap-2 pb-2">
              {messageTypeFilters.map((item) => {
                return (
                  <button
                    key={item.id}
                    className=" text-sm lg:text-base flex justify-center items-center p-1 lg:p-2 gap-1 bg-[rgba(203,203,203,0.17)] rounded-md"
                  >
                    {item.icon && (
                      <img src={item.icon} alt="icon" className=" lg:w-[24px] w-[20px]" width={24} />
                    )}
                    {item.type}
                  </button>
                  
                );
              })}
              
            </div>
            
            <div className=" flex flex-col justify-center mt-2 lg:mt-5 items-center gap-2 lg:gap-5">
              {messages.map((item) => {
                return (
                  <div
                    className=" border p-4 w-full relative shadow-md flex flex-col rounded-lg"
                    key={item.id}
                  >
                    <h5 className=" bg-[#B7F0B7] px-2 rounded-b-md top-0 left-5 text-[#00BA00] absolute">
                      جدید
                    </h5>
                    <div className=" flex items-center gap-2">
                      <img className=" w-[24px] lg:w-[32px]" width={32} src={reminderIconBlue} alt="icon" />
                      <h5>{item.title}</h5>
                    </div>
                    <p className=" text-sm text-[#737373]">{item.caption}</p>
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
