import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../../assets/Pics/doctor-profile-icon.png";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../../container/doctor-panel/DoctorPanelMenu";
import { PiWarningCircle } from "react-icons/pi";
import { fullNameStorage, userDoctorStorage } from "../../../../store/Store";
import ProfileDropdown from "../../../../components/ProfileDropdown";
import { SyncLoader } from "react-spinners";
import {
  delete_patient_reservation,
  get_all_turns,
} from "../../../../api/ApiCalling";
import { Eror } from "../../../../components/ToastAlerts";

// تاریخ شمسی ذخیره‌شده در بک‌اند به صورت عدد 14030512 است
const formatJalaliDate = (value) => {
  if (!value) return "";
  const str = String(value);
  if (str.length !== 8) return str;
  return `${str.slice(0, 4)}/${str.slice(4, 6)}/${str.slice(6, 8)}`;
};

function page() {
  const { fullName } = fullNameStorage();
  const { doctorid } = userDoctorStorage();

  const [turns, setTurns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isCancelling, setIsCancelling] = useState(false);

  const loadTurns = async () => {
    setIsLoading(true);
    const data = await get_all_turns();
    // فقط نوبت‌های همین پزشک
    setTurns((data ?? []).filter((item) => String(item?.doctor?.id) === String(doctorid)));
    setIsLoading(false);
  };

  useEffect(() => {
    if (doctorid) {
      loadTurns();
    }
  }, [doctorid]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCancelSelected = async () => {
    if (selectedIds.length === 0) {
      Eror("ابتدا نوبت‌های موردنظر را انتخاب کنید");
      return;
    }
    setIsCancelling(true);
    for (const id of selectedIds) {
      await delete_patient_reservation(id);
    }
    setSelectedIds([]);
    await loadTurns();
    setIsCancelling(false);
  };

  const rows = turns.map((item) => ({
    id: item.id,
    name: `${item?.patient?.patientName ?? ""} ${
      item?.patient?.patientFamily ?? ""
    }`.trim(),
    sickness: "—",
    type:
      item?.reservation?.doctorTreatmentCenter?.office != null
        ? "حضوری ، مطب"
        : "حضوری ، مرکز درمانی",
    time: formatJalaliDate(item?.turn?.reservation?.reservationDate),
    hour: item?.turn?.stime ?? "",
    code: item?.patient?.nationalId ?? "",
  }));

  return (
    <div dir="rtl" className="flex pb-20  bg-[#F6FBFF]">
      <DoctorPanelMenu />
      <div className=" mt-10 w-full flex flex-col gap-7 items-center">
        <div className=" flex justify-between items-center w-[80%]">
          <label className=" bg-white w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between ">
            <input className=" w-full outline-none" placeholder="جستجو" />
            <CiSearch className=" text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>
         <ProfileDropdown
            fullName={fullName}
            title="دکتر"

          />
        </div>
        <div className=" w-[80%] flex gap-7 flex-col">
          <div className=" flex p-3 border border-[#C30505] bg-[#F4F1F5] rounded-xl items-center text-[#C30505] gap-1">
            <PiWarningCircle />
            <h5>
              پزشک گرامی اگر می خواهید نوبت رزرو شده توسط بیمار را کنسل کنید
              لطفا باتوجه به فیلتر روز و ساعت کنسلی را انتخاب کنید.{" "}
            </h5>
          </div>
          <div className=" flex justify-between items-center">
            <h5 className=" font-semibold">جدیدترین نوبت های رزرو شده</h5>
            <button
              onClick={handleCancelSelected}
              disabled={isCancelling}
              className=" text-sm p-2 px-10 bg-[#EED4D7] rounded-lg text-[#C30505] border border-[#C30505] flex justify-center items-center min-w-[140px]"
            >
              {isCancelling ? (
                <SyncLoader color="#C30505" size={7} />
              ) : (
                "کنسل کردن نوبت"
              )}
            </button>
          </div>
          <div className=" flex flex-col w-full rounded-lg border shadow-md bg-white">
            <div className=" py-4 w-full flex rounded-t-lg bg-[#DBEDFF]">
              <h4 className=" w-1/6 flex justify-center  items-center text-[#3F444D] text-lg">
                نام بیمار
              </h4>
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                نام بیماری
              </h4>
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                نوع مراجعه
              </h4>
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                تاریخ
              </h4>
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                ساعت
              </h4>
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                کد ملی
              </h4>
            </div>
            {isLoading && (
              <div className=" flex justify-center items-center py-10">
                <SyncLoader color="#005DAD" size={9} />
              </div>
            )}
            {!isLoading && rows.length === 0 && (
              <div className=" flex justify-center items-center py-10 text-[#757575]">
                نوبت رزرو شده‌ای برای شما ثبت نشده است
              </div>
            )}
            {rows.map((item) => {
              return (
                <div
                  className=" border flex py-5 px-4  bg-white items-center gap-2"
                  key={item.id}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.name}
                  </h4>
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.sickness}
                  </h4>
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.type}
                  </h4>
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.time}
                  </h4>
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.hour}
                  </h4>
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.code}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
