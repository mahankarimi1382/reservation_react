import React, { useState } from "react";
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
import { smeIdStorage, userProfileStore } from "../../store/Store";
import { Eror, success } from "../ToastAlerts";

const DoctorFormModal = ({ setIsAddDoctorModal, fromSignup }) => {
  const { phoneNum } = userProfileStore();
  const { smeId } = smeIdStorage();

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.lastName || !specialistId || !cityId) {
      Eror("لطفا فیلدهای ضروری را پر کنید");
      return;
    }

    // ✅ ساختار دقیقاً مطابق با AddNewDoctorModal
    const data = {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        smeProfileId: smeId || 0,
      },
      doctorName: formData.name,
      doctorFamily: formData.lastName,
      nationalId: formData.nationalCode,
      codeNezam: formData.codeNezam,
      specialistId: specialistId,
      mobile: formData.phone,
      city: cityId?.id || cityId,
      desc: formData.desc,
      gender: formData.gender === "" ? null : formData.gender === "true",
      docExperiance: "string",
      docInstaLink: image,
      smeProfileId: smeId || "",
      uniqueSSR: formData.name + " " + formData.lastName,
    };
    add_doctor(data, setIsLoading, () => {
      setIsAddDoctorModal(false);
    });
  };

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

        <div className="flex flex-col lg:flex-row overflow-hidden">
          {/* فرم */}
          <div className="flex-1 p-6 lg:p-8 overflow-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* نام و نام خانوادگی */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">نام</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    نام خانوادگی
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                  />
                </div>
              </div>

              {/* جنسیت + کد نظام */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    جنسیت
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="true">مرد</option>
                    <option value="false">زن</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    کد نظام پزشکی
                  </label>
                  <input
                    name="codeNezam"
                    value={formData.codeNezam}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                  />
                </div>
              </div>

              {/* کد ملی + شماره همراه */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    کد ملی
                  </label>
                  <input
                    name="nationalCode"
                    value={formData.nationalCode}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    شماره همراه
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                  />
                </div>
              </div>

              {/* استان و شهر */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    استان
                  </label>
                  <ProvinceSelectInput hiddentitle setCities={setCities} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">شهر</label>
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
                    آدرس مطب
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none"
                  />
                </div>
              </div>

              {/* عکس دکتر */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  عکس دکتر
                </label>
                {image ? (
                  <div className="relative w-28 h-28 mx-auto group">
                    <img
                      src={image}
                      alt="doctor"
                      className="w-28 h-28 object-cover rounded-2xl border"
                    />
                    <div
                      onClick={() => setImage(null)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 cursor-pointer transition-all"
                    >
                      <MdDeleteForever className="text-white text-4xl" />
                    </div>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-dashed border-gray-400 rounded-xl p-4 text-center cursor-pointer hover:border-[#005DAD]"
                  />
                )}
              </div>

              {/* توضیحات */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  توضیحات
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] outline-none resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full lg:w-1/2 mx-auto bg-[#005DAD] hover:bg-[#00438a] disabled:bg-blue-400 text-white py-4 rounded-xl font-medium text-lg transition-all"
              >
                {isLoading ? (
                  <SyncLoader color="white" size={10} />
                ) : (
                  "ثبت درخواست عضویت"
                )}
              </button>
            </form>
          </div>

          {/* تصویر سمت راست */}
          <div className="hidden lg:block w-2/5 relative">
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
        className="lg:hidden w-full fixed bottom-0 left-0 z-[-1] opacity-30"
      />
    </div>
  );
};

export default DoctorFormModal;
