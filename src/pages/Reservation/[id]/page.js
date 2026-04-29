import React from "react";
import { PiWarningCircle } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import star from "../../../assets/Pics/star.png";
import bahramMirzayi from "../../../assets/Pics/bahramMirzayi.png";
import CallenderAndTime from "../../../container/reservation/CallenderAndTime";
function page() {
  return (
    <div dir="rtl" className=" bg-[#F5F5F5] flex justify-center items-center">
      <div className=" w-[90%] py-10 bg-white flex flex-col gap-10 justify-center items-center rounded-xl">
        <div className=" w-[90%] gap-5 flex flex-col justify-center items-center">
          <div className="px-5 justify-center  w-[90%] h-[188px] bg-white rounded-xl flex flex-col shadow-md">
            <div className=" flex justify-between  items-center">
              <div className=" justify-center items-center gap-5 flex">
                <img
                  src={bahramMirzayi}
                  alt="profile"
                  width={145}
                  className=" rounded-full border border-[#005DAD]"
                />
                <div className=" flex flex-col gap-5">
                  <h2 className=" text-[28px]">بهرام میرزایی</h2>
                  <h5 className=" text-[20px] text-[#757575]">
                    متخصص مغز و اعصاب
                  </h5>
                </div>
              </div>
              <div className=" flex flex-col gap-6">
                <p className=" rounded flex justify-center p-1 bg-[#F0F0F0] text-[#1F7168] text-[12px] items-center">
                  <AiFillLike className=" text-xl" />
                  97% پیشنهاد کابران دکتر رزرو
                </p>
                <p className="flex items-center gap-1">
                  <img src={star} width={22} alt="star" />
                  4.5/5 از (نظر 320)
                </p>
              </div>
            </div>
            <h2 className="  flex px-40 text-[#005DAD] items-center gap-1">
              <PiWarningCircle />
              توجه : ساعت رزرو شما در سایت به منزله ی حضور شما در مطب است نه
              نوبت شما.
            </h2>
          </div>

          <h2 className=" w-[90%] text-[#AE0816F2] flex text-[20px] items-center gap-1">
            <PiWarningCircle />
            لطفا تاریخ و ساعتی که می خواهید با دکتر بهرام میرزایی رزرو کنید را
            انتخاب نمایید.
          </h2>
        </div>
        <CallenderAndTime />

      </div>
    </div>
  );
}

export default page;
