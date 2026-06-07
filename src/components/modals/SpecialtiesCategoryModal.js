"use client";
import React, { useEffect, useState, useMemo } from "react";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";

import AddSpecialtiesCategory from "./AddSpecialtiesCategory";
import DeletingModal from "./DeletingModal";
import LoadingComponent from "../LoadingComponent";

import {
  get_specialties_category,
  delete_category,
} from "../../api/ApiCalling";

function SpecialtiesCategoryModal({ closeModal }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAddCategoryModal, setIsAddCategoryModal] = useState(false);
  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // دریافت داده‌ها
  const fetchData = async () => {
    setIsLoading(true);
    const data = await get_specialties_category();
    if (data) {
      setCategories(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [isAddCategoryModal]);

  // فیلتر دسته‌بندی‌ها
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;

    return categories.filter((item) =>
      item.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const openAddModal = () => {
    setSelectedCategory(null);
    setIsAddCategoryModal(true);
  };

  const openEditModal = (item) => {
    setSelectedCategory(item);
    setIsAddCategoryModal(true);
  };

  const openDeleteModal = (item) => {
    setSelectedCategory(item);
    setIsDeletingModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      {/* مودال‌های فرزند */}
      {isAddCategoryModal && (
        <AddSpecialtiesCategory
          selectedCategory={selectedCategory}
          closeModal={() => setIsAddCategoryModal(false)}
        />
      )}

      {isDeletingModal && selectedCategory && (
        <DeletingModal
          DeletingFn={delete_category}
          setList={setCategories}
          id={selectedCategory?.id}
          name={selectedCategory?.categoryName}
          closeModal={() => setIsDeletingModal(false)}
          list={categories}
        />
      )}

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            دسته‌بندی تخصص‌ها
          </h2>
          <RxCross2
            onClick={closeModal}
            className="w-8 h-8 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
          />
        </div>

        {/* Search & Add Button */}
        <div className="p-5 flex flex-col sm:flex-row gap-4 border-b">
          <div className="relative flex-1">
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی دسته‌بندی..."
              className="w-full bg-white border border-gray-300 focus:border-[#005DAD] rounded-xl py-3 pr-12 pl-4 outline-none"
            />
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#005DAD] hover:bg-[#00438a] text-white rounded-xl font-medium transition-all whitespace-nowrap"
          >
            <GoPlus className="text-2xl" />
            افزودن دسته‌بندی
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-5">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingComponent />
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              {searchTerm
                ? "دسته‌بندی‌ای یافت نشد"
                : "هنوز دسته‌بندی ثبت نشده است"}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCategories.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all"
                >
                  {/* آیکون */}
                  <div className="w-16 flex justify-center">
                    {item.categoryLogoFile &&
                    item.categoryLogoFile !== "string" ? (
                      <img
                        src={item.categoryLogoFile}
                        alt={item.categoryName}
                        className="w-12 h-12 object-contain rounded-lg border border-gray-100"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* نام دسته‌بندی */}
                  <div className="flex-1 px-6">
                    <h4 className="text-lg font-medium text-gray-800">
                      {item.categoryName}
                    </h4>
                  </div>

                  {/* اقدامات */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#F2FEF8] border border-[#1F7168] text-[#1F7168] rounded-xl hover:bg-[#e6f8f0] transition-colors"
                    >
                      <CiEdit className="text-xl" />
                      ویرایش
                    </button>

                    <button
                      onClick={() => openDeleteModal(item)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#FEF2F2] border border-[#C30505] text-[#C30505] rounded-xl hover:bg-[#ffebeb] transition-colors"
                    >
                      <HiOutlineTrash className="text-xl" />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 text-sm text-gray-500 text-center">
          تعداد دسته‌بندی: {filteredCategories.length}
        </div>
      </div>
    </div>
  );
}

export default SpecialtiesCategoryModal;
