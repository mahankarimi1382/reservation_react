import React from "react";
import pesorasos from "../../../assets/Pics/pesoriasos.png";
import hospital from "../../../assets/Pics/hospital.png";
import monitor from "../../../assets/Pics/monitor-mobbile.png";
import userTag from "../../../assets/Pics/user-tag.png";
import favoriteChart from "../../../assets/Pics/favorite-chart.png";
import star from "../../../assets/Pics/star.png";
import { IoLocationOutline } from "react-icons/io5";
function MedicalCenterSave() {
  const charecter = [
    { id: 1, caption: "صبور" },
    { id: 2, caption: "دلسوز" },
    { id: 3, caption: "خوش برخورد" },
  ];
  return (
    <div className=" flex flex-col">
      <div className=" flex gap-5 items-start">
        <img
          src={pesorasos}
          className=" w-[110px] lg:w-[155px]"
          alt="img"
          width={155}
        />
        <div className=" flex justify-between items-start w-full  gap-2">
          <div className=" flex gap-4 flex-col">
            <h5 className=" font-semibold text-sm lg:text-base">
              کلینیک زیبایی کارن
            </h5>
            <div className=" flex lg:gap-5">
              <h2 className=" text-xs lg:text-base">روش نوبت دهی :</h2>
              {true && (
                <h2 className=" flex gap-2 text-xs lg:text-base items-start">
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
                <h2 className=" flex text-xs lg:text-base gap-2 items-start">
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
            <div className=" hidden lg:flex justify-center items-center">
              <IoLocationOutline className=" text-[#005DAD]" />
              تهران: فلکه دوم صادقیه پشت بیمارستان ابن سینا ساختمان پزشکان فدک
              طبقه اول
            </div>
            <div className=" flex lg:gap-5 gap-2">
              <h2 className=" px-2 flex justify-center items-center gap-2 lg:text-base text-xs lg:p-1 rounded-full bg-[rgba(69,199,255,0.23)]">
                <img
                  src={favoriteChart}
                  alt="icon"
                  className=" lg:w-[24px] w-[18px]"
                  width={24}
                />
                {10}
                تخصص
              </h2>
              <h2 className=" text-xs lg:text-base px-2 flex justify-center items-center gap-2 p-1 rounded-full bg-[#FBEDD7]">
                <img
                  src={userTag}
                  alt="icon"
                  className=" lg:w-[24px] w-[18px]"
                  width={24}
                />
                {9}
                دکتر عضو
              </h2>
            </div>
          </div>
          <h5 className=" hidden  lg:flex justify-center items-center gap-2">
            <img src={star} alt="icon" width={18} />
            4.5/5 از (نظر 320)
          </h5>
        </div>
      </div>
      <div className=" lg:hidden flex text-xs lg:text-base items-start justify-center lg:items-center">
        <IoLocationOutline className=" text-lg text-[#005DAD]" />
        تهران: فلکه دوم صادقیه پشت بیمارستان ابن سینا ساختمان پزشکان فدک طبقه
        اول
      </div>
    </div>
  );
}

export default MedicalCenterSave;
