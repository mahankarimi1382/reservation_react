import React, { useEffect, useState } from "react";

import doctorprof from "../../assets/Pics/abbas.png";
import star from "../../assets/Pics/star.png";
import hospital from "../../assets/Pics/hospital.png";
import tasviri from "../../assets/Pics/tasviri.png";
import monitor from "../../assets/Pics/monitor-mobbile.png";
import matni from "../../assets/Pics/matniIcon.png";
import callenderIcon from "../../assets/Pics/callenderIcon.png";
import telefoniIcon from "../../assets/Pics/telefoniIcon.png";
import doctorIcon from "../../assets/Pics/doctor-icon.jpg";

import { IoIosArrowDown } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { get_4first_doctor_turns } from "../../api/ApiCalling";
import { doctorProfileStore, reservationStore } from "../../store/Store";

import SelfOrAnotherModal from "./SelfOrAnotherModal";
import LoadingComponent from "../LoadingComponent";
import { RateCounter } from "../../utils/RateCounter";

import { useNavigate } from "react-router-dom";

function EmptyReservModal({ setIsModalOpen, selectedDoctor }) {
  const { setAdress, setTurnId, setDateAndTime } = reservationStore();
  const { setDoctorId, setDoctorName } = doctorProfileStore();

  const [isSelfOrAnother, setIsSelfOrAnother] = useState(false);
  const [firstTurnsHozoori, setFirstTurnsHozoori] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const get4FirtsTurns = async () => {
    const result = await get_4first_doctor_turns();
    if (result) {
      setFirstTurnsHozoori(
        result.filter((item) => item.reservationType === "حضوری")
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    get4FirtsTurns();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-screen h-screen top-0 justify-center items-center z-20 flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      {isLoading && <LoadingComponent />}

      {isSelfOrAnother && (
        <SelfOrAnotherModal setModal={setIsSelfOrAnother} />
      )}

      <div className="w-full lg:w-[82%] relative flex justify-center items-center border-2 h-full lg:h-[95vh] bg-white lg:rounded-3xl shadow-lg">
        <RxCross2
          onClick={handleCloseModal}
          className="cursor-pointer text-xl absolute top-4 left-6"
        />

        <div className="w-[99%] gap-5 lg:gap-10 pb-20 lg:pb-0 py-10 justify-start flex h-[98%] rounded-3xl customScroll flex-col items-center overflow-auto">

          {/* Doctor Profile Section */}
          <div className="w-[90%] rounded-2xl border lg:border-none bg-white flex justify-between p-2 lg:px-5 shadow-md lg:min-h-[188px]">
            <div className="lg:w-2/3 flex lg:items-center justify-start gap-2 lg:gap-5">
              <div className="relative flex items-start lg:items-center">
                <img
                  width={145}
                  height={145}
                  className="lg:w-[145px] lg:h-[145px] w-[50px] border-2 border-[#005DAD] rounded-full"
                  src={doctorIcon}
                  alt="doctor-prof"
                />
              </div>

              <div className="flex flex-col gap-2 lg:gap-5">
                <h2 className="text-lg lg:text-[22px]">
                  {selectedDoctor.doctorName} {selectedDoctor.doctorFamily}
                </h2>
                <h2 className="text-[#757575]">
                  {selectedDoctor.specialist}
                </h2>

                <h2 className="hidden text-red-600 lg:flex justify-center gap-2 items-center">
                  <RiErrorWarningLine className="text-xl" />
                  لطفا اولین نوبت خالی خود را باتوجه به نوع و مکان نوبت دهی
                  انتخاب کنید.
                </h2>
              </div>
            </div>

            <div className="flex flex-col items-start lg:justify-center gap-2 lg:gap-5">
              <h2 className="hidden text-[12px] rounded p-1 lg:flex items-center justify-center gap-1 bg-[#F0F0F0] text-[#1F7168]">
                <AiFillLike className="text-sm lg:text-lg" />
                97% پیشنهاد کابران دکتر رزرو
              </h2>

              <h2 className="lg:hidden text-[12px] rounded p-1 flex items-center justify-center gap-1 bg-[#F0F0F0] text-[#1F7168]">
                <AiFillLike className="text-sm lg:text-lg" />
                97%
              </h2>

              <h2 className="hidden lg:flex items-center justify-center gap-1">
                <img src={star} alt="star" width={18} />
                4.5/5 از (نظر 320)
              </h2>

              <RateCounter rate={5} width={14} />
            </div>
          </div>

          {/* حضوری */}
          <div className="w-[90%] flex justify-between">
            <div className="gap-2 flex justify-normal items-center">
              <img width={32} className="lg:w-[32px] w-[20px]" alt="icon" src={hospital} />
              <h2 className="lg:text-xl">اولین نوبت خالی حضوری</h2>
            </div>

            <button
              onClick={() => {
                setDoctorName(selectedDoctor.doctorName + " " + selectedDoctor.doctorFamily);
                setDoctorId(selectedDoctor.id);
                navigate("/doctors/doctor-profile");
              }}
              className="text-[#005DAD] flex justify-center items-center"
            >
              مشاهده همه
              <IoIosArrowDown />
            </button>
          </div>

          {/* First two turns */}
          <div className="w-[90%] justify-between flex flex-col lg:gap-0 gap-3 lg:flex-row">
            {[0, 1].map((item) => (
              <div
                key={item.turnId}
                className="lg:w-[508px] flex flex-col justify-center items-start lg:px-5 lg:gap-5 border p-2 lg:p-0 lg:h-[200px] rounded-2xl bg-white shadow-md"
              >
                <h2 className="text-[#005DAD]">
                  {item.treatmentCenterName}
                </h2>

                <h2 className="flex justify-center items-center">
                  <img width={24} src={callenderIcon} alt="callender-icon" />
                  اولین نوبت خالی بیمارستان کسری: 5 شهریور 1403 ساعت 10:30
                </h2>

                <h2 className="flex text-[#757575] justify-center items-center">
                  <IoLocationOutline className="text-[#757575] text-2xl" />
                  آدرس بیمارستان کسری: بالاتر از میدان آرژانتین، خیابان الوند
                </h2>

                <div className="w-full flex justify-center items-center">
                  <button
                    onClick={() => {
                      setDateAndTime(item.reservationDateFull);
                      setTurnId(item.turnId);
                      setAdress(item.treatmentCenterAddress);
                      setIsSelfOrAnother(true);
                    }}
                    className="text-[#005DAD] border-[#005DAD] border rounded-xl p-2"
                  >
                    رزرو اولین نوبت خالی
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* آنلاین */}
          <div className="w-[90%] flex justify-between">
            <div className="gap-2 flex justify-normal items-center">
              <img width={32} className="lg:w-[32px] w-[20px]" alt="icon" src={monitor} />
              <h2 className="lg:text-xl">اولین نوبت خالی آنلاین</h2>
            </div>

            <button
              onClick={() => {
                setDoctorName(selectedDoctor.doctorName + " " + selectedDoctor.doctorFamily);
                setDoctorId(selectedDoctor.id);
                navigate("/doctors/doctor-profile");
              }}
              className="text-[#005DAD] flex justify-center items-center"
            >
              مشاهده همه
              <IoIosArrowDown />
            </button>
          </div>

          {/* Online types */}
          <div className="w-[90%] lg:flex-row flex-col gap-3 flex items-center justify-between">

            {[tasviri, matni, telefoniIcon].map((imgSrc, index) => (
              <div
                key={index}
                className="flex lg:px-4 flex-col justify-center items-center p-2 lg:p-0 lg:gap-5 lg:w-[300px] lg:h-[270px] bg-white rounded-xl shadow-md border"
              >
                <img width={90} className="lg:w-[90px] w-[70px]" src={imgSrc} alt="icon" />

                <h2 className="flex justify-center items-center">
                  <img width={24} src={callenderIcon} alt="callender-icon" />
                  اولین نوبت خالی ویزیت آنلاین: 3 شهریور 1403 ساعت 10:30
                </h2>

                <button className="text-[#005DAD] border-[#005DAD] border rounded-xl p-2">
                  رزرو اولین نوبت خالی
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyReservModal;
