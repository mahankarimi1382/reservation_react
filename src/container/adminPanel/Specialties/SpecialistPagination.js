import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { TbCategory } from "react-icons/tb";
import { Pagination, PaginationItem } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import DeletingModal from "../../../components/modals/DeletingModal";
import AddCategoryModal from "../../../components/modals/AddCategoryModal";
import { delete_specialties } from "../../../api/ApiCalling";

const SpecialistPagination = ({
  items,
  setSpecialist,
  setItem,
  setIsAddSpecialModal,
  currentPage,
  setCurrentPage,
}) => {
  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [isAddCategoryModal, setIsAddCategoryModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => setCurrentPage(value);

  const toPersianDigits = (str) =>
    str.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setIsDeletingModal(true);
  };

  const openEditModal = (item) => {
    setItem(item);
    setIsAddSpecialModal(true);
  };

  const openCategoryModal = (item) => {
    setSelectedItem(item);
    setIsAddCategoryModal(true);
  };

  return (
    <>
      {/* مودال‌ها */}
      {isDeletingModal && selectedItem && (
        <DeletingModal
          DeletingFn={delete_specialties}
          setList={setSpecialist}
          id={selectedItem.id}
          name={selectedItem.name}
          closeModal={() => setIsDeletingModal(false)}
          list={items}
        />
      )}

      {isAddCategoryModal && selectedItem && (
        <AddCategoryModal
          selectedSpecialties={selectedItem}
          closeModal={() => setIsAddCategoryModal(false)}
        />
      )}

      <div className="divide-y divide-gray-100">
        {currentItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            {items.length === 0
              ? "هنوز تخصصی ثبت نشده است"
              : "نتیجه‌ای برای جستجوی شما یافت نشد"}
          </div>
        ) : (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center px-4 py-6 hover:bg-gray-50 transition-colors gap-x-4"
            >
              {/* آیکون */}
              <div className="col-span-2 flex justify-center">
                {item.logoFile ? (
                  <img
                    src={item.logoFile}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded-lg border border-gray-100"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                    بدون تصویر
                  </div>
                )}
              </div>

              {/* نام تخصص */}
              <div className="col-span-3 font-medium text-gray-800">
                {item.name}
              </div>

              {/* کد مکسا */}
              <div className="col-span-3 text-center text-gray-600 font-medium">
                {item.maxa || "—"}
              </div>

              {/* اقدامات - با فضای بیشتر */}
              <div className="col-span-4 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => openDeleteModal(item)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#FEF2F2] border border-[#C30505] text-[#C30505] rounded-xl hover:bg-red-50 transition-all text-sm whitespace-nowrap"
                >
                  <HiOutlineTrash />
                  حذف
                </button>

                <button
                  onClick={() => openEditModal(item)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#F2FEF8] border border-[#1F7168] text-[#1F7168] rounded-xl hover:bg-emerald-50 transition-all text-sm whitespace-nowrap"
                >
                  <CiEdit className="text-lg" />
                  ویرایش
                </button>

                <button
                  onClick={() => openCategoryModal(item)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#DBEDFF] border border-[#005DAD] text-[#005DAD] rounded-xl hover:bg-blue-50 transition-all text-sm whitespace-nowrap"
                >
                  <TbCategory className="text-lg" />
                  دسته‌بندی
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 mb-6">
          <Pagination
            size="large"
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
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
      )}
    </>
  );
};

export default SpecialistPagination;