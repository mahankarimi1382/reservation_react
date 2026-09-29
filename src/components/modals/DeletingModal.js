import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { SyncLoader } from "react-spinners";

function DeletingModal({
  DeletingFn,
  setList,
  id,
  name,
  closeModal,
  list,
  // عنوان مودال بر اساس زمینه استفاده فرق می‌کند (حذف دسته‌بندی، کنسل نوبت و...)
  title = "حذف دسته‌بندی"
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    if (!id) return;
    
    DeletingFn(id, setList, closeModal, setIsLoading, list);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative">
        <RxCross2
          onClick={closeModal}
          className="absolute top-4 left-4 w-7 h-7 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
        />

        <div className="flex flex-col items-center text-center pt-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">🗑️</span>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          
          <p className="text-gray-600 mb-8">
            آیا از حذف <span className="font-semibold text-[#005DAD]">{name}</span> مطمئن هستید؟<br />
            این عمل قابل بازگشت نیست.
          </p>

          <div className="flex gap-4 w-full">
            <button
              onClick={closeModal}
              className="flex-1 py-3.5 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>

            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="flex-1 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
            >
              {isLoading ? <SyncLoader color="white" size={9} /> : "بله، حذف شود"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletingModal;