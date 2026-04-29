import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React from "react";
import coins from "../../../assets/Pics/coins.png";
import giftBox from "../../../assets/Pics/RewardsIcon/gift-box.png";
import document from "../../../assets/Pics/RewardsIcon/document.png";
import questionMarks from "../../../assets/Pics/RewardsIcon/question-marks.png";
import eye from "../../../assets/Pics/Specialties/eye-icon.png";
import rewardImg from "../../../assets/Pics/rewardImage.png";
import coinIcon from "../../../assets/Pics/coinIcon.png";
import { UserPanel_PhoneTitle } from "../dashboard/page";
function page() {
  return (
    <div dir="rtl" className=" bg-[#F6FBFF] w-full">
      <Navbar />
      <UserPanel_PhoneTitle />
      <div className=" lg:mb-0 w-full lg:h-full flex flex-col h-screen lg:flex-row">
        <UserPanelMenue />
        <div className=" lg:mb-0 lg:w-[82%] flex justify-center ">
          <div className=" lg:min-w-1/2 gap-5 w-full  lg:w-1/2  absolute flex flex-col items-center justify-center ">
            <div className=" justify-between lg:p-10 items-center  flex lg:h-[170px] w-[90%] lg:w-full rounded-lg bg-gradient-to-r from-[#DBEDFF] to-[#B0DAFF]">
              <img
                src={coins}
                className=" mt-5 lg:w-[282px] w-[135px]"
                alt="coins-Image"
                width={282}
              />
              <h4 className=" text-[#005DAD] text-sm lg:text-xl">
                مجموع امتیازات شما : 12300 امتیاز
              </h4>
            </div>
            <div className=" border-b-2 pb-5 lg:py-0 lg:pb-5 flex justify-between w-[90%] items-center">
              <button className=" text-xs lg:text-base border border-[#005DAD] text-[#005DAD] flex justify-center items-center lg:px-3 p-1 rounded-lg">
                <img
                  className=" lg:w-[40px] w-[20px]"
                  src={giftBox}
                  alt="icon"
                  width={40}
                />
                جایزه های دریافتی
              </button>
              <button className=" text-xs lg:text-base border border-[#005DAD] text-[#005DAD] flex justify-center items-center px-3 p-1 rounded-lg">
                <img
                  className=" lg:w-[40px] w-[20px]"
                  src={document}
                  alt="icon"
                  width={40}
                />
                تاریخچه امتیازها
              </button>
              <button className=" text-xs lg:text-base border border-[#005DAD] text-[#005DAD] flex justify-center items-center px-3 p-1 rounded-lg">
                <img
                  src={questionMarks}
                  alt="icon"
                  width={40}
                  className=" lg:w-[40px] w-[20px]"
                />
                پرسش های پرتکرار
              </button>
            </div>
            <div className="  flex justify-between w-[90%] lg:w-full items-center">
              <button className=" lg:p-2 bg-[rgba(211,233,253,0.79)] rounded-lg p-1 lg:px-4 text-[#005DAD]">
                همه
              </button>
              <button className=" bg-[rgba(206,206,206,0.17)] lg:p-2 rounded-lg p-1 lg:px-4 flex justify-center items-center gap-2">
                <img width={20} src={eye} alt="icon" />
                چشم پزشکی
              </button>
              <button className=" bg-[rgba(206,206,206,0.17)] lg:p-2 rounded-lg p-1 lg:px-4 flex justify-center items-center gap-2">
                <img width={20} src={eye} alt="icon" />
                چشم پزشکی
              </button>
            </div>
            <div className=" lg:w-full w-[90%] flex flex-col justify-center items-center gap-2">
              <div className=" shadow-md flex flex-col w-full pb-5 bg-white rounded-lg">
                <div className=" flex w-full justify-start p-3 gap-5">
                  <img
                    src={rewardImg}
                    alt="img"
                    className=" rounded lg:w-[261px] w-[104px]"
                    width={261}
                  />
                  <div className=" text-sm lg:text-base flex flex-col">
                    <h5>120,000 تومان تخفیف برای خدمات چشم پزشکی</h5>
                    <h5 className=" flex gap-2 items-center text-[#FF9923]">
                      <img
                        width={32}
                        className=" w-[25px] lg:w-[32px]"
                        src={coinIcon}
                        alt="coin-icon"
                      />
                      11,000 امتیاز مورد نیاز
                    </h5>
                  </div>
                </div>
                <div className=" flex justify-center items-center">
                  <span className=" -mr-5 w-8 rounded-full h-8 bg-[#F4FAFF]"></span>
                  <hr className=" border-[#D3E9FD] border-dashed w-full" />
                  <span className=" -ml-5 w-8 rounded-full h-8 bg-[#F4FAFF]"></span>
                </div>
                <div className=" px-5 flex w-full justify-between items-center">
                  <button className=" border px-4 border-[#005DAD] rounded-lg p-1 lg:px-10 ">
                    مشاهده
                  </button>
                  <button className=" border px-8 lg:w-48 bg-[#005DAD] rounded-lg text-white p-1">
                    دریافت جایزه
                  </button>
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
