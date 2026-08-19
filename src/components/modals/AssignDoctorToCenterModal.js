"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { SyncLoader } from "react-spinners";
import {
  create_doctor_treatment,
  delete_doctor_treatment,
  read_DoctorTreatmentCenterByCenter,
  search_doctors_list,
} from "../../api/ApiCalling";
import { Eror } from "../ToastAlerts";

const doctorDisplayName = (doctor) => {
  const d = doctor?.smeProfile?.doctors?.[0] || doctor || {};
  const name = [d.doctorName, d.doctorFamily].filter(Boolean).join(" ").trim();
  return name || "پزشک";
};

function AssignDoctorToCenterModal({ closeModal, center, type }) {
  const centerId = center?.id;
  const isOffice = type === "office";

  // لیست پزشکان تخصیص‌داده‌شده به این مرکز
  const [assigned, setAssigned] = useState([]);
  const [assignedLoading, setAssignedLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // جستجوی پزشک
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // انتخاب و تخصیص
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [desc, setDesc] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);

  const timerRef = useRef(null);

  const assignedIds = useMemo(
    () => new Set(assigned.map((item) => String(item.doctorId))),
    [assigned]
  );

  const fetchAssigned = async () => {
    if (!centerId) {
      setAssigned([]);
      setAssignedLoading(false);
      return;
    }

    setAssignedLoading(true);
    const data = await read_DoctorTreatmentCenterByCenter(centerId, type);
    setAssigned(Array.isArray(data) ? data : []);
    setAssignedLoading(false);
  };

  useEffect(() => {
    fetchAssigned();
  }, [centerId, type]);

  // جستجو با debounce حدود ۳۵۰ میلی‌ثانیه
  useEffect(() => {
    const q = search.trim();

    if (!q) {
      setResults([]);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const data = await search_doctors_list(q, 1, "");
        const list = Array.isArray(data) ? data : data?.list || [];
        setResults(list);
      } catch (error) {
        console.error("خطا در جستجوی پزشک:", error);
        setResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 350);

    return () => clearTimeout(timerRef.current);
  }, [search]);

  const filteredResults = results.filter(
    (doctor) => !assignedIds.has(String(doctor?.id))
  );

  const handleDelete = async (record) => {
    setDeletingId(record.id);
    // delete_doctor_treatment بعد از حذف لیستِ «پزشک» را رفرش می‌کند؛
    // ما اینجا لیستِ «مرکز» را لازم داریم، پس setList را نادیده می‌گیریم.
    await delete_doctor_treatment(record.id, record.doctorId, () => {}, null);
    await fetchAssigned();
    setDeletingId(null);
  };

  const handleAssign = async () => {
    if (!selectedDoctorId) {
      Eror("لطفاً یک پزشک را انتخاب کنید");
      return;
    }

    setAssignLoading(true);

    const payload = {
      doctorId: Number(selectedDoctorId),
      clinicId: isOffice ? "" : centerId,
      officeId: isOffice ? centerId : "",
      desc: desc.trim(),
      cityId: Number(center?.cityId) || 0,
    };

    const res = await create_doctor_treatment(
      payload,
      null,
      null,
      "پزشک با موفقیت به مرکز تخصیص داده شد"
    );

    setAssignLoading(false);

    if (res) {
      // بعد از تخصیص موفق فقط لیست بالا رفرش می‌شود و مودال باز می‌ماند
      setSelectedDoctorId("");
      setDesc("");
      setSearch("");
      setResults([]);
      await fetchAssigned();
    }
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-base font-semibold text-[#005DAD]">
            تخصیص پزشک به{" "}
            {isOffice ? "مطب" : "مرکز درمانی"}{" "}
            {center?.name || center?.clinicName || ""}
          </h3>
          <RxCross2
            onClick={closeModal}
            className="cursor-pointer text-xl text-[#717171]"
          />
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* لیست پزشکان تخصیص‌داده‌شده */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-gray-700">
              پزشکان تخصیص‌داده‌شده به این مرکز:
            </h4>

            {assignedLoading ? (
              <div className="py-3 text-center text-sm text-[#858585]">
                در حال دریافت اطلاعات...
              </div>
            ) : assigned.length === 0 ? (
              <div className="py-3 text-center text-sm text-[#858585] border border-dashed border-gray-300 rounded-lg">
                هنوز پزشکی به این مرکز تخصیص داده نشده است
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
                {assigned.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-800">
                        {record.doctorName ||
                          (record.doctorId
                            ? `پزشک ${record.doctorId}`
                            : "پزشک")}
                      </span>
                      {record.desc ? (
                        <span className="text-[11px] text-gray-400 truncate max-w-[300px]">
                          {record.desc}
                        </span>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(record)}
                      disabled={deletingId === record.id}
                      className="p-2 rounded-lg text-red-500 border border-red-200 hover:bg-red-50 transition disabled:opacity-50"
                      title="حذف تخصیص"
                    >
                      {deletingId === record.id ? (
                        <SyncLoader color="#ef4444" size={6} />
                      ) : (
                        <MdDelete className="text-lg" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* جستجوی پزشک */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-gray-700">
              جستجو و تخصیص پزشک جدید:
            </h4>

            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="جستجوی پزشک (نام یا نام خانوادگی)..."
                  className="w-full border border-gray-300 rounded-lg py-2 pr-9 pl-3 text-sm outline-none focus:border-[#005DAD]"
                />
              </div>
            </div>

            {searchLoading && (
              <div className="py-2 text-center text-sm text-[#858585]">
                در حال جستجو...
              </div>
            )}

            {!searchLoading && search.trim() && filteredResults.length === 0 && (
              <div className="py-2 text-center text-sm text-[#858585]">
                {results.length === 0
                  ? "پزشکی یافت نشد"
                  : "پزشکان یافت‌شده قبلاً به این مرکز تخصیص داده شده‌اند"}
              </div>
            )}

            {filteredResults.length > 0 && (
              <div className="border border-gray-200 rounded-lg max-h-56 overflow-y-auto">
                <RadioGroup
                  value={String(selectedDoctorId)}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                >
                  {filteredResults.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center justify-between px-3 py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <FormControlLabel
                        className="mr-0"
                        value={String(doctor.id)}
                        control={<Radio />}
                        label={
                          <span className="text-sm text-gray-800">
                            {doctorDisplayName(doctor)}
                            {doctor?.smeProfile?.doctors?.[0]?.codeNezam ||
                            doctor?.codeNezam ? (
                              <span className="text-[11px] text-gray-400 mr-2">
                                کد نظام:{" "}
                                {doctor?.smeProfile?.doctors?.[0]?.codeNezam ||
                                  doctor?.codeNezam}
                              </span>
                            ) : null}
                          </span>
                        }
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* توضیحات اختیاری */}
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="توضیحات (اختیاری)"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#005DAD]"
            />

            <button
              type="button"
              onClick={handleAssign}
              disabled={assignLoading || !selectedDoctorId}
              className="disabled:bg-slate-300 w-full sm:w-1/2 self-center flex justify-center items-center gap-2 rounded-lg p-2 min-h-10 bg-[#005DAD] text-white text-sm"
            >
              {assignLoading ? (
                <SyncLoader color="white" size={10} />
              ) : (
                "تخصیص به پزشک"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignDoctorToCenterModal;
