"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";

import docProf from "../../assets/Pics/bahramMirzayi.png";
import SelfOrAnotherModal from "./SelfOrAnotherModal";
import { doctorProfileStore, reservationStore } from "../../store/Store";
import doctorIcon from "../../assets/Pics/doctor-icon.jpg";

import {
  get_doctor_reservation,
  get_doctor_treatment_reservation,
} from "../../api/ApiCalling";
import LoadingComponent from "../LoadingComponent";
function ReservDateAndTimeModal({ setIsReservModal, name, treatmentId }) {
  const { doctorName, doctorId } = doctorProfileStore();
  const { doctorNezamCode } = reservationStore();

  const { reservationId, setReservationId, turnId, setTurnId } =
    reservationStore();
  console.log(reservationId, turnId);
  const [isLoading, setIsLoading] = useState(true);
  const [reservationList, setReservationList] = useState([]);
  console.log(reservationList);
  const { setDateAndTime } = reservationStore();

  const [selectedDay, setSelectedDay] = useState("");
  console.log(selectedDay);
  const [turns, setTurns] = useState([]);
  console.log(turns);
  console.log(reservationList);
  const getReservation = async () => {
    const data = await get_doctor_treatment_reservation(doctorId, treatmentId);
    if (data) {
      setReservationList(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (doctorId) {
      getReservation();
    }
  }, [doctorId]);
  const [isSelfOrAnother, setIsSelfOrAnother] = useState(false);

  const uniqueStimeSet = new Set();
  const { adress } = reservationStore();

  const mappedDayDetails = () => {
    return reservationList.map((item) => {
      return (
        <button
          onClick={() => {
            setDateAndTime(item.reservationDateFull);
            setSelectedDay(item.id);
            // ساختار visitCost ممکن است کامل نباشد؛ نباید کرش کند
            const dayTurns = item?.visitCost?.reservations?.[0]?.turns ?? [];
            setTurns(dayTurns);
          }}
          className={`${
            selectedDay == item.id &&
            "bg-[#DBEDFF] border-[#005DAD] text-[#005DAD]"
          } disabled:bg-[#FBFBFB] disabled:text-[#B2B2B2] disabled:border-none flex flex-col min-w-[95px] min-h-[95px] justify-between py-2 items-center  rounded-lg transition-all hover:bg-[#DBEDFF] hover:border-[#005DAD] hover:text-[#005DAD] border  `}
          key={item.id}
        >
          <h5>{item.reservationDayOfWeek}</h5>
          <h5>{item.reservationDate}</h5>
          <h5>{item.reservationMonth}</h5>
        </button>
      );
    });
  };
  const mappedHours = () => {
    const map = new Map();
    turns.map((item) => {
      if (!map.has(item.etime)) {
        map.set(item.etime, item.isFree);
      } else {
        if (item.isFree && map.get(item.etime)) {
          map.set(item.etime, item.isFree);
        } else {
          map.set(item.etime, false);
        }
      }
    });

    // مرحله 2: فیلتر کردن آیتم‌ها و ذخیره در آرایه جدید
    const result = turns.filter((item) => map.get(item.etime) === item.isFree);

    // مرحله 3: چک کردن همه‌ی isFree ها و غیرفعال کردن دکمه‌ها
    const updatedResult = result.map((item) => {
      const allFalse = turns
        .filter((el) => el.etime === item.etime)
        .every((el) => !el.isFree);
      return {
        ...item,
        buttonDisabled: allFalse,
      };
    });

    // مرحله 4: انتخاب یک عضو از هر etime برابر
    const finalResult = Array.from(
      new Set(updatedResult.map((item) => item.etime))
    ).map((etime) => updatedResult.find((item) => item.etime === etime));

    return finalResult.map((item) => {
      // const hasFreeTurn = turns.some((t) => t.stime === item.stime && t.isFree);
      // const isDisable = hasFreeTurn ? false : true;
      console.log(item);
      return (
        <button
          onClick={() => {
            setReservationId(item.reservationId);
            setTurnId(item.id);
          }}
          disabled={item.buttonDisabled}
          className={` ${
            turnId == item.id && "bg-[#DBEDFF] border-[#005DAD]"
          } disabled:bg-[#FBFBFB] transition-all hover:bg-[#DBEDFF] hover:border-[#005DAD] text-[#005DAD] disabled:text-[#B2B2B2] disabled:border-none border p-2 px-4 rounded-lg`}
          key={item.id}
        >
          {item.stime}
        </button>
      );
    });
  };
  const handleCloseModal = () => {
    setIsReservModal(false);
  };
  return (
    <div className="  z-50  w-screen h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      {isLoading && <LoadingComponent />}
      {isSelfOrAnother && <SelfOrAnotherModal setModal={setIsSelfOrAnother} />}
      <div
        className={`${
          turns.length != 0
            ? " lg:w-[40%] w-full h-full lg:h-[90%] transition-all  flex flex-col p-5 gap-5 bg-white rounded-2xl "
            : " lg:w-[40%] w-full h-full lg:h-[60%]  transition-all flex flex-col p-5 gap-5 bg-white rounded-2xl"
        }`}
      >
        <div className=" w-full flex items-center justify-between">
          <h2 className=" text-xl">انتخاب نوبت بیمارستان {name}</h2>
          <RxCross2
            onClick={handleCloseModal}
            className=" cursor-pointer text-xl text-[#94989E]"
          />
        </div>
        <div className=" flex items-center gap-4">
          <img
            className=" rounded-full border border-[#005DAD]"
            src={doctorIcon}
            width={72}
            alt="profile"
          />
          <div className=" flex flex-col">
            <span className=" flex items-center gap-2">
              <h5 className=" text-lg"> {doctorName}</h5>
              <p>شماره نظام پزشکی:{doctorNezamCode}</p>
            </span>
            <h5 className=" text-[#94989E] flex items-center gap-1">
              <IoLocationOutline className=" text-xl" />
              {adress}
            </h5>
          </div>
        </div>
        <div className=" gap-4 customScroll min-h-[100px] py-5 flex overflow-x-auto overflow-y-hidden px-2">
          {mappedDayDetails()}
        </div>
        {turns.length != 0 && (
          <div className=" flex gap-2 flex-col">
            <div className=" flex flex-col ">
              <h2 className=" text-lg ">انتخاب ساعت ویزیت</h2>
              <div className=" flex gap-5 flex-wrap">{mappedHours()}</div>
            </div>
            <div className=" w-full flex justify-end gap-4 items-center">
              <button className=" border px-4 lg:px-10 text-sm lg:text-base rounded-lg p-2 text-[#005DAD] border-[#005DAD]">
                انصراف
              </button>
              <button
                onClick={() => {
                  setIsSelfOrAnother(true);
                }}
                className=" border px-4 lg:px-10 text-sm lg:text-base rounded-lg p-2 text-white bg-[#005DAD]"
              >
                تایید و ادامه
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservDateAndTimeModal;
// import React from "react";

// const turns = [
//   { turnNumber: 1, stime: "4:00 PM", etime: "4:30 PM", isFree: true },
//   { turnNumber: 2, stime: "4:00 PM", etime: "4:30 PM", isFree: false },
//   { turnNumber: 3, stime: "4:00 PM", etime: "4:30 PM", isFree: false },
//   { turnNumber: 4, stime: "4:00 PM", etime: "4:30 PM", isFree: false },
//   { turnNumber: 5, stime: "4:30 PM", etime: "5:00 PM", isFree: false },
//   { turnNumber: 6, stime: "4:30 PM", etime: "5:00 PM", isFree: false },
//   { turnNumber: 7, stime: "4:30 PM", etime: "5:00 PM", isFree: false },
//   { turnNumber: 8, stime: "4:30 PM", etime: "5:00 PM", isFree: false },
//   { turnNumber: 9, stime: "5:00 PM", etime: "5:30 PM", isFree: true },
//   { turnNumber: 10, stime: "5:00 PM", etime: "5:30 PM", isFree: false },
//   { turnNumber: 11, stime: "5:00 PM", etime: "5:30 PM", isFree: false },
//   { turnNumber: 12, stime: "5:00 PM", etime: "5:30 PM", isFree: false },
// ];

// const UniqueTimes = () => {
//   const uniqueStimeSet = new Set();

//   const uniqueTurns = turns.filter((turn) => {
//     if (uniqueStimeSet.has(turn.stime)) {
//       return false;
//     } else {
//       uniqueStimeSet.add(turn.stime);
//       return true;
//     }
//   });

//   return (
//     <div>
//       {uniqueTurns.map((turn) => {
//         const hasFreeTurn = turns.some(
//           (t) => t.stime === turn.stime && t.isFree
//         );
//         const colorStyle = hasFreeTurn ? {} : { color: "red" };

//         return (
//           <h1 key={turn.stime} style={colorStyle}>
//             {turn.stime}
//           </h1>
//         );
//       })}
//     </div>
//   );
// };

// export default UniqueTimes;
