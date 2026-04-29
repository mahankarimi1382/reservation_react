import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React from "react";
import bahram from "../../../assets/Pics/bahramMirzayi.png";
import personIcon from "../../../assets/Pics/frame.png";
import { AiOutlineLike } from "react-icons/ai";
import startIcon from "../../../assets/Pics/star.png";
import { UserPanel_PhoneTitle } from "../dashboard/page";
import { MdOutlineVerified } from "react-icons/md";

function page() {
  return (
    <div dir="rtl" className="bg-[#F6FBFF] w-full">
      <Navbar />
      <UserPanel_PhoneTitle />
      <div className=" w-full flex lg:flex-row flex-col">
        <UserPanelMenue />
        <div className=" lg:w-[82%] h-screen  flex justify-center">
          <div className=" w-[90%]  flex flex-col gap-5 items-center">
            <div className=" lg:gap-5 flex w-full flex-col lg:p-5 border lg:border-none p-2 bg-white rounded-lg">
              <div className=" flex w-full justify-between ">
                <div className=" flex  justify-center items-center lg:gap-5 gap-2">
                  <img
                    src={bahram}
                    className=" lg:w-[83px] w-[72px] rounded-full border border-[#005DAD] "
                    alt="doctor-profile"
                    width={83}
                  />
                  <div className=" justify-center lg:gap-4 flex flex-col">
                    <h2 className=" lg:text-xl text-sm">بهرام میرزایی</h2>
                    <p className=" text-sm text-[#757575]">متخصص مغز و اعصاب</p>
                  </div>
                </div>
                <div className=" flex flex-col gap-2 lg:gap-10">
                  <div className=" flex justify-between lg:gap-10 items-center">
                    <h5 className=" text-[#005DAD] flex justify-center items-center text-xs">
                      <img src={personIcon} alt="icon" width={18} />
                      مراجعه حضوری
                    </h5>
                    <MdOutlineVerified className=" text-[#005DAD] lg:hidden text-lg" />

                    <h5 className=" hidden text-xs text-center whitespace-nowrap lg:flex lg:p-1 lg:px-2 rounded-full border text-[#005DAD] border-[#005DAD]">
                      تایید شده
                    </h5>
                  </div>
                  <div className=" flex justify-center items-center lg:gap-2 text-[#1F7168]">
                    <AiOutlineLike />
                    <p className=" text-xs lg:text-base">
                      مراجعه به این پزشک را توصیه میکنم
                    </p>
                    <div className=" hidden lg:flex justify-center gap-1 items-center">
                      <h5>5</h5>
                      <img
                        className=" -mt-1"
                        width={18}
                        src={startIcon}
                        alt="icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className=" text-xs  text-[#757575] ">
                <span className=" font-semibold text-sm lg:text-base text-black">
                  نظر درباره پزشک :{" "}
                </span>
                دکتر بهرام میرزایی دکتری بسیار ماهر و خبره هستند در کارشان و من
                چند سال بیمار بودم ولی متاسفانه هیچ پزشکی نتوانست کمکم کند در
                درمان ولی دکتر بهرامی مرا نجات دادند
              </p>
              <hr className=" mt-5 border" />
              <div className=" w-full flex text-sm lg:text-base justify-between items-center">
                <h5>ثبت نظر : 1403/09/23</h5>
                <div className=" flex justify-center items-center gap-2">
                  <AiOutlineLike className=" text-[#414141]" />
                  این نظر برای 10 نفر مفید بود
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
