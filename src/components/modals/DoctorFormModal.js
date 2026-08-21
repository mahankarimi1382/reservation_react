import React, { useState, useCallback } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { SyncLoader } from "react-spinners";

import LoginFormImage from "../../assets/Pics/doctorLoginFormImg.png";
import LoginFormImage_mobile from "../../assets/Pics/doctor-hand_doctor-form.png";

import {
  CitySelectInput,
  ProvinceSelectInput,
  SpecialtiesSelectInput,
} from "../Inputs/Input";

import { add_doctor } from "../../api/ApiCalling";
import {
  fullNameStorage,
  smeIdStorage,
  userProfileStore,
  userDoctorStorage,
} from "../../store/Store";
import { Eror } from "../ToastAlerts";

const DoctorFormModal = ({ setIsAddDoctorModal }) => {
    const { fullName, setFullName } = fullNameStorage();
  
  const { phoneNum } = userProfileStore();
  const { smeId } = smeIdStorage();
  const { doctors, setDoctors, setDoctorId } = userDoctorStorage();

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null); // base64
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    gender: "",
    codeNezam: "",
    nationalCode: "",
    phone: phoneNum || "",
    address: "",
    desc: "",
  });

  const [specialistId, setSpecialistId] = useState("");
  const [cityId, setCityId] = useState(null);

  // ==================== Handlers ====================

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Eror("لطفاً فقط فایل تصویر انتخاب کنید");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const handleRemoveImage = useCallback(() => setImage(null), []);

  const validateForm = () => {
    if (!formData.name?.trim()) {
      Eror("لطفا نام پزشک را وارد کنید");
      return false;
    }
    if (!formData.lastName?.trim()) {
      Eror("لطفا نام خانوادگی پزشک را وارد کنید");
      return false;
    }
    if (!specialistId) {
      Eror("لطفا تخصص پزشک را انتخاب کنید");
      return false;
    }
    if (!cityId) {
      Eror("لطفا شهر را انتخاب کنید");
      return false;
    }
    if (!formData.codeNezam) {
      Eror("لطفا کد نظام پزشکی را وارد کنید");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const payload = {
      id: 0,
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        smeProfileId: smeId || 0,
      },
      doctorName: formData.name.trim(),
      doctorFamily: formData.lastName.trim(),
      nationalId: formData.nationalCode?.trim() || "",
      codeNezam: parseInt(formData.codeNezam) || 0,
      specialistId: specialistId,
      mobile: formData.phone,
      // city: cityId?.id || cityId,           // ← اینجا بود مشکل اصلی
      address: formData.address?.trim() || "",
      desc: formData.desc?.trim() || "string",
      gender: formData.gender === "" ? null : formData.gender === "true",
      docExperiance: "string",
      docInstaLink: image || "string",
      smeProfileId: smeId || 0,
      uniqueSSR: `${formData.name.trim()} ${formData.lastName.trim()}`,
    };

    try {
      const doctorId = await add_doctor(payload, setIsLoading, () => {
        setIsAddDoctorModal(false);
      });

      // بعد از ثبت پزشک، سشن فعلی را تازه می‌کنیم تا کاربر همین حالا
      // (بدون خروج/ورود مجدد) به‌عنوان پزشک شناخته شود.
      if (doctorId) {
        setDoctorId(doctorId);

        const currentDoctors = Array.isArray(doctors) ? doctors : [];
        const alreadyExists = currentDoctors.some(
          (item) => String(item?.id) === String(doctorId)
        );
        if (!alreadyExists) {
          setDoctors([
            ...currentDoctors,
            {
              id: doctorId,
              doctorName: formData.name.trim(),
              doctorFamily: formData.lastName.trim(),
            },
          ]);
        }

        const newFullName = `${formData.name.trim()} ${formData.lastName.trim()}`.trim();
        if (newFullName) {
          setFullName(newFullName);
        }
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
    } finally {
      // setIsLoading(false) داخل add_doctor مدیریت می‌شود
    }
  };

  // ==================== Render ====================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            درخواست عضویت پزشک
          </h2>
          <RxCross2
            onClick={() => setIsAddDoctorModal(false)}
            className="w-8 h-8 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
          />
        </div>

        <div className="flex flex-col lg:flex-row overflow-hidden flex-1">
          {/* فرم */}
          <div className="flex-1 p-6 lg:p-8 overflow-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* نام و نام خانوادگی */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    نام <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none transition-all"
                    placeholder="نام پزشک"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    نام خانوادگی <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none transition-all"
                    placeholder="نام خانوادگی"
                  />
                </div>
              </div>

              {/* جنسیت + کد نظام */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">جنسیت</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="true">مرد</option>
                    <option value="false">زن</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    کد نظام پزشکی <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="codeNezam"
                    type="number"
                    value={formData.codeNezam}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                    placeholder="کد نظام"
                  />
                </div>
              </div>

              {/* کد ملی + شماره همراه */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">کد ملی</label>
                  <input
                    name="nationalCode"
                    value={formData.nationalCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                    placeholder="کد ملی"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">شماره همراه</label>
                  <input
                    disabled
                    name="phone"
                    value={formData.phone}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50"
                  />
                </div>
              </div>

              {/* استان و شهر */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">استان</label>
                  <ProvinceSelectInput hiddentitle setCities={setCities} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    شهر <span className="text-red-500">*</span>
                  </label>
                  <CitySelectInput
                    hiddentitle
                    setCityId={setCityId}
                    cities={cities}
                  />
                </div>
              </div>

              {/* تخصص + آدرس */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <SpecialtiesSelectInput
                    all={false}
                    specialistId={specialistId}
                    setSpecialistId={setSpecialistId}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    آدرس مطب <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                    placeholder="آدرس کامل مطب"
                  />
                </div>
              </div>

              {/* عکس دکتر */}
              <div>
                <label className="block text-sm font-medium mb-2">عکس دکتر</label>
                {image ? (
                  <div className="relative w-32 h-32 mx-auto group">
                    <img
                      src={image}
                      alt="پیش‌نمایش پزشک"
                      className="w-32 h-32 object-cover rounded-2xl border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"
                    >
                      <MdDeleteForever size={20} />
                    </button>
                  </div>
                ) : (
                  <label className="w-full border border-dashed border-gray-400 rounded-xl p-8 text-center cursor-pointer hover:border-[#005DAD] transition-colors block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <span className="text-gray-500">کلیک کنید یا عکس را بکشید</span>
                  </label>
                )}
              </div>

              {/* توضیحات */}
              <div>
                <label className="block text-sm font-medium mb-2">توضیحات</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none resize-y"
                  placeholder="توضیحات اضافی (اختیاری)"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full lg:w-1/2 mx-auto bg-[#005DAD] hover:bg-[#00438a] disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium text-lg transition-all flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <SyncLoader color="white" size={8} />
                ) : (
                  "ثبت درخواست عضویت"
                )}
              </button>
            </form>
          </div>

          {/* تصویر سمت راست */}
          <div className="hidden lg:block w-2/5 relative overflow-hidden">
            <img
              src={LoginFormImage}
              alt="doctor form"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* تصویر موبایل */}
      <img
        src={LoginFormImage_mobile}
        alt="doctor form mobile"
        className="lg:hidden w-full fixed bottom-0 left-0 z-[-1] opacity-30 pointer-events-none"
      />
    </div>
  );
};

export default DoctorFormModal;