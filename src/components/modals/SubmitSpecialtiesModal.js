import React, { useState } from "react";
import logo from "../../assets/Pics/logo-doctor.png";
import { add_specialties, edit_specialties } from "../../api/ApiCalling";
import { nationalCodeStorage } from "../../store/Store";
import { SyncLoader } from "react-spinners";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { ErrorHandler } from "../../utils/ErrorHandler";

function SubmitSpecialtiesModal({ 
  setIsAddSpecialModal, 
  item, 
  setItem 
}) {
  const { userName } = nationalCodeStorage();

  const [specialName, setSpecialName] = useState(item?.name || "");
  const [maxa, setMaxa] = useState(item?.maxa || "");
  const [maxaName, setMaxaName] = useState(item?.maxaName || "");
  const [image, setImage] = useState(item?.logoFile || null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!specialName?.trim() || !maxa?.trim() || !image) {
      ErrorHandler("empty value");
      return;
    }

    const data = {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: userName,
      },
      id: item?.id,
      name: specialName.trim(),
      maxa: maxa.trim(),
      maxaName: maxaName.trim(),
      logoFile: image,
    };

    setItem?.(); // اگر نیاز به پاک کردن حالت دارید

    if (item) {
      edit_specialties(data, setIsLoading, setIsAddSpecialModal);
    } else {
      add_specialties(data, setIsLoading, setIsAddSpecialModal);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div 
        dir="rtl"
        className="bg-white rounded-2xl w-full max-w-md max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <img src={logo} alt="logo" width={70} />
          <RxCross2
            onClick={() => setIsAddSpecialModal(false)}
            className="w-8 h-8 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* کد مکسا */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">کد مکسا :</label>
            <input
              value={maxa}
              onChange={(e) => setMaxa(e.target.value)}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-base outline-none transition-all"
              placeholder="کد مکسا را وارد کنید"
            />
          </div>

          {/* عنوان مکسا */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">عنوان مکسا :</label>
            <input
              value={maxaName}
              onChange={(e) => setMaxaName(e.target.value)}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-base outline-none transition-all"
              placeholder="عنوان مکسا را وارد کنید"
            />
          </div>

          {/* عنوان تخصص */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">عنوان تخصص :</label>
            <input
              value={specialName}
              onChange={(e) => setSpecialName(e.target.value)}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-base outline-none transition-all"
              placeholder="عنوان تخصص را وارد کنید"
            />
          </div>

          {/* آپلود آیکون */}
          <div className="space-y-3">
            <label className="block text-lg font-medium">آیکون تخصص :</label>
            
            {image ? (
              <div className="flex justify-center">
                <div className="relative w-28 h-28 group">
                  <img
                    src={image}
                    alt="آیکون"
                    className="w-28 h-28 object-contain rounded-2xl border border-gray-200 shadow-sm"
                  />
                  <div
                    onClick={() => setImage(null)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <MdDeleteForever className="text-white text-4xl" />
                  </div>
                </div>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-dashed border-gray-400 rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-gray-50 flex gap-3">
          <button
            onClick={() => setIsAddSpecialModal(false)}
            className="flex-1 py-3.5 text-base font-medium border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors"
          >
            لغو
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 py-3.5 text-base font-medium bg-[#005DAD] hover:bg-[#00438a] disabled:bg-blue-400 text-white rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
          >
            {isLoading ? (
              <SyncLoader color="white" size={9} />
            ) : (
              item ? "ویرایش" : "ثبت تخصص"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitSpecialtiesModal;