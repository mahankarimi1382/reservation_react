import DoctorWorkCalendar from "../../container/doctor-panel/reservation-managment/DoctorWorkCalendar";
import { Switch } from "@mui/material";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import setting from "../../assets/Pics/doctorPanel/setting.png";
import DatePicker, { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import TimeInput from "../TimeInput";
import { smeIdStorage } from "../../store/Store";
import {
  create_Reservation,
  create_reservation_date_to_date,
} from "../../api/ApiCalling";
import { SyncLoader } from "react-spinners";
import DatePickerComponent from "../DatePickerComponent";

function CreateReservationModal({ closeModal, treatmentId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { smeId } = smeIdStorage();
  const [reservationDate, setReservationDate] = useState("");
  const [cancleTimeDuration, setCancleTimeDuration] = useState(0);
  const [reservationTime, setReservationTime] = useState("");
  const [visitCostId, setVisitCostId] = useState(2);
  const [totalTurnCount, setTotalTurnCount] = useState(0);
  const [numberofturnsinlimit, setNumberofturnsinlimit] = useState(0);
  const [timeofturnsinlimit, setTimeofturnsinlimit] = useState(0);
  const [reservationFromDate, setReservationFromDate] = useState("");
  const [reservationToDate, setReservationToDate] = useState("");
  const [reservationTimeEnd, setReservationTimeEnd] = useState(0);
  const [isDateToDate, setIsDateToDate] = useState(false);
  const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));
  const data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: smeId,
    },
    reservationDate,
    doctorTreatmentCenterId: treatmentId,
    cancleTimeDuration: parseInt(cancleTimeDuration),
    reservationTime,
    visitCostId,
    totalTurnCount: parseInt(totalTurnCount),
    numberofturnsinlimit: parseInt(numberofturnsinlimit),
    timeofturnsinlimit: parseInt(timeofturnsinlimit),
  };
  const data2 = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: smeId,
    },
    reservationFromDate,
    reservationToDate,
    doctorTreatmentCenterId: treatmentId,
    cancleTimeDuration: parseInt(cancleTimeDuration),
    reservationTime,
    reservationTimeEnd,
    visitCostId,
    totalTurnCount: parseInt(totalTurnCount),
    numberofturnsinlimit: parseInt(numberofturnsinlimit),
    timeofturnsinlimit: parseInt(timeofturnsinlimit),
    dayArray: selectedDays,
  };
  const today = new Date();
  const weekDays = [
    "شنبه",
    "یک‌شنبه",
    "دو‌شنبه",
    "سه‌شنبه",
    "چهار‌شنبه",
    "پنج‌شنبه",
    "جمعه",
  ];
  console.log(selectedDays);
  const handleDayChange = (event) => {
    const index = weekDays.indexOf(event.target.value);
    const updatedDays = [...selectedDays];
    updatedDays[index] = event.target.checked;
    setSelectedDays(updatedDays);
  };
  return (
    <div className=" z-20  w-screen h-screen top-0 justify-center items-center flex right-0 fixed ">
      <div className=" relative w-[70%] h-[90%] p-3 pb-10 bg-white rounded-xl">
        <RxCross2
          onClick={closeModal}
          className=" cursor-pointer absolute top-2 left-2"
        />
        <div className="  gap-5 flex justify-center items-center">
          <button
            onClick={() => setIsDateToDate(false)}
            className={
              !isDateToDate && "bg-[#005DAD] text-white p-2 rounded-lg"
            }
          >
            ایجاد نوبت در یک تاریخ
          </button>
          |
          <button
            onClick={() => setIsDateToDate(true)}
            className={isDateToDate && "bg-[#005DAD] text-white p-2 rounded-lg"}
          >
            ایجاد نوبت در بازه زمانی
          </button>
        </div>
        <div className=" w-full h-full flex justify-center gap-5 items-center">
          {isDateToDate ? (
            <div className=" bg-blue-300 p-3 py-5 shadow-md rounded-[30px] w-2/5 gap-10 flex flex-col">
              <h5>انتخاب بازه ی تاریخ:</h5>
              <div className=" justify-between w-full items-center flex">
                <DatePickerComponent
                  setDate={setReservationFromDate}
                  title="از تاریخ"
                />
                <DatePickerComponent
                  setDate={setReservationToDate}
                  title="تا تاریخ"
                />
              </div>
              <h5>انتخاب روز های هفته:</h5>
              <div className=" flex-wrap flex gap-5 w-full items-center">
                {weekDays.map((day,index) => (
                  <div className=" flex items-center gap-1" key={day}>
                    <input
                      type="checkbox"
                      id={day}
                      name="weekDay"
                      value={day}
                      checked={selectedDays[index]}
                      onChange={handleDayChange}
                      className=" w-4 h-4"
                    />
                    <h5>{day}</h5>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className=" flex flex-col gap-5">
              <Calendar
                onChange={(date) => {
                  moment.loadPersian({ usePersianDigits: false });
                  const formattedDate = moment(date.toDate()).format(
                    "jYYYY/jMM/jDD"
                  );
                  console.log(formattedDate);
                  setReservationDate(formattedDate);
                }}
                minDate={today}
                className="rmdp-prime-admin relative flex justify-center items-center"
                calendar={persian}
                locale={persian_fa}
              >
                <h5 className=" text-[#49454F] text-sm absolute top-3 m-auto">
                  انتخاب تاریخ
                </h5>
              </Calendar>
            </div>
          )}

          <div className=" gap-5 bg-white p-3 py-5 shadow-md rounded-[30px] w-[550px] flex flex-col">
            <h5 className=" flex gap-1 items-center  font-semibold">
              <img src={setting} width={20} alt="icon" />
              تنظیمات نوبت حضوری
            </h5>
            <div className=" flex items-start justify-between">
              <div className=" flex-col gap-6 flex w-[45%]">
                <div className=" flex  items-center justify-between">
                  <h4>تعداد افراد در هر بازه:</h4>
                  <input
                    onChange={(e) => setNumberofturnsinlimit(e.target.value)}
                    className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border"
                  />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>زمان کنسل نوبت (دقیقه):</h4>
                  <TimeInput setTime={setCancleTimeDuration} format="mm" />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>از ساعت:</h4>
                  <TimeInput setTime={setReservationTime} format="HH:mm" />
                </div>
              </div>
              <div className=" flex-col gap-6  flex w-[45%]">
                <div className=" flex items-center justify-between">
                  <h4>بازه زمانی نوبت (دقیقه):</h4>
                  <TimeInput setTime={setTimeofturnsinlimit} format="mm" />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>تعداد نوبت :</h4>
                  <input
                    onChange={(e) => setTotalTurnCount(e.target.value)}
                    className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border"
                  />
                </div>
                {isDateToDate && (
                  <div className=" flex items-center justify-between">
                    <h4>تا ساعت:</h4>
                    <TimeInput setTime={setReservationTimeEnd} format="HH:mm" />
                  </div>
                )}
              </div>
            </div>
            <hr className="border-2 rounded-xl" />
            <div className=" flex flex-col gap-3">
              <div className=" flex justify-between items-center">
                <h5>ویزیت در روز های تعطیل رسمی</h5>
                <Switch />
              </div>
              <div className=" flex justify-between items-center">
                <h5>ویزیت در روز های جمعه</h5>
                <Switch />
              </div>
              <hr className="border-2 rounded-xl" />

              <div className=" w-full flex justify-center gap-10 items-center">
                <button className=" bg-[rgba(230,35,51,0.15)] text-[#E62333F2] border border-[#E62333F2] p-3 w-1/3 rounded-lg">
                  انصراف
                </button>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    if (isDateToDate) {
                      create_reservation_date_to_date(
                        data2,
                        setIsLoading,
                        closeModal
                      );
                    } else {
                      create_Reservation(data, setIsLoading, closeModal);
                    }
                  }}
                  className=" bg-[#005DAD] text-white  p-3 w-1/3 rounded-lg"
                >
                  {isLoading ? (
                    <SyncLoader color="white" size={10} />
                  ) : (
                    "ثبت تغییرات"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateReservationModal;
