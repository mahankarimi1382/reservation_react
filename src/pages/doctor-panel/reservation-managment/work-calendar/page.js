import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../../assets/Pics/doctor-profile-icon.png";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../../container/doctor-panel/DoctorPanelMenu";
import monitor_mobbile from "../../../../assets/Pics/doctorPanel/monitor-mobbile.png";
import buliding from "../../../../assets/Pics/doctorPanel/buliding.png";
import DoctorWorkCalendar from "../../../../container/doctor-panel/reservation-managment/DoctorWorkCalendar";
import setting from "../../../../assets/Pics/doctorPanel/setting.png";
import { Switch } from "@mui/material";
import { fullNameStorage, userDoctorStorage } from "../../../../store/Store";
import ProfileDropdown from "../../../../components/ProfileDropdown";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import {
  create_Reservation,
  create_reservation_date_to_date,
  get_doctor_treatmentCenter_hozoori,
  get_doctor_treatmentCenter_online,
  read_doctor_visitcost,
} from "../../../../api/ApiCalling";
import { Eror, success } from "../../../../components/ToastAlerts";

function page() {
  const { fullName } = fullNameStorage();
  const { doctorid } = userDoctorStorage();

  // محل تقویم کاری: حضوری (مطب/مرکز) یا آنلاین
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [loadingCenters, setLoadingCenters] = useState(false);

  // تنظیمات نوبت — دقیقا همان فیلدهای CreateReservation بک‌اند
  const [numberofturnsinlimit, setNumberofturnsinlimit] = useState("");
  const [cancleTimeDuration, setCancleTimeDuration] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [timeofturnsinlimit, setTimeofturnsinlimit] = useState("");
  const [totalTurnCount, setTotalTurnCount] = useState("");
  const [reservationTimeEnd, setReservationTimeEnd] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [hasFriday, setHasFriday] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCenters = async (isOnline) => {
    if (!doctorid) {
      Eror("ابتدا وارد حساب پزشک خود شوید");
      return;
    }
    setLoadingCenters(true);
    setSelectedCenter(null);
    const data = isOnline
      ? await get_doctor_treatmentCenter_online(doctorid)
      : await get_doctor_treatmentCenter_hozoori(doctorid);
    setCenters(data ?? []);
    setLoadingCenters(false);
  };

  const handleSubmit = async () => {
    if (!selectedCenter) {
      Eror("لطفا ابتدا محل ویزیت (مطب یا مشاوره آنلاین) را انتخاب کنید");
      return;
    }
    if (!reservationTime) {
      Eror("ساعت شروع را وارد کنید");
      return;
    }
    if (selectedDates.length === 0) {
      Eror("لطفا تاریخ تقویم کاری را انتخاب کنید");
      return;
    }

    setIsSubmitting(true);

    // اگر هزینه ویزیت برای پزشک ثبت نشده باشد ثبت تقویم معنا ندارد
    const visitCost = await read_doctor_visitcost(doctorid);
    if (!visitCost?.id) {
      setIsSubmitting(false);
      Eror("ابتدا هزینه ویزیت خود را در بخش تنظیمات مراکز درمانی ثبت کنید");
      return;
    }

    const basePayload = {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
      },
      doctorTreatmentCenterId: selectedCenter.id,
      cancleTimeDuration: parseInt(cancleTimeDuration) || 15,
      reservationTime,
      totalTurnCount: parseInt(totalTurnCount) || 0,
      numberofturnsinlimit: parseInt(numberofturnsinlimit) || 1,
      timeofturnsinlimit: parseInt(timeofturnsinlimit) || 10,
      visitCostId: visitCost.id,
    };

    await Promise.all(
      selectedDates.map((date) =>
        create_Reservation(
          { ...basePayload, reservationDate: date },
          () => {},
          () => {}
        )
      )
    );
    success("تقویم کاری شما ثبت شد");
    setIsSubmitting(false);
    setSelectedDates([]);
  };

  return (
    <div dir="rtl" className="flex pb-20  bg-[#F6FBFF]">
      <DoctorPanelMenu />
      <div className=" mt-10 w-full flex flex-col gap-7 items-center">
        <div className=" flex justify-between items-center w-[80%]">
          <label className=" w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between ">
            <input className=" w-full outline-none" placeholder="جستجو" />
            <CiSearch className=" text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>
          <ProfileDropdown
            fullName={fullName}
            title="دکتر"

          />
        </div>
        <div className=" gap-8 w-[80%]  rounded-xl shadow-lg bg-white flex flex-col p-5">
          <div className=" text-xl flex gap-1 items-center">
            <h5>تقویم کاری</h5>
            <p className=" text-red-600 text-sm">
              ( پزشک گرامی لطفا محل ویزیت خود را انتخاب کنید و بعد تقویم کاری
              خود را پر کنید )
            </p>
          </div>
          <div className=" flex justify-center items-center gap-10">
            <button
              onClick={() => loadCenters(false)}
              className={` rounded-lg border p-2 px-10 flex justify-center items-center gap-2 ${
                selectedCenter && !selectedCenter.isOnline
                  ? " text-[#005DAD] bg-[#DBEDFF] border-[#005DAD]"
                  : " text-[#979797] bg-[#F7F7F7] border-[#979797]"
              }`}
            >
              <img src={buliding} alt="icon" width={24} />
              نوبت مطب
            </button>
            <button
              onClick={() => loadCenters(true)}
              className={` rounded-lg border p-2 px-10 flex justify-center items-center gap-2 ${
                selectedCenter?.isOnline
                  ? " text-[#005DAD] bg-[#DBEDFF] border-[#005DAD]"
                  : " text-[#979797] bg-[#F7F7F7] border-[#979797]"
              }`}
            >
              <img src={monitor_mobbile} alt="icon" width={24} />
              نوبت مشاوره آنلاین
            </button>
          </div>
          {(loadingCenters || centers.length > 0) && (
            <div className=" flex flex-wrap justify-center gap-3">
              {loadingCenters ? (
                <SyncLoader color="#005DAD" size={8} />
              ) : (
                centers.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCenter(item)}
                    className={` p-2 px-4 rounded-lg border text-sm ${
                      selectedCenter?.id === item.id
                        ? " bg-[#005DAD] text-white border-[#005DAD]"
                        : " bg-white text-[#005DAD] border-[#005DAD]"
                    }`}
                  >
                    {item.clinicName ?? item.officeName}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        <div className=" w-[80%] flex justify-between items-start">
          <div className=" flex flex-col gap-5">
            <DoctorWorkCalendar
              selectedDates={selectedDates}
              onConfirm={setSelectedDates}
              onCancel={() => setSelectedDates([])}
            />
            {selectedDates.slice(0, 3).map((date) => (
              <h3
                key={date}
                className=" font-semibold bg-[rgba(238,161,250,0.53)] rounded-2xl p-3"
              >
                روز {date} انتخاب شده است؛ برای ثبت، دکمه‌ی «ثبت تغییرات» را
                بزنید
              </h3>
            ))}
          </div>
          <div className=" gap-5 bg-white p-3 py-5 shadow-md rounded-[30px] w-[550px] flex flex-col">
            <h5 className=" flex gap-1 items-center  font-semibold">
              <img src={setting} width={20} alt="icon" />
              تنظیمات نوبت {selectedCenter?.isOnline ? "آنلاین" : "حضوری"}
            </h5>
            <div className=" flex items-start justify-between">
              <div className=" flex-col gap-6 flex w-[45%]">
                <div className=" flex  items-center justify-between">
                  <h4>تعداد افراد در هر بازه:</h4>
                  <input
                    value={numberofturnsinlimit}
                    onChange={(e) => setNumberofturnsinlimit(e.target.value)}
                    inputMode="numeric"
                    className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border"
                  />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>زمان کنسل نوبت (دقیقه):</h4>
                  <input
                    value={cancleTimeDuration}
                    onChange={(e) => setCancleTimeDuration(e.target.value)}
                    inputMode="numeric"
                    className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border"
                  />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>از ساعت:</h4>
                  <input
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    placeholder="09:00"
                    dir="ltr"
                    className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border"
                  />
                </div>
              </div>
              <div className=" flex-col gap-6  flex w-[45%]">
                <div className=" flex items-center justify-between">
                  <h4>بازه زمانی نوبت (دقیقه):</h4>
                  <input
                    value={timeofturnsinlimit}
                    onChange={(e) => setTimeofturnsinlimit(e.target.value)}
                    inputMode="numeric"
                    className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border"
                  />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>تعداد نوبت :</h4>
                  <input
                    value={totalTurnCount}
                    onChange={(e) => setTotalTurnCount(e.target.value)}
                    inputMode="numeric"
                    className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border"
                  />
                </div>
                <div className=" flex items-center justify-between">
                  <h4>تا ساعت (اختیاری):</h4>
                  <input
                    value={reservationTimeEnd}
                    onChange={(e) => setReservationTimeEnd(e.target.value)}
                    placeholder="12:00"
                    dir="ltr"
                    className=" shadow-md text-center p-0 outline-none w-[81px] h-[38px] rounded-lg border-[#005DAD] border"
                  />
                </div>
              </div>
            </div>
            <hr className="border-2 rounded-xl" />
            <div className=" flex flex-col gap-3">
              <div className=" flex justify-between items-center">
                <h5>ویزیت در روز های جمعه</h5>
                <Switch
                  checked={hasFriday}
                  onChange={(e) => setHasFriday(e.target.checked)}
                />
              </div>
              <hr className="border-2 rounded-xl" />

              <div className=" w-full flex justify-center gap-10 items-center">
                <button
                  onClick={() => setSelectedDates([])}
                  className=" bg-[rgba(230,35,51,0.15)] text-[#E62333F2] border border-[#E62333F2] p-3 w-1/3 rounded-lg"
                >
                  انصراف
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className=" bg-[#005DAD] text-white  p-3 w-1/3 rounded-lg flex justify-center items-center"
                >
                  {isSubmitting ? (
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

export default page;
