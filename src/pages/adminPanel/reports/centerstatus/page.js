import AdminPanelMenu from "../../../../container/adminPanel/AdminPanelMenu";
import React, { useEffect, useMemo, useState } from "react";
import excel_icon from "../../../../assets/Pics/excelIcon.png";
import printer from "../../../../assets/Pics/printer.png";
import { TiArrowSortedDown } from "react-icons/ti";
import LoadingComponent from "../../../../components/LoadingComponent";
import { axiosConfig } from "../../../../api/axiosConfig";

// گزارش وضعیت مراکز درمانی — دیتای واقعی از Clinic/read-Clinics
const pickList = (result) => {
  if (Array.isArray(result)) return result;
  if (result && Array.isArray(result.list)) return result.list;
  return [];
};

function page() {
  const [clinics, setClinics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;
    axiosConfig
      .get("Clinic/read-Clinics", { silent: true })
      .then((res) => {
        if (!isMounted) return;
        setClinics(pickList(res?.data?.result));
        setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return clinics;
    const q = search.trim();
    return clinics.filter(
      (c) =>
        (c?.clinicName || "").includes(q) || (c?.cityName || "").includes(q)
    );
  }, [clinics, search]);

  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />
      <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
        <div className=" flex w-[80%]  gap-5 items-center">
          <label className=" w-full max-w-xs border px-3 p-1 border-[#005DAD] rounded-xl flex justify-between items-center bg-white">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full outline-none"
              placeholder="جستجوی مرکز درمانی..."
            />
          </label>
        </div>
        <div className=" gap-2 flex justify-end w-[80%] items-center">
          <button className=" border rounded-lg px-3 p-1 gap-2 text-[#185B37] border-[#185B37] flex">
            <img src={excel_icon} alt=" icon" width={24} />
            خروجی اکسل
          </button>
          <button className=" border rounded-lg px-3 p-1 gap-2 text-[#3F444D] border-[#3F444D] flex">
            <img src={printer} alt=" icon" width={24} />
            چاپ اطلاعات{" "}
          </button>
        </div>
        {isLoading && <LoadingComponent />}
        <div className=" gap-3 flex flex-col w-[80%] rounded-lg border shadow-md p-4 bg-white">
          <div className=" text-sm py-2 w-full flex rounded-lg bg-[#F4F4F4]">
            <h4 className=" w-[24%] flex justify-center  items-center text-[#3F444D] font-medium">
              مرکز درمانی
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] font-medium">
              شهر
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] font-medium">
              نوع
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] font-medium">
              تعداد پزشکان
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[22%] flex justify-center items-center text-[#3F444D] font-medium">
              تلفن
            </h4>
            <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] font-medium">
              آدرس
            </h4>
          </div>
          {filtered.length === 0 && !isLoading && (
            <div className=" w-full py-8 text-center text-slate-500 text-sm">
              مرکزی برای نمایش وجود ندارد
            </div>
          )}
          {filtered.map((item) => {
            return (
              <div
                className=" border flex py-3 rounded-lg bg-white shadow-md"
                key={item.id}
              >
                <h4 className=" w-[24%] flex justify-center items-center text-[#3F444D] px-2 text-sm">
                  {item.clinicName || "—"}
                </h4>
                <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] text-sm">
                  {item.cityName || "—"}
                </h4>
                <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] text-sm">
                  {item.clinicTypeName || "—"}
                </h4>
                <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] text-sm">
                  {item.doctorsCount ?? 0}
                </h4>
                <h4 className=" w-[22%] flex justify-center items-center text-[#3F444D] text-sm px-2">
                  {item.phone || "—"}
                </h4>
                <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] text-sm px-2 truncate">
                  {item.address || "—"}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
