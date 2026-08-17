import React, { useState, useEffect, useMemo } from "react";
import { CiSearch, CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import DoctorPanelMenu from "../../../container/doctor-panel/DoctorPanelMenu";
import { fullNameStorage, userDoctorStorage } from "../../../store/Store";
import ProfileDropdown from "../../../components/ProfileDropdown";
import AddTreatmentModal from "../../../components/modals/AddTreatmentModal";
import {
  get_doctor_treatmentCenter,
  update_doctor_treatment,
  delete_doctor_treatment,
} from "../../../api/ApiCalling";

function page() {
  const { fullName } = fullNameStorage();
  const { doctorid } = userDoctorStorage();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // مودال‌ها
  const [detailItem, setDetailItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [editDesc, setEditDesc] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [isAssignModal, setIsAssignModal] = useState(false);

  const fetchList = async () => {
    if (!doctorid) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const data = await get_doctor_treatmentCenter(doctorid);
    setList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, [doctorid]);

  // فیلتر جستجو
  const filteredList = useMemo(() => {
    if (!search.trim()) return list;
    const q = search.trim().toLowerCase();
    return list.filter((item) => {
      const name = (item.officeName || item.clinicName || "").toLowerCase();
      const desc = (item.desc || "").toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [list, search]);

  const openEdit = (item) => {
    setEditItem(item);
    setEditDesc(item.desc || "");
  };

  const handleUpdate = () => {
    if (!editItem) return;

    const payload = {
      id: editItem.id,
      doctorId: editItem.doctorId || Number(doctorid),
      clinicId: editItem.clinicId || "",
      officeId: editItem.officeId || "",
      desc: editDesc,
      cityId: editItem.cityId || 0,
    };

    console.log("Payload ویرایش تخصیص:", payload);

    setActionLoading(true);
    update_doctor_treatment(
      payload,
      doctorid,
      setList,
      () => {
        setEditItem(null);
        setActionLoading(false);
      },
      "اطلاعات با موفقیت ویرایش شد"
    );
  };

  const handleDelete = () => {
    if (!deleteItem) return;

    setActionLoading(true);
    delete_doctor_treatment(
      deleteItem.id,
      doctorid,
      setList,
      () => {
        setDeleteItem(null);
        setActionLoading(false);
      }
    );
  };

  return (
    <div dir="rtl" className="flex min-h-screen pb-20 bg-[#F6FBFF]">
      <DoctorPanelMenu />

      <div className="mt-8 sm:mt-10 w-full flex flex-col gap-6 items-center px-4 sm:px-0">
        {/* هدر */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full max-w-[80%]">
          <label className="w-full sm:w-[420px] border border-[#005DAD] rounded-xl flex items-center overflow-hidden bg-white">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none px-3 py-2.5 text-sm"
              placeholder="جستجو در نام مطب یا توضیحات..."
            />
            <div className="bg-[#005DAD] p-2.5 flex items-center justify-center">
              <CiSearch className="text-white text-2xl" />
            </div>
          </label>

          <ProfileDropdown fullName={fullName} title="دکتر" />
        </div>

        {/* عنوان */}
        <div className="w-full max-w-[80%] flex flex-wrap gap-3 justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              مراکز درمانی و مطب‌های من
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredList.length} مورد یافت شد
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAssignModal(true)}
              disabled={!doctorid}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#005DAD] text-[#005DAD] text-sm hover:bg-[#ECF6FF] transition disabled:opacity-50"
            >
              <LuPlus className="text-lg" />
              تخصیص مرکز موجود
            </button>

            <Link
              to="/doctor-panel/doctor-info/submit-medicalcenter"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#005DAD] text-white text-sm hover:bg-[#004a8f] transition"
            >
              <LuPlus className="text-lg" />
              ثبت مطب جدید
            </Link>
          </div>
        </div>

        {/* لیست کارت‌ها */}
        <div className="w-full max-w-[80%]">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
              در حال بارگذاری...
            </div>
          ) : filteredList.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
              {search
                ? "نتیجه‌ای برای جستجوی شما پیدا نشد"
                : "هنوز هیچ مطب یا مرکز درمانی به شما تخصیص داده نشده است"}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-lg transition-shadow"
                >
                  {/* هدر کارت */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#005DAD] truncate">
                        {item.officeName || item.clinicName || "بدون نام"}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        شناسه: {item.id}
                      </p>
                    </div>
                  </div>

                  {/* توضیحات */}
                  <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                    {item.desc ? item.desc : "توضیحاتی ثبت نشده است"}
                  </p>

                  {/* دکمه‌ها */}
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setDetailItem(item)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[#005DAD] text-[#005DAD] text-sm hover:bg-[#ECF6FF] transition"
                    >
                      <IoEyeOutline className="text-lg" />
                      جزئیات
                    </button>

                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-amber-500 text-amber-600 text-sm hover:bg-amber-50 transition"
                    >
                      <CiEdit className="text-lg" />
                      ویرایش
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteItem(item)}
                      className="flex items-center justify-center p-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition"
                      title="حذف"
                    >
                      <HiOutlineTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========== مودال تخصیص مرکز درمانی موجود ========== */}
      {isAssignModal && (
        <AddTreatmentModal
          id={doctorid}
          closeModal={() => {
            setIsAssignModal(false);
            fetchList();
          }}
        />
      )}

      {/* ========== مودال جزئیات ========== */}
      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-semibold text-[#005DAD]">
                جزئیات مرکز درمانی
              </h3>
              <button
                type="button"
                onClick={() => setDetailItem(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <IoClose className="text-2xl text-gray-500" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm">
              <div>
                <span className="text-gray-500">نام مطب / مرکز:</span>
                <p className="font-medium text-gray-800 mt-0.5">
                  {detailItem.officeName || detailItem.clinicName || "—"}
                </p>
              </div>

              <div>
                <span className="text-gray-500">توضیحات:</span>
                <p className="font-medium text-gray-800 mt-0.5 whitespace-pre-wrap">
                  {detailItem.desc || "—"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500">شناسه رکورد:</span>
                  <p className="font-medium">{detailItem.id}</p>
                </div>
                <div>
                  <span className="text-gray-500">آیدی دکتر:</span>
                  <p className="font-medium">{detailItem.doctorId}</p>
                </div>
              </div>

              <div>
                <span className="text-gray-500">Office ID:</span>
                <p className="font-medium break-all text-xs mt-0.5">
                  {detailItem.officeId || "—"}
                </p>
              </div>

              {detailItem.clinicId && (
                <div>
                  <span className="text-gray-500">Clinic ID:</span>
                  <p className="font-medium break-all text-xs mt-0.5">
                    {detailItem.clinicId}
                  </p>
                </div>
              )}

              {detailItem.doctorName && (
                <div>
                  <span className="text-gray-500">نام پزشک:</span>
                  <p className="font-medium">{detailItem.doctorName}</p>
                </div>
              )}
            </div>

            <div className="p-5 border-t flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setDetailItem(null);
                  openEdit(detailItem);
                }}
                className="px-4 py-2 rounded-lg border border-amber-500 text-amber-600 text-sm hover:bg-amber-50"
              >
                ویرایش
              </button>
              <button
                type="button"
                onClick={() => setDetailItem(null)}
                className="px-4 py-2 rounded-lg bg-[#005DAD] text-white text-sm hover:bg-[#004a8f]"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== مودال ویرایش ========== */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-semibold text-[#005DAD]">
                ویرایش اطلاعات
              </h3>
              <button
                type="button"
                onClick={() => setEditItem(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <IoClose className="text-2xl text-gray-500" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نام مطب
                </label>
                <input
                  type="text"
                  value={editItem.officeName || editItem.clinicName || ""}
                  disabled
                  className="w-full bg-gray-100 py-2.5 px-3 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  توضیحات / قوانین خاص
                </label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={4}
                  placeholder="توضیحات خود را وارد کنید..."
                  className="w-full resize-none py-2.5 px-3 border border-gray-300 rounded-lg outline-none focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD]"
                />
              </div>
            </div>

            <div className="p-5 border-t flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditItem(null)}
                disabled={actionLoading}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={actionLoading}
                className="px-4 py-2 rounded-lg bg-[#005DAD] text-white text-sm hover:bg-[#004a8f] disabled:opacity-60"
              >
                {actionLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== مودال تأیید حذف ========== */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <HiOutlineTrash className="text-2xl text-red-500" />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              حذف مرکز درمانی
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              آیا از حذف «
              {deleteItem.officeName || deleteItem.clinicName || "این مورد"}»
              مطمئن هستید؟ این عمل قابل بازگشت نیست.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => setDeleteItem(null)}
                disabled={actionLoading}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={actionLoading}
                className="px-5 py-2.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 disabled:opacity-60"
              >
                {actionLoading ? "در حال حذف..." : "بله، حذف شود"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;