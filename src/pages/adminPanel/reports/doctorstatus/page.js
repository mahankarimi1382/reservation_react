import AdminPanelMenu from "../../../../container/adminPanel/AdminPanelMenu";
import React, { useEffect, useMemo, useState } from "react";
import excel_icon from "../../../../assets/Pics/excelIcon.png";
import printer from "../../../../assets/Pics/printer.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { Pagination } from "@mui/material";
import LoadingComponent from "../../../../components/LoadingComponent";
import { axiosConfig } from "../../../../api/axiosConfig";

// گزارش وضعیت پزشکان — دیتای واقعی از Doctor/search-list-doctors
function page() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    axiosConfig
      .get(
        `Doctor/search-list-doctors?DoctorName=${encodeURIComponent(
          search
        )}&pagesize=10&pageNumber=${currentPage}`,
        { silent: true }
      )
      .then((res) => {
        if (!isMounted) return;
        const result = res?.data?.result ?? {};
        const list = Array.isArray(result.list) ? result.list : [];
        setDoctors(list);
        const total = Number(result.totalRecords) || 0;
        setTotalPages(Math.max(1, Math.ceil(total / 10)));
        setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [currentPage, search]);

  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />
      <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
        <div className=" flex w-[80%]  gap-5 items-center">
          <label className=" w-full max-w-xs border px-3 p-1 border-[#005DAD] rounded-xl flex justify-between items-center bg-white">
            <input
              value={search}
              onChange={(e) => {
                setCurrentPage(1);
                setSearch(e.target.value);
              }}
              className=" w-full outline-none"
              placeholder="جستجوی نام پزشک..."
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
          <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
            <h4 className=" w-[20%] flex justify-center  items-center text-[#3F444D] font-medium">
              نام پزشک <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] font-medium">
              کد ملی <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] font-medium">
              تخصص <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[24%] flex justify-center items-center text-[#3F444D] font-medium">
              تجربه / سوابق
            </h4>
            <h4 className=" w-[24%] flex justify-center items-center text-[#3F444D] font-medium">
              توضیحات
            </h4>
          </div>
          {doctors.length === 0 && !isLoading && (
            <div className=" w-full py-8 text-center text-slate-500 text-sm">
              پزشکی برای نمایش وجود ندارد
            </div>
          )}
          {doctors.map((item) => {
            const name = item.doctorName || item.smeProfile?.doctors?.[0]?.doctorName || "";
            const family =
              item.doctorFamily || item.smeProfile?.doctors?.[0]?.doctorFamily || "";
            const rawCode =
              item.nationalId ||
              item.smeProfile?.doctors?.[0]?.nationalId ||
              item.smeProfile?.nationalCode ||
              "";
            const nationalCode = rawCode && rawCode !== "string" ? rawCode : "—";
            const experiance =
              item.docExperiance && item.docExperiance !== "string"
                ? item.docExperiance
                : "—";
            return (
              <div
                className=" border flex py-3 rounded-lg bg-white shadow-md"
                key={item.id}
              >
                <h4 className=" w-[20%] flex justify-center items-center text-[#3F444D] text-sm px-2">
                  {`${name} ${family}`.trim() || "—"}
                </h4>
                <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-sm">
                  {nationalCode}
                </h4>
                <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-sm">
                  {item.specialist?.name || "—"}
                </h4>
                <h4 className=" w-[24%] flex justify-center items-center text-[#3F444D] text-sm px-2 truncate">
                  {experiance}
                </h4>
                <h4 className=" w-[24%] flex justify-center items-center text-[#3F444D] text-sm px-2 truncate">
                  {item.desc && item.desc !== "string" ? item.desc : "—"}
                </h4>
              </div>
            );
          })}
        </div>
        {totalPages > 1 && (
          <div className=" w-[80%] flex justify-center py-3">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              sx={{
                "& .MuiPaginationItem-root": { color: "#005DAD" },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
