import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { SyncLoader } from "react-spinners";

import {
  add_specialist_to_category,
  get_specialties_category,
} from "../../api/ApiCalling";
import { Eror } from "../ToastAlerts";
import DeletingCategoryFromSpecialModal from "./DeletingCategoryFromSpecialModal";

function AddCategoryModal({ selectedSpecialties, closeModal }) {
  const [categories, setCategories] = useState([]);
  const [specialistCategories, setSpecialistCategories] = useState(
    selectedSpecialties?.categories || []
  );
  const [newCategoryId, setNewCategoryId] = useState("");
  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    const data = await get_specialties_category();
    if (data) setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    if (!newCategoryId) {
      Eror("لطفا یک دسته‌بندی انتخاب کنید");
      return;
    }

    const data = {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        smeProfileId: 0,
      },
      specialistId: selectedSpecialties.id,
      categoryId: Number(newCategoryId),
    };

    add_specialist_to_category(data, setIsLoading, () => {
      // فقط لیست را آپدیت می‌کنیم — Toast را اینجا نمایش نمی‌دهیم
      const addedCategory = categories.find(
        (c) => c.id === Number(newCategoryId)
      );
      if (addedCategory) {
        setSpecialistCategories((prev) => [...prev, addedCategory]);
      }
      setNewCategoryId("");
    });
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setIsDeletingModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      {isDeletingModal && selectedItem && (
        <DeletingCategoryFromSpecialModal
          specialistId={selectedSpecialties.id}
          categoryId={selectedItem.id}
          setList={setSpecialistCategories}
          name={selectedItem.categoryName}
          closeModal={() => setIsDeletingModal(false)}
          list={specialistCategories}
        />
      )}

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            دسته‌بندی‌های تخصص{" "}
            <span className="text-[#005DAD]">{selectedSpecialties.name}</span>
          </h2>
          <RxCross2
            onClick={closeModal}
            className="w-7 h-7 cursor-pointer text-gray-500 hover:text-gray-700"
          />
        </div>

        {/* لیست فعلی */}
        <div className="flex-1 overflow-auto p-5">
          <h3 className="text-lg font-medium mb-4">دسته‌بندی‌های فعلی</h3>
          {specialistCategories.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-gray-500 border border-dashed rounded-2xl">
              هنوز دسته‌بندی برای این تخصص ثبت نشده است
            </div>
          ) : (
            <div className="space-y-2">
              {specialistCategories.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border"
                >
                  <span className="font-medium">{item.categoryName}</span>
                  <MdDeleteForever
                    onClick={() => openDeleteModal(item)}
                    className="text-2xl text-red-500 hover:text-red-700 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* افزودن جدید */}
        <div className="p-5 border-t bg-gray-50">
          <h3 className="text-lg font-medium mb-3">افزودن دسته‌بندی جدید</h3>
          <div className="flex gap-3">
            <select
              value={newCategoryId}
              onChange={(e) => setNewCategoryId(e.target.value)}
              className="flex-1 border border-gray-300 focus:border-[#005DAD] rounded-xl px-4 py-3 outline-none"
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.categoryName}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddCategory}
              disabled={!newCategoryId || isLoading}
              className="px-8 bg-[#005DAD] hover:bg-[#00438a] disabled:bg-blue-400 text-white rounded-xl font-medium transition-all"
            >
              {isLoading ? <SyncLoader color="white" size={8} /> : "افزودن"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;