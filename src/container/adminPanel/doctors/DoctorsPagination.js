import { FaArrowLeft, FaArrowRight, FaEdit } from "react-icons/fa";
import { Pagination, PaginationItem } from "@mui/material";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { delete_doctor } from "../../../api/ApiCalling";
import DeletingModal from "../../../components/modals/DeletingModal";
import { TreatMentCenterButt } from "../../../components/Buttons/Button";
import DoctorCostModal from "../../../components/modals/DoctorCostModal";

/** مودال نمایش تصاویر پزشک */
function DoctorImagesModal({ images = [], name = "", closeModal }) {
  // نرمالایز مسیر تصویر (پشتیبانی از Base64 بدون prefix و URL)
  const normalizeImageSrc = (src) => {
    if (!src) return "";
    const s = String(src).trim();
    if (s.startsWith("data:image") || s.startsWith("http") || s.startsWith("//")) return s;
    // اگر به‌نظر می‌رسه Base64 خام باشه، prefix اضافه کن
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    if (base64Regex.test(s) && s.length > 100) {
      return `data:image/jpeg;base64,${s}`;
    }
    return s;
  };

  const imgs = Array.isArray(images) ? images : images ? [images] : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="relative bg-white w-full max-w-3xl max-h-[85vh] rounded-xl shadow-lg p-4 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute left-3 top-3 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <RxCross2 className="text-2xl" />
        </button>

        <h3 className="text-xl font-semibold text-[#3F444D] mb-4 text-center">
          گالری تصاویر {name ? `- ${name}` : ""}
        </h3>

        {imgs.length === 0 ? (
          <div className="w-full text-center text-gray-500 py-8">
            تصویری ثبت نشده است.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {imgs.map((src, idx) => {
              const safeSrc = normalizeImageSrc(src);
              return (
                <div
                  key={idx}
                  className="w-full aspect-square border rounded-lg overflow-hidden bg-gray-50"
                >
                  {/* برای سادگی از img استفاده شده تا محدودیت‌های domainِ  نداشته باشیم */}
                  <img
                    src={safeSrc}
                    alt={`doctor-image-${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzAwJyBoZWlnaHQ9JzMwMCcgdmlld0JveD0nMCAwIDMwMCAzMDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzMwMCcgaGVpZ2h0PSczMDAnIGZpbGw9JyNmMmYyZjInIC8+PHRleHQgeD0nNTAlJyB5PSc1MCUnIGR5PScuMzVlbScgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1mYW1pbHk9J3NhbnMtc2VyaWYnIGZvbnQtc2l6ZT0nMTInIGZpbGw9JyM5OTknPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/** مودال جزئیات پزشک (بدون نمایش docInstaLink) */
function DoctorDetailsModal({ item, closeModal }) {
  if (!item) return null;

  // نمایش تمیز مقادیر
  const pretty = (val) => {
    if (val === null || val === undefined || val === "") return "—";
    if (typeof val === "object") {
      try {
        return (
          <pre className="whitespace-pre-wrap break-words text-sm bg-gray-50 p-2 rounded border">
            {JSON.stringify(val, null, 2)}
          </pre>
        );
      } catch {
        return String(val);
      }
    }
    return String(val);
  };

  // بک‌آپ نام/نام‌خانوادگی از smeProfile اگر در سطح بالا نبود
  const name = item?.doctorName ?? item?.smeProfile?.doctors?.[0]?.doctorName;
  const family = item?.doctorFamily ?? item?.smeProfile?.doctors?.[0]?.doctorFamily;

  const fields = [
    { label: "شناسه", value: item?.id },
    { label: "نام", value: name },
    { label: "نام خانوادگی", value: family },
    { label: "توضیحات", value: item?.desc },
    { label: "سوابق/تجربه", value: item?.docExperiance },
    { label: "بیمه‌ها", value: item?.doctorInsurance },
    // عمداً docInstaLink نمایش داده نمی‌شود
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="relative bg-white w-full max-w-3xl max-h-[85vh] rounded-xl shadow-lg p-5 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute left-3 top-3 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <RxCross2 className="text-2xl" />
        </button>

        <h3 className="text-xl font-semibold text-[#3F444D] mb-4 text-center">
          جزئیات پزشک {name && family ? `- ${name} ${family}` : ""}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-sm text-gray-500">{f.label}</span>
              <div className="text-[15px] text-[#3F444D]">{pretty(f.value)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const DoctorsPagination = ({
  isLoading,
  doctors,
  currentPage,
  setCurrentPage,
  totalPages,
  setDoctorItems,
  setIsAddDoctorModal,
  setDoctors,
}) => {
  const [isDoctorCostModal, setIsDoctorCostModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isDeletingModal, setIsDeletingModal] = useState(false);

  // جدید: مودال تصاویر
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [imagesForModal, setImagesForModal] = useState([]);
  const [imagesDoctorName, setImagesDoctorName] = useState("");

  // جدید: مودال جزئیات
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const toPersianDigits = (str) =>
    str.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);

  return (
    <div className="w-full h-full">
      {isDoctorCostModal && (
        <DoctorCostModal
          name={selectedItem.name}
          id={selectedItem.id}
          setIsDoctorCostModal={setIsDoctorCostModal}
        />
      )}

      {isDeletingModal && (
        <DeletingModal
          DeletingFn={delete_doctor}
          id={selectedItem.id}
          name={selectedItem.doctorName + " " + selectedItem.doctorFamily}
          setList={setDoctors}
          list={doctors}
          closeModal={() => setIsDeletingModal(false)}
        />
      )}

      {/* مودال نمایش تصاویر */}
      {isImagesModalOpen && (
        <DoctorImagesModal
          images={imagesForModal}
          name={imagesDoctorName}
          closeModal={() => setIsImagesModalOpen(false)}
        />
      )}

      {/* مودال جزئیات */}
      {isDetailsOpen && (
        <DoctorDetailsModal
          item={detailsItem}
          closeModal={() => setIsDetailsOpen(false)}
        />
      )}

      {doctors.length == 0 && !isLoading ? (
        <div className="w-full h-full justify-center items-center flex text-3xl text-slate-500">
          نتیجه ای یافت نشد
        </div>
      ) : (
        doctors.map((item) => {
          const fullName =
            (item?.smeProfile?.doctors?.[0]?.doctorName || item?.doctorName || "") +
            " " +
            (item?.smeProfile?.doctors?.[0]?.doctorFamily || item?.doctorFamily || "");
          return (
            <div
              className="border flex py-3 items-center rounded-lg bg-white shadow-md"
              key={item.id}
            >
              <div className="flex w-[5%] justify-center items-center gap-1 text-lg">
                <MdDeleteForever
                  onClick={() => {
                    setSelectedItem(item);
                    setIsDeletingModal(true);
                  }}
                  className="text-[#3F444D] transition-all cursor-pointer hover:text-red-600"
                />
                <FaEdit
                  onClick={() => {
                    setIsAddDoctorModal(true);
                    setDoctorItems(item);
                  }}
                  className="text-[#3F444D] transition-all cursor-pointer hover:text-green-600"
                />
              </div>

              <h4 className="w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
                {item?.smeProfile?.doctors?.[0]?.doctorName}{" "}
                {item?.smeProfile?.doctors?.[0]?.doctorFamily}
              </h4>

              <h4 className="w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
                مطب
              </h4>

              <h4 className="w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
                {item?.smeProfile?.doctors?.[0]?.codeNezam}
              </h4>

              <h4 className="w-[14%] flex justify-center items-center text-[#3F444D] text-lg">
                {item?.smeProfile?.doctors?.[0]?.nationalId}
              </h4>

              <div className="w-[38%] flex justify-center items-center gap-1">
                <button
                  className="p-1 bg-[rgba(31,113,104,0.08)] border border-[#399086C9] text-[#399086C9] rounded-lg text-sm"
                  onClick={() => {
                    const imgs = Array.isArray(item.docInstaLink)
                      ? item.docInstaLink
                      : item.docInstaLink
                      ? [item.docInstaLink]
                      : [];
                    setImagesForModal(imgs);
                    setImagesDoctorName(fullName.trim());
                    setIsImagesModalOpen(true);
                  }}
                >
                  عکس ها
                </button>

                <button
                  onClick={() => {
                    setSelectedItem({
                      id: item.id,
                      name: item.doctorName + " " + item.doctorFamily,
                    });
                    setIsDoctorCostModal(true);
                  }}
                  className="p-1 bg-[rgba(247,79,115,0.21)] border border-[#921A34] text-[#921A34] rounded-lg text-sm"
                >
                  هزینه زیرساخت
                </button>

                <TreatMentCenterButt
                  name={item.doctorName + " " + item.doctorFamily}
                  id={item.id}
                />

                <button
                  className="p-1 bg-[#DBEDFF] border border-[#005DAD] text-[#005DAD] rounded-lg text-sm"
                  onClick={() => {
                    setDetailsItem(item);     // ارسال کل آیتم
                    setIsDetailsOpen(true);   // باز کردن مودال جزئیات
                  }}
                >
                  مشاهده جزئیات{" "}
                </button>
              </div>
            </div>
          );
        })
      )}

      <div className="mt-5 w-full flex justify-center items-center">
        <Pagination
          size="small"
          onChange={handleChange}
          page={currentPage}
          count={totalPages}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: FaArrowRight, next: FaArrowLeft }}
              {...item}
              page={item.page ? toPersianDigits(item.page) : item.page}
            />
          )}
        />
      </div>
    </div>
  );
};

export default DoctorsPagination;
