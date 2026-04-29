import React from "react";
import pesorasos from "../../../assets/Pics/pesoriasos.png";
import hospital from "../../../assets/Pics/hospital.png";
import monitor from "../../../assets/Pics/monitor-mobbile.png";
import barezvijegi from "../../../assets/Pics/barezvijegi.png";
import { AiFillLike } from "react-icons/ai";
import star from "../../../assets/Pics/star.png";
import { RateCounter } from "../../../utils/RateCounter";
function DoctorSave() {
  const charecter = [
    { id: 1, caption: "صبور" },
    { id: 2, caption: "دلسوز" },
    { id: 3, caption: "خوش برخورد" },
  ];
  return (
    <div className=" flex flex-col">
      <div className=" flex lg:gap-5 items-start">
        <img
          src={pesorasos}
          alt="img"
          className=" w-[110px] lg:w-[155px]"
          width={155}
        />
        <div className=" flex justify-between items-start w-full  gap-2">
          <div className=" flex gap-2 flex-col">
            <h5 className=" text-sm lg:text-base font-semibold">
              دکتر حلما محمدی
            </h5>
            <h5 className=" text-xs lg:text-base text-[#757575]">
              متخصص مغز و اعصاب
            </h5>
            <div className=" inline-block  min-w-[100px] justify-center items-center gap-2">
              <span className=" text-xs lg:text-base">خدمات :</span>
              <span className=" text-xs w-full lg:text-base text-[#757575]">
                جراحی مغز/درمان میگرن/عصب شناسی/نورولوژی/ستون فقرات
              </span>
            </div>
            <div className=" hidden lg:flex lg:gap-5">
              <h2 className=" text-xs lg:text-base">روش نوبت دهی :</h2>
              {true && (
                <h2 className=" flex gap-2 text-xs lg:text-base">
                  <img
                    width={24}
                    className=" lg:w-[24px] w-[18px]"
                    src={monitor}
                    alt="monitor-icon"
                  />
                  ویزیت آنلاین
                </h2>
              )}
              {true && (
                <h2 className=" flex gap-2">
                  <img
                    className=" lg:w-[24px] w-[18px] text-xs lg:text-base"
                    width={24}
                    src={hospital}
                    alt="monitor-icon"
                  />
                  ویزیت حضوری
                </h2>
              )}
            </div>{" "}
            <div className=" hidden lg:flex gap-3">
              <img src={barezvijegi} alt="icon" width={24} />
              <h2> ویژگی های بارز پزشک :</h2>
              {charecter.map((item2) => {
                return (
                  <h2 className="text-[#1F7168]" key={item2.id}>
                    {item2.caption}
                  </h2>
                );
              })}
            </div>
          </div>
          {/* <div className=" flex gap-5 flex-col items-end justify-center">
            <h5 className=" whitespace-nowrap lg:text-sm text-xs p-1 px-2 bg-[#F0F0F0]  rounded flex items-center justify-center gap-1 text-[#1F7168]">
              <AiFillLike className=" hidden lg:flex" />
              97% پیشنهاد کابران
            </h5>
            <h5 className=" hidden lg:flex justify-center items-center gap-2">
              <img src={star} alt="icon" width={18} />
              4.5/5 از (نظر 320)
            </h5>
            <RateCounter width={18} rate={5} />
          </div> */}
        </div>
      </div>
      <div className=" flex lg:hidden gap-1 items-center">
        <img src={barezvijegi} alt="icon" className=" lg:w-[24px] w-[15px]" width={24} />
        <h2 className=" text-xs"> ویژگی های بارز پزشک :</h2>
        {charecter.map((item2) => {
          return (
            <h2 className=" text-xs text-[#1F7168]" key={item2.id}>
              {item2.caption}
            </h2>
          );
        })}
      </div>
      <div className=" lg:hidden flex lg:gap-5">
        <h2 className=" text-xs lg:text-base">روش نوبت دهی :</h2>
        {true && (
          <h2 className=" flex gap-2 text-xs lg:text-base">
            <img
              width={24}
              className=" lg:w-[24px] w-[18px]"
              src={monitor}
              alt="monitor-icon"
            />
            ویزیت آنلاین
          </h2>
        )}
        {true && (
          <h2 className=" flex text-xs lg:text-base gap-2">
            <img
              className=" lg:w-[24px] w-[18px] text-xs lg:text-base"
              width={24}
              src={hospital}
              alt="monitor-icon"
            />
            ویزیت حضوری
          </h2>
        )}
      </div>{" "}
    </div>
  );
}

export default DoctorSave;
