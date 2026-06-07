import { Pagination } from "@mui/material";
import React, { useMemo } from "react";

const InsurancesPagination = ({
  items = [],
  currentPage,
  setCurrentPage,
  onDetails,
}) => {
  const itemsPerPage = 10;

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / itemsPerPage));
  }, [items.length]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  if (!items.length) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        موردی برای نمایش وجود ندارد.
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="flex flex-col gap-3">
        {currentItems.map((item) => (
          <div
            className="grid grid-cols-12 items-center gap-2 rounded-lg border bg-white py-3 shadow-sm"
            key={item.id}
          >
            <div className="col-span-3 flex justify-center">
              <h4 className="text-[#3F444D]">
                {item?.insuranceType?.type ?? "-"}
              </h4>
            </div>

            <div className="col-span-3 flex justify-center">
              <h4 className="text-lg text-[#3F444D]">{item?.name ?? "-"}</h4>
            </div>

            <div className="col-span-6 flex justify-center">
              <button
                onClick={() => onDetails?.(item)}
                className="flex items-center justify-center gap-2 rounded-lg border border-[#1F7168] bg-[#F2FEF8] px-5 py-1 text-[#1F7168]"
              >
                مشاهده جزئیات
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Pagination
          onChange={handleChange}
          page={currentPage}
          count={totalPages}
          color="primary"
            sx={{
    direction: "rtl",
    "& .MuiPagination-ul": {
      flexDirection: "row-reverse",
    },
  }}

          // این خط مهمه برای راست‌چین شدن
        />
      </div>
    </div>
  );
};

export default InsurancesPagination;
