import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { SyncLoader } from "react-spinners";
import { FiUpload } from "react-icons/fi";

import {
  create_Specialties_category,
  edit_category,
} from "../../api/ApiCalling";
import { Eror, success } from "../ToastAlerts";

function AddSpecialtiesCategory({ closeModal, selectedCategory }) {
  const [categoryName, setCategoryName] = useState(
    selectedCategory?.categoryName || ""
  );
  const [image, setImage] = useState(
    selectedCategory?.categoryLogoFile || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!categoryName?.trim() || !image) {
      Eror("لطفا عنوان و عکس دسته‌بندی را وارد کنید");
      return;
    }

    const metadata = {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: 0,
    };

    const baseData = {
      metadata,
      categoryName: categoryName.trim(),
      categoryLogoFile: image,
    };

    const data = selectedCategory
      ? { ...baseData, id: selectedCategory.id }
      : baseData;

    const apiCall = selectedCategory
      ? edit_category
      : create_Specialties_category;

    apiCall(data, setIsLoading, () => {
      success(selectedCategory ? "دسته‌بندی با موفقیت ویرایش شد" : "دسته‌بندی با موفقیت ثبت شد");
      closeModal();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
          </h2>
          <RxCross2
            onClick={closeModal}
            className="w-8 h-8 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* عنوان */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">عنوان دسته‌بندی</label>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="عنوان دسته‌بندی را وارد کنید"
              className="w-full border border-gray-300 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] rounded-xl px-4 py-3 outline-none transition-all"
            />
          </div>

          {/* آپلود عکس */}
          <div className="space-y-3">
            <label className="block text-lg font-medium">عکس دسته‌بندی</label>

            {image ? (
              <div className="flex justify-center">
                <div className="relative w-32 h-32 group">
                  <img
                    src={image}
                    alt="دسته‌بندی"
                    className="w-32 h-32 object-contain rounded-2xl border border-gray-200 shadow-sm"
                  />
                  <div
                    onClick={() => setImage(null)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <MdDeleteForever className="text-white text-5xl" />
                  </div>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl hover:border-[#005DAD] transition-colors cursor-pointer">
                <FiUpload className="text-4xl text-gray-400 mb-2" />
                <span className="text-gray-600 font-medium">آپلود تصویر</span>
                <span className="text-sm text-gray-400 mt-1">فرمت: JPG, PNG</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-5 border-t bg-gray-50 flex gap-3">
          <button
            onClick={closeModal}
            className="flex-1 py-3.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors font-medium"
          >
            لغو
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading || !categoryName?.trim() || !image}
            className="flex-1 py-3.5 bg-[#005DAD] hover:bg-[#00438a] disabled:bg-blue-400 text-white rounded-xl font-medium transition-all flex items-center justify-center"
          >
            {isLoading ? (
              <SyncLoader color="white" size={9} />
            ) : selectedCategory ? (
              "ویرایش دسته‌بندی"
            ) : (
              "ثبت دسته‌بندی"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSpecialtiesCategory;