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
  const normalizeImageSrc = (src) => {
    if (!src) return "";
    const s = String(src).trim();
    if (s.startsWith("data:image") || s.startsWith("http") || s.startsWith("//")) return s;
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    if (base64Regex.test(s) && s.length > 100) {
      return `data:image/jpeg;base64,${s}`;
    }
    return s;
  };

  const imgs = Array.isArray(images) ? images : images ? [images] : [];

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center p-4" onClick={closeModal}>
      <div
        className="relative bg-white w-full max-w-3xl max-h-[85vh] rounded-xl shadow-lg p-4 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={closeModal} className="absolute left-3 top-3 p-1 rounded-full hover:bg-gray-100">
          <RxCross2 className="text-2xl" />
        </button>

        <h3 className="text-xl font-semibold text-[#3F444D] mb-4 text-center">
          گالری تصاویر {name ? `- ${name}` : ""}
        </h3>

        {imgs.length === 0 ? (
          <div className="w-full text-center text-gray-500 py-8">تصویری ثبت نشده است.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {imgs.map((src, idx) => {
              const safeSrc = normalizeImageSrc(src);
              return (
                <div key={idx} className="w-full aspect-square border rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={safeSrc}
                    alt={`doctor-image-${idx + 1}`}
                    className="w-full h-full object-cover"
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



function DoctorDetailsModal({ item, closeModal }) {
  if (!item) return null;

  const prettyValue = (val) => {
    if (val === null || val === undefined || val === "") return "—";
    if (typeof val === "object") {
      try {
        return (
          <pre className="whitespace-pre-wrap break-all bg-gray-50 border border-gray-200 rounded-md p-2 text-xs text-gray-700">
            {JSON.stringify(val, null, 2)}
          </pre>
        );
      } catch {
        return String(val);
      }
    }
    return String(val);
  };

  const name =
    item?.doctorName ?? item?.smeProfile?.doctors?.[0]?.doctorName ?? "";
  const family =
    item?.doctorFamily ?? item?.smeProfile?.doctors?.[0]?.doctorFamily ?? "";

  const fields = [
    { label: "شناسه", value: item?.id },
    { label: "نام", value: name },
    { label: "نام خانوادگی", value: family },
    { label: "کد نظام پزشكی", value: item?.codeNezam },
    { label: "کد ملی", value: item?.nationalId },
    { label: "شماره تماس", value: item?.mobile },
    { label: "جنسیت", value: item?.gender === true ? "مرد" : item?.gender === false ? "زن" : "—" },
    { label: "تخصص", value: item?.specialist?.title || item?.specialistTitle },
    { label: "توضیحات", value: item?.desc },
    { label: "سوابق / تجربه", value: item?.docExperiance },
    { label: "بیمه‌ها", value: item?.doctorInsurance },
    { label: "لینک یا عکس پروفایل", value: item?.docInstaLink },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-3"
      onClick={closeModal}
    >
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-l from-blue-50 to-gray-50">
          <h2 className="text-xl font-bold text-[#1E3A8A]">
            جزئیات پزشک {name || family ? `- ${name} ${family}` : ""}
          </h2>
          <button
            onClick={closeModal}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors"
          >
            <RxCross2 className="text-2xl text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {fields.map((f, idx) => (
              <div key={idx} className="flex flex-col border-b border-gray-100 pb-2">
                <span className="text-sm font-medium text-gray-500 mb-1">
                  {f.label}
                </span>
                <div className="text-[15px] text-gray-800 leading-relaxed break-words">
                  {prettyValue(f.value)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t bg-gray-50 flex justify-end">
          <button
            onClick={closeModal}
            className="px-5 py-2 bg-[#005DAD] hover:bg-[#004a8a] text-white rounded-lg font-medium text-sm transition-all"
          >
            بستن
          </button>
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

  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [imagesForModal, setImagesForModal] = useState([]);
  const [imagesDoctorName, setImagesDoctorName] = useState("");

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

      {isImagesModalOpen && (
        <DoctorImagesModal
          images={imagesForModal}
          name={imagesDoctorName}
          closeModal={() => setIsImagesModalOpen(false)}
        />
      )}

      {isDetailsOpen && (
        <DoctorDetailsModal
          item={detailsItem}
          closeModal={() => setIsDetailsOpen(false)}
        />
      )}

      {doctors.length == 0 && !isLoading ? (
        <div className="w-full h-full flex justify-center items-center text-3xl text-slate-500">
          نتیجه ای یافت نشد
        </div>
      ) : (
        doctors.map((item) => {

          const fullName =
            (item?.smeProfile?.doctors?.[0]?.doctorName || item?.doctorName || "") +
            " " +
            (item?.smeProfile?.doctors?.[0]?.doctorFamily || item?.doctorFamily || "");

          return (
            <div key={item.id} className="border flex py-3 items-center rounded-lg bg-white shadow-md">

              <div className="flex w-[5%] justify-center items-center gap-1 text-lg">
                <MdDeleteForever
                  onClick={() => {
                    setSelectedItem(item);
                    setIsDeletingModal(true);
                  }}
                  className="cursor-pointer hover:text-red-600"
                />
                <FaEdit
                  onClick={() => {
                    setIsAddDoctorModal(true);
                    setDoctorItems(item);
                  }}
                  className="cursor-pointer hover:text-green-600"
                />
              </div>

              <h4 className="w-[14%] flex justify-center items-center text-lg">
                {item?.smeProfile?.doctors?.[0]?.doctorName}{" "}
                {item?.smeProfile?.doctors?.[0]?.doctorFamily}
              </h4>

              <h4 className="w-[14%] flex justify-center items-center text-lg">
                مطب
              </h4>

              <h4 className="w-[14%] flex justify-center items-center text-lg">
                {item?.smeProfile?.doctors?.[0]?.codeNezam}
              </h4>

              <h4 className="w-[14%] flex justify-center items-center text-lg">
                {item?.smeProfile?.doctors?.[0]?.nationalId}
              </h4>

              {/* ✅ اصلاح شده */}
              <div className="w-[38%] flex items-center gap-2 flex-nowrap overflow-x-auto">

                <button
                  className="px-2 py-1 whitespace-nowrap bg-[rgba(31,113,104,0.08)] border border-[#399086C9] text-[#399086C9] rounded-lg text-sm"
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
                  className="px-2 py-1 whitespace-nowrap bg-[rgba(247,79,115,0.21)] border border-[#921A34] text-[#921A34] rounded-lg text-sm"
                >
                  هزینه زیرساخت
                </button>

                <div className="whitespace-nowrap">
                  <TreatMentCenterButt
                    name={item.doctorName + " " + item.doctorFamily}
                    id={item.id}
                  />
                </div>

                <button
                  className="px-2 py-1 whitespace-nowrap bg-[#DBEDFF] border border-[#005DAD] text-[#005DAD] rounded-lg text-sm"
                  onClick={() => {
                    setDetailsItem(item);
                    setIsDetailsOpen(true);
                  }}
                >
                  مشاهده جزئیات
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
