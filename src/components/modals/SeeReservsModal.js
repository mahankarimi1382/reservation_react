import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CreateReservationModal from "./CreateReservationModal";
import {
  delete_reservation_day,
  get_doctor_treatment_reservation,
} from "../../api/ApiCalling";
import LoadingComponent from "../LoadingComponent";
import DeletingModal from "./DeletingModal";

function SeeReservsModal({
  closeModal,
  treatmentId,
  clinicId,
  doctorId,
  selectedMedical,
}) {
  // در پنل ادمین فقط selectedMedical پاس داده می‌شود؛ شناسه مرکز از آن استخراج می‌شود
  const effectiveClinicId =
    clinicId ??
    selectedMedical?.clinicId ??
    selectedMedical?.officeId ??
    treatmentId;
  const [selectedDay, setSelectedDay] = useState("");
  console.log(selectedDay);
  const [turns, setTurns] = useState([]);
  const [reservationList, setReservationList] = useState([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  console.log(reservationList);
  const [isLoading, setIsLoading] = useState(false);
  const uniqueStimeSet = new Set();
  const [isCreateReservModal, setIsCreateReservModal] = useState(false);

  const getReservation = async () => {
    console.log("first");
    const data = await get_doctor_treatment_reservation(
      doctorId,
      effectiveClinicId
    );
    if (data) {
      setReservationList(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (doctorId) {
      getReservation();
    }
  }, [doctorId, isCreateReservModal, isDeleteModal]);
  const mappedDayDetails = () => {
    return reservationList.map((item) => {
      return (
        <button
          onClick={() => {
            setSelectedDay(item.id);
            // ساختار visitCost ممکن است کامل نباشد؛ نباید کرش کند
            const turns = item?.visitCost?.reservations?.[0]?.turns ?? [];
            setTurns(turns);
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
          disabled={item.buttonDisabled}
          className={` disabled:bg-[#FBFBFB] transition-all hover:bg-[#DBEDFF] hover:border-[#005DAD] text-[#005DAD] disabled:text-[#B2B2B2] disabled:border-none border p-2 px-4 rounded-lg`}
          key={item.id}
        >
          {item.stime}
        </button>
      );
    });
  };
  return (
    <div className=" z-20  w-screen h-screen top-0 justify-center items-center flex right-0 fixed">
      {isLoading && <LoadingComponent />}
      {isDeleteModal && (
        <DeletingModal
          DeletingFn={delete_reservation_day}
          closeModal={() => setIsDeleteModal(false)}
          name="این نوبت"
          id={selectedDay}
          setList={setReservationList}
          list={reservationList}
        />
      )}
      {isCreateReservModal && (
        <CreateReservationModal
          treatmentId={treatmentId ?? effectiveClinicId}
          doctorId={doctorId}
          closeModal={() => setIsCreateReservModal(false)}
        />
      )}
      <div className=" relative w-[40%] h-[70%] transition-all flex flex-col p-5 gap-5 bg-white rounded-2xl">
        <RxCross2
          onClick={closeModal}
          className=" cursor-pointer absolute top-2 left-2"
        />
        <div className=" gap-4 customScroll min-h-[100px] py-5 flex overflow-x-auto overflow-y-hidden px-2">
          {reservationList.length != 0 ? (
            mappedDayDetails()
          ) : (
            <div className=" w-full h-full flex justify-center items-center">
              نوبتی برای نمایش وجود ندارد
            </div>
          )}
        </div>
        {turns.length != 0 && (
          <div className=" flex gap-2 flex-col">
            <div className=" flex flex-col ">
              <h2 className=" text-lg "> ساعت ویزیت</h2>
              <div className=" flex gap-5 flex-wrap">{mappedHours()}</div>
            </div>
          </div>
        )}
        <div className=" bottom-2 gap-5  absolute w-full flex justify-center items-center">
          <button
            onClick={() => setIsCreateReservModal(true)}
            className="  flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
          >
            افزودن نوبت
          </button>
          <button
            disabled={!selectedDay}
            onClick={() => {
              setIsDeleteModal(true)}}
            className=" disabled:bg-slate-400 disabled:text-gray-700 disabled:border-none bg-[rgba(247,79,115,0.21)] border border-[#921A34] text-[#921A34]  flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD]"
          >
            حذف نوبت
          </button>
        </div>
      </div>
      {/* <div className=" relative w-[40%] h-[500px] p-3 pb-10 bg-white rounded-xl">
        <RxCross2
          onClick={closeModal}
          className=" cursor-pointer absolute top-2 left-2"
        />
        <h5 className=" text-lg text-[#005DAD]">نوبت ها:</h5>
        {reservationList.map((item) => {
          return (
            <div className=" flex flex-col" key={item.id}>
              <h5> نوبت های {item.reservationDateFull}</h5>
            </div>
          );
        })}
        <div className=" bottom-2  absolute w-full flex justify-center items-center">
          <button
            onClick={() => setIsCreateReservModal(true)}
            className="  flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
          >
            افزودن نوبت
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default SeeReservsModal;
