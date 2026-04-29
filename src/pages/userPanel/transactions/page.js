import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React from "react";
import tick from "../../../assets/Pics/tick-circle.png";
import cross from "../../../assets/Pics/close-circle.png";
import { UserPanel_PhoneTitle } from "../dashboard/page";
function page() {
  const transActions = [
    {
      id: 1,
      isSucsec: true,
      caption:
        " مبلغ 15,000 تومان بابت سفارش 349871259 در تاریخ 1403/06/12 ساعت 19:49:32 از کیف پول کاهش یافت.",
    },
    {
      id: 2,
      isSucsec: true,
      caption:
        " مبلغ 15,000 تومان بابت سفارش 349871259 در تاریخ 1403/06/12 ساعت 19:49:32 از کیف پول کاهش یافت.",
    },
    {
      id: 3,
      isSucsec: false,
      caption:
        " مبلغ 15,000 تومان بابت سفارش 349871259 در تاریخ 1403/06/12 ساعت 19:49:32 از کیف پول کاهش یافت.",
    },
    {
      id: 4,
      isSucsec: true,
      caption:
        " مبلغ 15,000 تومان بابت سفارش 349871259 در تاریخ 1403/06/12 ساعت 19:49:32 از کیف پول کاهش یافت.",
    },
    {
      id: 5,
      isSucsec: true,
      caption:
        " مبلغ 15,000 تومان بابت سفارش 349871259 در تاریخ 1403/06/12 ساعت 19:49:32 از کیف پول کاهش یافت.",
    },
  ];
  return (
    <div dir="rtl" className=" bg-[#F6FBFF] w-full">
      <Navbar />
      <UserPanel_PhoneTitle />

      <div className=" flex w-full items-start">
        <UserPanelMenue />
        <div className="  w-[90%] lg:w-[82%] mx-auto flex justify-center">
          <div className=" mb-20 lg:mb-0  flex flex-col  shadow-lg bg-white rounded-lg w-full lg:w-[91%] p-2 lg:px-5">
            {transActions.map((item) => {
              return (
                <div
                  className=" flex lg:py-5 py-2 border-green-600 lg:text-lg text-xs lg:items-center items-start lg:gap-2 border-b-2 border-dashed last:border-none"
                  key={item.id}
                >
                  <img
                    src={item.isSucsec ? tick : cross}
                    alt="icon"
                    className=" w-[20px] lg:w-[32px]"
                    width={32}
                  />
                  <div className=" inline">
                    {item.isSucsec ? (
                      <span className=" text-green-600">تراکنش موفق:</span>
                    ) : (
                      <span className=" text-red-600">تراکنش نا موفق:</span>
                    )}
                    <span
                      className={
                        item.isSucsec ? "text-green-600" : "text-red-600"
                      }
                    >
                      {item.caption}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
