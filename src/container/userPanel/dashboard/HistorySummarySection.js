import React, { useEffect, useState } from "react";
import doctorIcon from "../../../assets/Pics/doctor-icon.jpg";
import { SyncLoader } from "react-spinners";
import { get_all_turns } from "../../../api/ApiCalling";

// تاریخ شمسی ذخیره‌شده در بک‌اند به صورت عدد 14030512 است
const formatJalaliDate = (value) => {
  if (!value) return "";
  const str = String(value);
  if (str.length !== 8) return str;
  return `${str.slice(0, 4)}/${str.slice(4, 6)}/${str.slice(6, 8)}`;
};

function HistorySummarySection() {
  const [turns, setTurns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // نوبت‌های واقعی کاربر از بک‌اند خوانده می‌شود
  useEffect(() => {
    get_all_turns()
      .then((data) => {
        setTurns(data ?? []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const rows = turns.slice(0, 2).map((item) => ({
    id: item.id,
    profile: doctorIcon,
    name: `${item?.doctor?.doctorName ?? ""} ${
      item?.doctor?.doctorFamily ?? ""
    }`.trim(),
    skill: item?.doctor?.specialist?.name ?? "",
    date: `${formatJalaliDate(
      item?.turn?.reservation?.reservationDate
    )} ساعت ${item?.turn?.stime ?? ""}`,
    loc:
      item?.reservation?.doctorTreatmentCenter?.office?.address ??
      item?.reservation?.doctorTreatmentCenter?.clinic?.address ??
      "—",
  }));

  return (
    <div className="   gap-[10px] lg:p-2 xl:p-0 flex flex-col justify-center items-center lg:pt-5">
      {isLoading && (
        <div className=" flex justify-center items-center py-8">
          <SyncLoader color="#005DAD" size={8} />
        </div>
      )}
      {!isLoading && rows.length === 0 && (
        <h5 className=" text-xs lg:text-sm text-[#757575] py-8">
          نوبتی ثبت نشده است
        </h5>
      )}
      {rows.map((item) => (
        <div
          key={item.id}
          className=" xxl:w-[500px] gap-1 px-2 lg:px-0 lg:w-[390px]  justify-center items-center flex border-b border-dashed border-[#D3E9FD] lg:pb-5 lg:gap-1 xl:gap-3"
        >
          <img
            src={item.profile}
            width={68}
            alt="profile"
            className=" w-[50px] aspect-square lg:w-[68px] rounded-full border border-[#005DAD]"
          />
          <div className=" flex flex-col gap-2">
            <div className=" flex lg:gap-4 xl:gap-10 text-sm">
              <div className=" flex-col lg:gap-2 flex">
                <h5>{item.name}</h5>
                <h5 className=" lg:text-base text-xs text-[#757575]">
                  {item.skill}
                </h5>
              </div>
              <div className=" flex-col flex">
                <div className="flex">
                  <h5 className=" text-xs md:text-sm lg:text-base">
                    روش نوبت دهی :
                  </h5>
                  <p className=" text-[#005DAD] text-xs lg:text-base">حضوری</p>
                </div>
                <div className="flex">
                  <h5 className=" text-xs md:text-sm  lg:text-base whitespace-nowrap">
                    تاریخ وساعت :{" "}
                  </h5>
                  <p className=" text-[#005DAD] text-xs lg:text-base">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
            <div className=" flex text-xs md:text-sm">
              <h5 className="  whitespace-nowrap">محل ویزیت :</h5>
              <p className=" text-[#005DAD]">{item.loc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistorySummarySection;
